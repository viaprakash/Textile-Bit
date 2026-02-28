import { Router } from 'express';
import { downloadResult } from '../controllers/downloadController';

const router = Router();

router.get('/', downloadResult);

export default router;
