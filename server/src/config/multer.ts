import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from './env';

const uploadDir = path.resolve(__dirname, '../../', config.uploadDir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`),
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ['image/png','image/jpeg','image/jpg','image/webp','image/bmp','image/tiff','image/gif'];
  cb(null, allowed.includes(file.mimetype));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: config.maxFileSize } });
