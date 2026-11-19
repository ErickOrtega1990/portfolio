import { createApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info(`Servidor escuchando en http://localhost:${env.port} (${env.nodeEnv})`);
  if (!env.brevoApiKey) {
    logger.warn(
      'BREVO_API_KEY no configurada: los correos se simulan por consola. ' +
        'Configura BREVO_API_KEY en .env para envíos reales.',
    );
  }
});

// --- Apagado ordenado (graceful shutdown) ------------------------------------
function shutdown(signal: string): void {
  logger.info(`Señal recibida: ${signal}. Cerrando servidor...`);
  server.close(() => {
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
