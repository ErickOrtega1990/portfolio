import { env } from '../config/env';
import { logger } from '../utils/logger';
import type { ContactPayload } from '../validators/contact.validator';
import {
  buildAutoReplyEmail,
  buildContactNotificationEmail,
} from '../templates/emailTemplates';

/**
 * Envío de correos a través de la API REST de Brevo (HTTPS, puerto 443).
 *
 * Se usa HTTP en lugar de SMTP porque los planes Free de Render bloquean el
 * tráfico saliente por los puertosSMTP habituales (25, 465 y 587).
 */
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const TIMEOUT_MS = 10_000;

interface OutgoingEmail {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

interface BrevoSuccess {
  messageId?: string;
}

interface BrevoError {
  code?: string;
  message?: string;
}

async function sendEmail(email: OutgoingEmail): Promise<void> {
  // Sin credencial en desarrollo se simula el envío, como antes con jsonTransport.
  if (!env.brevoApiKey) {
    logger.warn(`Correo simulado (sin BREVO_API_KEY) para ${email.to}: ${email.subject}`);
    return;
  }

  let response: Response;
  try {
    response = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': env.brevoApiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: env.mailFromName, email: env.mailFromAddress },
        to: [{ email: email.to }],
        subject: email.subject,
        textContent: email.text,
        htmlContent: email.html,
        ...(email.replyTo ? { replyTo: { email: email.replyTo } } : {}),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    throw new Error(
      `No se pudo conectar con la API de correo: ${
        cause instanceof Error ? cause.message : String(cause)
      }`,
    );
  }

  if (!response.ok) {
    const raw = await response.text().catch(() => '');
    let detail = raw.slice(0, 300);
    try {
      const parsed = JSON.parse(raw) as BrevoError;
      detail = [parsed.code, parsed.message].filter(Boolean).join(': ') || detail;
    } catch {
      // La respuesta no era JSON: se conserva el texto recibido.
    }
    throw new Error(`Brevo respondió ${response.status}${detail ? ` (${detail})` : ''}`);
  }

  const body = (await response.json().catch(() => ({}))) as BrevoSuccess;
  logger.info(`Correo enviado a ${email.to} (mensaje ${body.messageId ?? 'sin id'})`);
}

/** Envía la respuesta automática de confirmación al visitante. */
export async function sendAutoReply(payload: ContactPayload): Promise<void> {
  const email = buildAutoReplyEmail(payload, new Date());
  await sendEmail({
    to: payload.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

/** Envía la solicitud de contacto al buzón del sitio, con replyTo al visitante. */
export async function sendContactNotification(payload: ContactPayload): Promise<void> {
  const email = buildContactNotificationEmail(payload, new Date());
  await sendEmail({
    to: env.contactEmail,
    subject: email.subject,
    text: email.text,
    html: email.html,
    replyTo: payload.email,
  });
}
