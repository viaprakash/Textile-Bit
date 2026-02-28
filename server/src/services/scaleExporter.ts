import sharp from 'sharp';
import { ScaleOptions } from '../types';

export async function exportScaled(
  inputBuffer: Buffer,
  options: ScaleOptions
): Promise<Buffer> {
  const metadata = await sharp(inputBuffer).metadata();
  const origWidth = metadata.width || 1;
  const origHeight = metadata.height || 1;

  let targetWidth: number;
  let targetHeight: number;

  if (options.width && options.height) {
    targetWidth = options.width;
    targetHeight = options.height;
  } else if (options.width) {
    targetWidth = options.width;
    targetHeight = Math.round(origHeight * (options.width / origWidth));
  } else if (options.height) {
    targetHeight = options.height;
    targetWidth = Math.round(origWidth * (options.height / origHeight));
  } else {
    targetWidth = Math.round(origWidth * options.scaleFactor);
    targetHeight = Math.round(origHeight * options.scaleFactor);
  }

  targetWidth = Math.max(1, targetWidth);
  targetHeight = Math.max(1, targetHeight);

  let pipeline = sharp(inputBuffer).resize(targetWidth, targetHeight, {
    kernel: sharp.kernel.nearest,
    fit: 'fill',
  });

  switch (options.format) {
    case 'png':
      pipeline = pipeline.png({ compressionLevel: 6 });
      break;
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality: options.quality });
      break;
    case 'webp':
      pipeline = pipeline.webp({ quality: options.quality });
      break;
    case 'tiff':
      pipeline = pipeline.tiff({ quality: options.quality });
      break;
    case 'bmp':
      pipeline = pipeline.png();
      break;
    default:
      pipeline = pipeline.png();
  }

  return pipeline.toBuffer();
}
