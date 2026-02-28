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
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      const allowed = config.clientUrl.split(',').map((s) => s.trim()).filter(Boolean);
      // In production, check against allowed origins; in dev, allow all
      if (allowed.length === 0 || allowed.includes(origin) || config.nodeEnv === 'development') {
        callback(null, true);
      } else {
        callback(null, true); // Allow all origins for now to debug — tighten later
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files (static)
app.use(
  '/api/files',
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
