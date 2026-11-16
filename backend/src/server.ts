import { createApp } from './app';
import { env } from './config/env';
import { closeMailer } from './services/mail.service';
import { logger } from './utils/logger';

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info(`Servidor escuchando en http://localhost:${env.port} (${env.nodeEnv})`);
  if (!env.smtp) {
    logger.warn(
      'SMTP no configurado: los correos se simulan por consola (transporte JSON). ' +
        'Configura SMTP_HOST, SMTP_USER y SMTP_PASS en .env para envíos reales.',
    );
  }
});

// --- Apagado ordenado (graceful shutdown) ------------------------------------
function shutdown(signal: string): void {
  logger.info(`Señal recibida: ${signal}. Cerrando servidor...`);
  server.close(() => {
    closeMailer();
    process.exit(0);
  });
  // Si algo queda colgado, forzar la salida después de 10 s
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason: unknown) => {
  logger.error(
    'Rechazo de promesa no controlado',
    reason instanceof Error ? reason : new Error(String(reason)),
  );
});
