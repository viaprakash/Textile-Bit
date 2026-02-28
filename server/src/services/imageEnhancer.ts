import sharp from 'sharp';

export interface EnhanceOptions {
  sharpen: boolean;
  denoise: boolean;
  contrast: number;
  brightness: number;
  upscale: boolean;
  targetWidth?: number;
  targetHeight?: number;
}

export async function enhanceImage(
  inputBuffer: Buffer,
  options: EnhanceOptions
): Promise<Buffer> {
  let pipeline = sharp(inputBuffer);

  const metadata = await sharp(inputBuffer).metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  // Upscale small / low-quality images
  if (options.upscale && (width < 1000 || height < 1000)) {
    const scaleFactor = Math.max(
      2,
      Math.ceil(1000 / Math.min(width, height))
    );
    pipeline = pipeline.resize(width * scaleFactor, height * scaleFactor, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill',
    });
  }

  // Denoise using median filter
  if (options.denoise) {
    pipeline = pipeline.median(3);
  }

  // Sharpen
  if (options.sharpen) {
    pipeline = pipeline.sharpen({ sigma: 1.5 });
  }

  // Brightness and contrast via linear transform
  if (options.contrast !== 1 || options.brightness !== 1) {
    pipeline = pipeline.linear(
      options.contrast,
      (options.brightness - 1) * 128
    );
  }

  // Normalize to use the full dynamic range
  pipeline = pipeline.normalize();

  return pipeline.toBuffer();
}

export async function upscaleImage(
  inputBuffer: Buffer,
  factor: number
): Promise<Buffer> {
  const metadata = await sharp(inputBuffer).metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  return sharp(inputBuffer)
    .resize(Math.round(width * factor), Math.round(height * factor), {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill',
    })
    .toBuffer();
}
