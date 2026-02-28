import { Router } from 'express';
import {
  convertImage,
  enhanceAndUpscale,
  extractImageColors,
} from '../controllers/conversionController';
import { validateConversionBody } from '../middleware/fileValidation';
import { conversionLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post(
  '/convert',
  conversionLimiter,
  validateConversionBody,
  convertImage
);
router.post('/colors', extractImageColors);
router.post('/upscale', enhanceAndUpscale);

export default router;
