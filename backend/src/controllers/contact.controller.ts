import type { Request, Response } from 'express';
import { handleContactRequest } from '../services/contact.service';
import type { ContactPayload } from '../validators/contact.validator';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * POST /api/contact
 *
 * Endpoint del formulario de contacto. La validación y saneamiento del
 * body ocurre en el middleware validateBody(contactSchema); el controlador
 * solo orquesta: delega en el servicio y responde.
 */
export const createContact = asyncHandler(async (_req: Request, res: Response) => {
  const payload = res.locals.validatedBody as ContactPayload;

  await handleContactRequest(payload);

  res.status(200).json({
    ok: true,
    message: 'Mensaje enviado. Recibirás una confirmación en tu correo.',
  });
});
