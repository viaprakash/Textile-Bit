import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { config } from '../config/env';

export function getUploadPath(filename: string): string {
  return path.resolve(__dirname, '../../', config.uploadDir, filename);
}

export function getOutputPath(filename: string): string {
  const outputDir = path.resolve(
    __dirname,
    '../../',
    config.uploadDir,
    'output'
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return path.join(outputDir, filename);
}

export async function getImageMetadata(filePath: string) {
  const metadata = await sharp(filePath).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    channels: metadata.channels || 0,
    size: metadata.size || 0,
    hasAlpha: metadata.hasAlpha || false,
  };
}
