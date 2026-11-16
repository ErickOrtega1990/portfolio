import { Router } from 'express';
import { createContact } from '../controllers/contact.controller';
import { contactLimiter } from '../middlewares/rateLimiter';
import { validateBody } from '../middlewares/validateBody';
import { contactSchema } from '../validators/contact.validator';

/**
 * Endpoints del recurso "contacto".
 *
 * POST /api/contact — recibe la solicitud del formulario web.
 */
const contactRouter = Router();

contactRouter.post(
  '/',
  contactLimiter, // anti spam / mail bombing (5 envíos por IP cada 15 min)
  validateBody(contactSchema), // valida y sanea el body (límite de 10 KB aplicado en app.ts)
  createContact,
);

export default contactRouter;
