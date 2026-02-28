import { NextFunction, Request, Response } from 'express';

export function validateFile(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.file) {
    res.status(400).json({
      error: 'No file uploaded',
      message: 'Please upload an image file',
    });
    return;
  }
  next();
}

export function validateConversionBody(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { filename } = req.body;
  if (!filename) {
    res.status(400).json({
      error: 'Missing filename',
      message: 'Please provide the filename of the uploaded image',
    });
    return;
  }
  next();
}
