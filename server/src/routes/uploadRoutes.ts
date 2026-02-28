import { Router } from 'express';
import path from 'path';
import { config } from '../config/env';
import { upload } from '../config/multer';
import {
  getUploadedImage,
  uploadImage,
} from '../controllers/uploadController';
import { validateFile } from '../middleware/fileValidation';
import { uploadLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post(
  '/',
  uploadLimiter,
  upload.single('image'),
  validateFile,
  uploadImage
);

router.get('/:filename', getUploadedImage);

router.get('/output/:filename', (req, res) => {
  const filePath = path.resolve(
    __dirname,
    '../../',
    config.uploadDir,
    'output',
    req.params.filename
  );
  res.sendFile(filePath);
});

export default router;
