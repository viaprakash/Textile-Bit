import rateLimit from 'express-rate-limit';

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    error: 'Too many uploads',
    message: 'Please try again later',
  },
});

export const conversionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many conversion requests',
    message: 'Please try again later',
  },
});
