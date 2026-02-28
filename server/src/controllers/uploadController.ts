import { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import { config } from '../config/env';
import { extractColors } from '../services/colorExtractor';

export async function uploadImage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = req.file.path;
    const metadata = await sharp(filePath).metadata();

    const colors = await extractColors(filePath, 8);

    const result = {
      id: path.parse(req.file.filename).name,
      filename: req.file.filename,
      originalName: req.file.originalname,
      width: metadata.width || 0,
      height: metadata.height || 0,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url: `/api/uploads/${req.file.filename}`,
      colors,
    };

    res.status(200).json(result);
  } catch (error: any) {
    console.error('Upload error:', error);
    res
      .status(500)
      .json({
        error: 'Failed to process uploaded image',
        message: error.message,
      });
  }
}

export async function getUploadedImage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { filename } = req.params;
    const filePath = path.resolve(
      __dirname,
      '../../',
      config.uploadDir,
      filename
    );
    res.sendFile(filePath);
  } catch (error: any) {
    res.status(404).json({ error: 'Image not found' });
  }
}
