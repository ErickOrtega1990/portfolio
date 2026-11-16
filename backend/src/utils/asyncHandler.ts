import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Envuelve handlers async para que cualquier rechazo de promesa llegue
 * al errorHandler (en Express 4 era obligatorio; en Express 5 es un
 * seguro extra).
 */
export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
