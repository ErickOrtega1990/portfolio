import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodType } from 'zod';

/**
 * Valida req.body contra un esquema zod antes de llegar al controlador.
 *
 * Si el body es inválido responde 400 con el detalle por campo.
 * Si es válido, deja los datos ya saneados/normalizados en
 * res.locals.validatedBody para que el controlador no revalide.
 */
export function validateBody<T>(schema: ZodType<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        ok: false,
        message: 'Los datos del formulario son inválidos.',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.map(String).join('.') || 'body',
          message: issue.message,
        })),
      });
      return;
    }

    res.locals.validatedBody = result.data;
    next();
  };
}
