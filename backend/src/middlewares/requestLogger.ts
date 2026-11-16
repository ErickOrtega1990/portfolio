import type { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

/**
 * Log mínimo por solicitud entrante (método, ruta y código de respuesta).
 * Se ubica antes del rate limiter para que también queden registrados
 * los 429.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  res.on('finish', () => {
    logger.info(`${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
}
