import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err.message);

  if (err.message.includes('File too large')) {
    res.status(413).json({
      error: 'File too large',
      message: 'Maximum file size is 50MB',
    });
    return;
  }

  if (err.message.includes('Invalid file type')) {
    res.status(400).json({
      error: 'Invalid file type',
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong',
  });
}
