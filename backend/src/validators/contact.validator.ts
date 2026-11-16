import { z } from 'zod';

/**
 * Esquema del formulario de contacto.
 *
 * Además de los largos mínimos/máximos, se rechazan los caracteres de
 * control/formato (\p{C}) que llegan en campos libres: con eso se
 * bloquea la inyección de cabeceras de correo (CRLF) y otras basuras.
 */
const CONTROL_CHARS = /\p{C}/u;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(80, 'El nombre no puede superar los 80 caracteres.')
    .refine((value) => !CONTROL_CHARS.test(value), 'El nombre contiene caracteres no permitidos.'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, 'El correo no puede superar los 254 caracteres.')
    .pipe(z.email('Debe ser un correo válido.')),

  message: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres.')
    .max(5000, 'El mensaje no puede superar los 5000 caracteres.')
    .refine(
      (value) => !CONTROL_CHARS.test(value.replace(/[\n\r\t]/g, '')),
      'El mensaje contiene caracteres no permitidos.',
    ),
});

export type ContactPayload = z.infer<typeof contactSchema>;
