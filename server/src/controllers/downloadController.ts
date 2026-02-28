import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env';
import { exportScaled } from '../services/scaleExporter';
import { ScaleOptions } from '../types';
import { getFileExtension } from '../utils/fileUtils';

export async function downloadResult(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      filename,
      scaleFactor = 1,
      width,
      height,
      format = 'png',
      quality = 100,
    } = req.query;

    if (!filename) {
      res.status(400).json({ error: 'Filename is required' });
      return;
    }

    // Check output directory first, then uploads
    let filePath = path.resolve(
      __dirname,
      '../../',
      config.uploadDir,
      'output',
      filename as string
    );

    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(
        __dirname,
        '../../',
        config.uploadDir,
        filename as string
      );
    }

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const inputBuffer = fs.readFileSync(filePath);

    const scaleOptions: ScaleOptions = {
      scaleFactor: Number(scaleFactor),
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      format: format as ScaleOptions['format'],
      quality: Number(quality),
    };

    const resultBuffer = await exportScaled(inputBuffer, scaleOptions);

    const ext = getFileExtension(format as string);
    const downloadName = `textile-bitmap-${Date.now()}${ext}`;

    const mimeTypes: Record<string, string> = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
      tiff: 'image/tiff',
      bmp: 'image/bmp',
    };

    res.set({
      'Content-Type': mimeTypes[format as string] || 'image/png',
      'Content-Disposition': `attachment; filename="${downloadName}"`,
      'Content-Length': resultBuffer.length.toString(),
    });

    res.send(resultBuffer);
  } catch (error: any) {
    console.error('Download error:', error);
    res
      .status(500)
      .json({ error: 'Download failed', message: error.message });
  }
}
