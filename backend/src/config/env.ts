import 'dotenv/config';
import { z } from 'zod';

/**
 * Carga y valida las variables de entorno.
 *
 * Los datos sensibles (SMTP_USER, SMTP_PASS, ...) viven SOLO en .env,
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

  // SMTP (sensible)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65_535).default(587),
  SMTP_SECURE: booleanFromString,
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
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
 * Credenciales SMTP. `null` cuando no están configuradas:
 * en desarrollo se simula el envío (jsonTransport) y en producción se
 * lanza un error, porque los correos reales son obligatorios.
 */
const smtp =
  parsed.SMTP_HOST && parsed.SMTP_USER && parsed.SMTP_PASS
    ? {
        host: parsed.SMTP_HOST,
        port: parsed.SMTP_PORT,
        secure: parsed.SMTP_SECURE, // true => 465 (SSL), false => 587 (STARTTLS)
        user: parsed.SMTP_USER,
        pass: parsed.SMTP_PASS,
      }
    : null;

const smtpParcialmenteConfigurado =
  [parsed.SMTP_HOST, parsed.SMTP_USER, parsed.SMTP_PASS].some(Boolean) && smtp === null;
if (smtpParcialmenteConfigurado) {
  console.warn(
    'Configuración SMTP incompleta: se requieren SMTP_HOST, SMTP_USER y SMTP_PASS juntos.',
  );
}

if (parsed.NODE_ENV === 'production' && smtp === null) {
  throw new Error(
    'Faltan las variables SMTP_HOST, SMTP_USER y SMTP_PASS: son obligatorias en producción para enviar correos reales.',
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
  mailFrom: `"${parsed.MAIL_FROM_NAME}" <${parsed.MAIL_FROM ?? parsed.CONTACT_EMAIL}>`,
  smtp,
} as const;
