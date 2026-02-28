import sharp from 'sharp';
import { ConversionOptions, CropRegion } from '../types';
import { hexToRgb } from './colorExtractor';
import { enhanceImage } from './imageEnhancer';

export async function convertToBitmap(
  inputPath: string,
  options: ConversionOptions
): Promise<Buffer> {
  let imageBuffer = await sharp(inputPath).toBuffer();

  // Crop if region specified
  if (options.crop) {
    imageBuffer = await cropImage(imageBuffer, options.crop);
  }

  // Enhance image if needed
  if (options.enhance) {
    imageBuffer = await enhanceImage(imageBuffer, {
      sharpen: options.sharpen,
      denoise: options.denoise,
      contrast: options.contrast,
      brightness: options.brightness,
      upscale: true,
    });
  }

  // Convert based on mode
  switch (options.mode) {
    case 'bw':
      return convertBlackWhite(imageBuffer, options);
    case 'color':
      return convertWithColors(imageBuffer, options);
    case 'palette':
      return convertWithPalette(imageBuffer, options);
    default:
      return convertBlackWhite(imageBuffer, options);
  }
}

async function cropImage(
  buffer: Buffer,
  crop: CropRegion
): Promise<Buffer> {
  return sharp(buffer)
    .extract({
      left: Math.round(crop.x),
      top: Math.round(crop.y),
      width: Math.round(crop.width),
      height: Math.round(crop.height),
    })
    .toBuffer();
}

async function convertBlackWhite(
  buffer: Buffer,
  options: ConversionOptions
): Promise<Buffer> {
  const pipeline = sharp(buffer).grayscale();

  if (options.dithering && options.ditheringType !== 'none') {
    const { data, info } = await pipeline
      .raw()
      .toBuffer({ resolveWithObject: true });

    const dithered = applyDithering(
      data,
      info.width,
      info.height,
      info.channels,
      options.threshold,
      options.ditheringType
    );

    return sharp(dithered, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .png()
      .toBuffer();
  } else {
    return pipeline.threshold(options.threshold).png().toBuffer();
  }
}

async function convertWithColors(
  buffer: Buffer,
  options: ConversionOptions
): Promise<Buffer> {
  const colorCount = Math.max(2, Math.min(options.colors, 256));

  const { data, info } = await sharp(buffer)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const posterized = posterizePixels(data, info.channels, colorCount);

  return sharp(posterized, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toBuffer();
}

async function convertWithPalette(
  buffer: Buffer,
  options: ConversionOptions
): Promise<Buffer> {
  if (options.customPalette.length === 0) {
    return convertBlackWhite(buffer, options);
  }

  const paletteColors = options.customPalette.map(hexToRgb);

  const { data, info } = await sharp(buffer)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mapped = mapToPalette(data, info.channels, paletteColors);

  return sharp(mapped, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toBuffer();
}

function applyDithering(
  data: Buffer,
  width: number,
  height: number,
  channels: number,
  threshold: number,
  type: string
): Buffer {
  const pixels = Buffer.from(data);

  if (type === 'floyd-steinberg') {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const oldPixel = pixels[idx];
        const newPixel = oldPixel > threshold ? 255 : 0;
        const error = oldPixel - newPixel;

        pixels[idx] = newPixel;
        if (channels >= 2) pixels[idx + 1] = newPixel;
        if (channels >= 3) pixels[idx + 2] = newPixel;

        if (x + 1 < width) {
          const i = (y * width + (x + 1)) * channels;
          pixels[i] = clamp(pixels[i] + (error * 7) / 16);
        }
        if (y + 1 < height) {
          if (x - 1 >= 0) {
            const i = ((y + 1) * width + (x - 1)) * channels;
            pixels[i] = clamp(pixels[i] + (error * 3) / 16);
          }
          const i2 = ((y + 1) * width + x) * channels;
          pixels[i2] = clamp(pixels[i2] + (error * 5) / 16);
          if (x + 1 < width) {
            const i3 = ((y + 1) * width + (x + 1)) * channels;
            pixels[i3] = clamp(pixels[i3] + (error * 1) / 16);
          }
        }
      }
    }
  } else if (type === 'ordered') {
    const bayer = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const bayerValue = (bayer[y % 4][x % 4] / 16) * 255;
        const adjustedThreshold =
          threshold + (bayerValue - 128) * 0.5;
        const newPixel = pixels[idx] > adjustedThreshold ? 255 : 0;

        pixels[idx] = newPixel;
        if (channels >= 2) pixels[idx + 1] = newPixel;
        if (channels >= 3) pixels[idx + 2] = newPixel;
      }
    }
  }

  return pixels;
}

function posterizePixels(
  data: Buffer,
  channels: number,
  levels: number
): Buffer {
  const result = Buffer.from(data);
  const step = 255 / (levels - 1);

  for (let i = 0; i < result.length; i += channels) {
    for (let c = 0; c < Math.min(channels, 3); c++) {
      result[i + c] = Math.round(
        Math.round(result[i + c] / step) * step
      );
    }
  }

  return result;
}

function mapToPalette(
  data: Buffer,
  channels: number,
  palette: { r: number; g: number; b: number }[]
): Buffer {
  const result = Buffer.from(data);

  for (let i = 0; i < result.length; i += channels) {
    const r = result[i];
    const g = channels >= 2 ? result[i + 1] : r;
    const b = channels >= 3 ? result[i + 2] : r;

    let minDist = Infinity;
    let closest = palette[0];

    for (const color of palette) {
      const dist =
        (r - color.r) ** 2 +
        (g - color.g) ** 2 +
        (b - color.b) ** 2;
      if (dist < minDist) {
        minDist = dist;
        closest = color;
      }
    }

    result[i] = closest.r;
    if (channels >= 2) result[i + 1] = closest.g;
    if (channels >= 3) result[i + 2] = closest.b;
  }

  return result;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}
