import type { Request, Response } from 'express';

/** Captura cualquier ruta no definida con una respuesta JSON 404. */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ ok: false, message: 'Recurso no encontrado.' });
}
