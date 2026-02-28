import { Router } from 'express';
import conversionRoutes from './conversionRoutes';
import downloadRoutes from './downloadRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/uploads', uploadRoutes);
router.use('/conversion', conversionRoutes);
router.use('/download', downloadRoutes);

export default router;
