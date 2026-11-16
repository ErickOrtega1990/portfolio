/**
 * Logger mínimo con marca de tiempo. Suficiente para esta API; si se
 * necesita algo más estructurado se puede reemplazar por pino/winston
 * sin tocar el resto del código (solo este módulo).
 */
const timestamp = () => new Date().toISOString();

function prefix(level: 'INFO' | 'WARN' | 'ERROR'): string {
  return `[${timestamp()}] [${level}]`;
}

export const logger = {
  info(message: string, ...meta: unknown[]): void {
    console.log(prefix('INFO'), message, ...meta);
  },

  warn(message: string, ...meta: unknown[]): void {
    console.warn(prefix('WARN'), message, ...meta);
  },

  error(message: string, error?: unknown): void {
    if (error instanceof Error) {
      console.error(prefix('ERROR'), message, error.message);
      if (error.stack) console.error(error.stack);
    } else if (error !== undefined) {
      console.error(prefix('ERROR'), message, error);
    } else {
      console.error(prefix('ERROR'), message);
    }
  },
};
