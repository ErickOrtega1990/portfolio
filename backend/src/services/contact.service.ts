import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import type { ContactPayload } from '../validators/contact.validator';
import { sendAutoReply, sendContactNotification } from './mail.service';

/**
 * Caso de uso "solicitud de contacto".
 *
 * 1. Notifica al correo del sitio (contacto@erickortegadev.cl) con la
 *    solicitud recibida (replyTo al visitante).
 * 2. Envía al visitante la respuesta automática de confirmación.
 *
 * Si algo falla, el error original queda registrado en el servidor y al
 * cliente se le responde un error controlado sin detalles internos.
 */
export async function handleContactRequest(payload: ContactPayload): Promise<void> {
  try {
    await Promise.all([sendContactNotification(payload), sendAutoReply(payload)]);
  } catch (error) {
    logger.error('Fallo el envío de los correos de contacto', error);
    throw new AppError(
      502,
      'MAIL_DELIVERY_FAILED',
      'No fue posible enviar el mensaje en este momento. Por favor, inténtalo más tarde.',
    );
  }
}
