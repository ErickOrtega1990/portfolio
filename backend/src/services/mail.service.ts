import nodemailer, {
  getTestMessageUrl,
  type SentMessageInfo,
  type Transporter,
} from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import type { ContactPayload } from '../validators/contact.validator';
import {
  buildAutoReplyEmail,
  buildContactNotificationEmail,
} from '../templates/emailTemplates';

let transporter: Transporter | null = null;

function buildTransporter(): Transporter {
  if (env.smtp) {
    return nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure, // true => 465 (SSL), false => 587 (STARTTLS)
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }

  // Desarrollo sin credenciales SMTP: transporte JSON que no envía nada,
  // permite probar la API sin exponer secretos.
  logger.warn('SMTP no configurado: los correos se simulan (transporte JSON).');
  return nodemailer.createTransport({ jsonTransport: true });
}

function getMailer(): Transporter {
  transporter ??= buildTransporter();
  return transporter;
}

/** En desarrollo, si el SMTP apunta a Ethereal, loguea el link de vista previa. */
function logPreviewUrl(info: SentMessageInfo): void {
  const url = getTestMessageUrl(info);
  if (url) logger.info(`Vista previa del correo (Ethereal): ${url}`);
}

/**
 * Envía la respuesta automática de confirmación al visitante.
 */
export async function sendAutoReply(payload: ContactPayload): Promise<void> {
  const email = buildAutoReplyEmail(payload, new Date());

  const info: SentMessageInfo = await getMailer().sendMail({
    from: env.mailFrom,
    to: payload.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  logger.info(`Auto-respuesta enviada a ${payload.email} (mensaje ${info.messageId ?? 'simulado'})`);
  logPreviewUrl(info);
}

/**
 * Envía la solicitud de contacto al buzón del sitio
 * (contacto@erickortegadev.cl), con replyTo hacia el visitante.
 */
export async function sendContactNotification(payload: ContactPayload): Promise<void> {
  const email = buildContactNotificationEmail(payload, new Date());

  const info: SentMessageInfo = await getMailer().sendMail({
    from: env.mailFrom,
    to: env.contactEmail,
    replyTo: payload.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  logger.info(
    `Solicitud de contacto enviada a ${env.contactEmail} (mensaje ${info.messageId ?? 'simulado'})`,
  );
  logPreviewUrl(info);
}

/** Cierra las conexiones del transporte (apagado ordenado). */
export function closeMailer(): void {
  if (transporter) {
    transporter.close();
    transporter = null;
  }
}
