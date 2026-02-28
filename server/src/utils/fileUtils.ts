import fs from 'fs';
import path from 'path';

export function deleteFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
}

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function getFileExtension(format: string): string {
  const extensions: Record<string, string> = {
    png: '.png',
    jpeg: '.jpg',
    jpg: '.jpg',
    webp: '.webp',
    bmp: '.bmp',
    tiff: '.tiff',
    tif: '.tiff',
  };
  return extensions[format] || '.png';
}

export function cleanupOldFiles(
  dirPath: string,
  maxAgeMs: number = 3600000
): void {
  try {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    const now = Date.now();
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (now - stats.mtimeMs > maxAgeMs) {
        if (stats.isFile()) {
          fs.unlinkSync(filePath);
        }
      }
    });
  } catch (error) {
    console.error('Error cleaning up old files:', error);
  }
}
