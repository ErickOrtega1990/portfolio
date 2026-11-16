import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { apiLimiter } from './middlewares/rateLimiter';
import { requestLogger } from './middlewares/requestLogger';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import apiRouter from './routes';

/**
 * Crea y configura la aplicación Express.
 *
 * Aquí vive toda la configuración de seguridad de la API:
 *  - helmet: cabeceras de seguridad HTTP
 *  - cors: whitelist de orígenes (por variable de entorno)
 *  - límite de tamaño del cuerpo: 10 KB
 *  - rate limiting global y por endpoint
 */
export function createApp(): Express {
  const app = express();

  // Detrás de nginx/Cloudflare: necesario para que express-rate-limit
  // vea la IP real del cliente.
  if (env.trustProxy) {
    app.set('trust proxy', 1);
  }

  // --- Seguridad HTTP ------------------------------------------------------
  app.disable('x-powered-by'); // no revelar el framework
  app.use(helmet()); // CSP, HSTS, noSniff, frameguard, ...

  // --- CORS: solo orígenes de la whitelist ----------------------------------
  app.use(
    cors({
      origin: env.corsOrigins,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      maxAge: 86_400, // el navegador cachea el preflight 24 h
    }),
  );

  // --- Log de solicitudes (incluye 429 del rate limiter) --------------------
  app.use(requestLogger);

  // --- Rate limit global, ANTES de parsear el cuerpo ------------------------
  app.use('/api', apiLimiter);

  // --- Parseo del cuerpo con límite de 10 KB -------------------------------
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ limit: '10kb', extended: false }));

  // --- Rutas -----------------------------------------------------------------
  app.use('/api', apiRouter);

  // --- 404 y manejo de errores centralizado -----------------------------------
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
