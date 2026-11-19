import 'dotenv/config';
import { z } from 'zod';

/**
 * Carga y valida las variables de entorno.
 *
 * Los datos sensibles (BREVO_API_KEY, ...) viven SOLO en .env,
 * que está ignorado por git (ver .gitignore).
 *
 * Si falta o hay una variable inválida, el proceso termina de inmediato
 * con un mensaje claro (fail fast) en lugar de arrancar mal configurado.
 */

const booleanFromString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
  APP_URL: z.url().default('https://erickortegadev.cl'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  TRUST_PROXY: booleanFromString,

  // Correo
  CONTACT_EMAIL: z.email(),
  MAIL_FROM_NAME: z.string().default('Erick Ortega'),
  MAIL_FROM: z.email().optional(),

  // API de correo (sensible). Se envía por HTTPS: los planes Free de Render
  // bloquean el tráfico saliente por SMTP (puertos 25, 465 y 587).
  BREVO_API_KEY: z.string().optional(),
});

function loadEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.map(String).join('.') || '(raíz)'}: ${issue.message}`)
      .join('\n');
    console.error(`Configuración de entorno inválida o incompleta:\n${details}`);
    process.exit(1);
  }
  return result.data;
}

const parsed = loadEnv();

/**
 * Credencial de la API de correo. `null` cuando no está configurada:
 * en desarrollo se simula el envío por consola y en producción se lanza
 * un error, porque los correos reales son obligatorios.
 */
const brevoApiKey = parsed.BREVO_API_KEY?.trim() || null;

if (parsed.NODE_ENV === 'production' && brevoApiKey === null) {
  throw new Error(
    'Falta BREVO_API_KEY: es obligatoria en producción para enviar correos reales.',
  );
}

export const env = {
  nodeEnv: parsed.NODE_ENV,
  isProduction: parsed.NODE_ENV === 'production',
  port: parsed.PORT,
  appUrl: parsed.APP_URL,
  trustProxy: parsed.TRUST_PROXY,
  corsOrigins: parsed.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean),
  contactEmail: parsed.CONTACT_EMAIL,
  mailFromName: parsed.MAIL_FROM_NAME,
  mailFromAddress: parsed.MAIL_FROM ?? parsed.CONTACT_EMAIL,
  brevoApiKey,
} as const;
