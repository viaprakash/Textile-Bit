import sharp from 'sharp';

export async function intelligentUpscale(
  inputBuffer: Buffer,
  targetMultiplier: number = 2
): Promise<Buffer> {
  const metadata = await sharp(inputBuffer).metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  const newWidth = Math.round(width * targetMultiplier);
  const newHeight = Math.round(height * targetMultiplier);

  // Step 1: Upscale with Lanczos3
  let result = await sharp(inputBuffer)
    .resize(newWidth, newHeight, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill',
    })
    .toBuffer();

  // Step 2: Light denoise
  result = await sharp(result).median(3).toBuffer();

  // Step 3: Sharpen to recover detail
  result = await sharp(result)
    .sharpen({ sigma: 1.0 })
    .toBuffer();

  // Step 4: Normalize contrast
  result = await sharp(result).normalize().toBuffer();

  return result;
}
