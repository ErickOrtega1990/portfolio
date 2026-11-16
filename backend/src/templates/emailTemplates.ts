import type { ContactPayload } from "../validators/contact.validator";
import { env } from "../config/env";
import { escapeHtml } from "../utils/html";

export interface EmailContent {
  subject: string;
  text: string;
  html: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

/** Contenido usuario escapado y con saltos de línea listos para HTML. */
function toHtmlLines(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

/**
 * Layout base con estilos inline (los clientes de correo no soportan
 * <style>: todo va inline y en tablas por compatibilidad).
 */
function layout(contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="es">
  <body style="margin:0;padding:0;background-color:#f1f5f9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;">
${contentHtml}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Correo de confirmación (auto-respuesta) que recibe el visitante
 * después de enviar el formulario.
 */
export function buildAutoReplyEmail(
  payload: ContactPayload,
  receivedAt: Date,
): EmailContent {
  const name = escapeHtml(payload.name);
  const messageHtml = toHtmlLines(payload.message);
  const date = formatDate(receivedAt);

  return {
    subject: `Recibí tu mensaje, ${payload.name}`,
    text: [
      `Hola ${payload.name}:`,
      "",
      "Gracias por escribirme a través del formulario de contacto de erickortegadev.cl.",
      "Recibí tu mensaje y te responderé a la brevedad.",
      "",
      "--- Tu mensaje ---",
      payload.message,
      "------------------",
      "",
      `Enviado el ${date}. Si no fuiste tú quien escribió, ignora este correo.`,
      "",
      "Erick Ortega",
      env.appUrl,
    ].join("\n"),
    html: layout(`
            <tr>
              <td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
                <h1 style="margin:0 0 16px;font-size:20px;line-height:1.4;color:#0f172a;">¡Hola ${name}!</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                  Gracias por escribirme a través del formulario de contacto de
                  <strong>erickortegadev.cl</strong>. Recibí tu mensaje y te responderé a la brevedad.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <blockquote style="margin:0;padding:14px 18px;background-color:#007db3;border-left:4px solid #0d9488;border-radius:0 8px 8px 0;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#475569;">${messageHtml}</p>
                </blockquote>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;">Recibido el ${date}. Si no fuiste tú quien escribió, puedes ignorar este correo.</p>
              </td>
            </tr>`),
  };
}

/**
 * Correo que llega a contacto@erickortegadev.cl con la solicitud de
 * contacto. Lleva replyTo hacia el visitante para responder directamente.
 */
export function buildContactNotificationEmail(
  payload: ContactPayload,
  receivedAt: Date,
): EmailContent {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const messageHtml = toHtmlLines(payload.message);
  const date = formatDate(receivedAt);

  return {
    subject: `Nueva solicitud de contacto — ${payload.name}`,
    text: [
      "Nueva solicitud de contacto recibida desde el formulario web.",
      "",
      `Nombre:  ${payload.name}`,
      `Email:   ${payload.email}`,
      `Fecha:   ${date}`,
      "",
      "Mensaje:",
      payload.message,
    ].join("\n"),
    html: layout(`
            <tr>
              <td style="padding:32px 32px 0;font-family:Arial,Helvetica,sans-serif;border-bottom:1px solid #e2e8f0;">
                <h1 style="margin:0 0 16px;font-size:18px;color:#0f172a;">📩 Nueva solicitud de contacto</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#334155;">
                  <tr>
                    <td style="padding:6px 0;width:90px;color:#94a3b8;">Nombre</td>
                    <td style="padding:6px 0;"><strong>${name}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#94a3b8;">Email</td>
                    <td style="padding:6px 0;"><a href="mailto:${payload.email}" style="color:#0d9488;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#94a3b8;">Fecha</td>
                    <td style="padding:6px 0;">${date}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 32px;">
                <blockquote style="margin:0;padding:14px 18px;background-color:#f8fafc;border-left:4px solid #0d9488;border-radius:0 8px 8px 0;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#475569;">${messageHtml}</p>
                </blockquote>
                <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">
                  Responde este correo para contestar directamente al remitente.
                </p>
              </td>
            </tr>`),
  };
}
