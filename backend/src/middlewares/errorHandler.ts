import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

interface BodyParserError extends Error {
  type?: string;
  statusCode?: number;
}

/**
 * Último middleware de la cadena: traduce cualquier error a una
 * respuesta JSON controlada, sin exponer stack traces ni detalles
 * internos al cliente.
 */
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Errores del parser del cuerpo (express.json): JSON malformado o > 10 KB
  if (error instanceof SyntaxError || (error as BodyParserError)?.type !== undefined) {
    const type = (error as BodyParserError).type;

    if (type === 'entity.too.large') {
      res
        .status(413)
        .json({ ok: false, message: 'El cuerpo de la solicitud supera el límite de 10 KB.' });
      return;
    }

    if (type === 'entity.parse.failed' || error instanceof SyntaxError) {
      res
        .status(400)
        .json({ ok: false, message: 'El cuerpo de la solicitud no es un JSON válido.' });
      return;
    }
  }

  // Errores controlados de la aplicación (ya traen status + mensaje)
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ ok: false, code: error.code, message: error.message });
    return;
  }

  // Error inesperado: se registra completo en el servidor, al cliente
  // solo un mensaje genérico.
  logger.error('Error no controlado en la solicitud', error);
  res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
}
