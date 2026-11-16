import rateLimit from 'express-rate-limit';

/**
 * Límite global para todo /api: protección general del servidor.
 * 100 solicitudes por IP cada 15 minutos.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7', // cabeceras RateLimit-*
  legacyHeaders: false,
  // Los preflights CORS no deben consumir la cuota
  skip: (request) => request.method === 'OPTIONS',
  message: { ok: false, message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
});

/**
 * Límite estricto para el formulario de contacto: 5 envíos por IP cada
 * 15 minutos. Evita que la API se use para mail bombing / spam.
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: (request) => request.method === 'OPTIONS',
  message: {
    ok: false,
    message: 'Has alcanzado el límite de mensajes. Intenta de nuevo en 15 minutos.',
  },
});
