/**
 * Error controlado de la aplicación.
 *
 * Se propaga hasta el errorHandler, que responde al cliente con el
 * statusCode indicado sin exponer stack traces ni detalles internos.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
