import cors from 'cors';
import express from 'express';
import path from 'path';
import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { cleanupOldFiles } from './utils/fileUtils';

const app = express();

app.use(
  cors({
    origin: config.clientUrl.split(',').map((s) => s.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use(
  '/api/uploads',
  express.static(path.resolve(__dirname, '../', config.uploadDir))
);

// API routes
app.use('/api', routes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Cleanup old files every hour
setInterval(() => {
  const uploadDir = path.resolve(__dirname, '../', config.uploadDir);
  cleanupOldFiles(uploadDir, 3600000);
  cleanupOldFiles(path.join(uploadDir, 'output'), 3600000);
}, 3600000);

app.listen(config.port, () => {
  console.log(`🧵 Textile Bitmap Server running on port ${config.port}`);
  console.log(`   Environment: ${config.nodeEnv}`);
});

export default app;
