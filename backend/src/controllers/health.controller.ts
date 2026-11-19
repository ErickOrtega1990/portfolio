import type { Request, Response } from 'express';
import { env } from '../config/env';

/**
 * GET /api/health — comprobación de disponibilidad (para monitoring o
 * balanceadores). No expone secretos.
 */
export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    ok: true,
    environment: env.nodeEnv,
    mailer: env.brevoApiKey ? 'brevo (API HTTPS)' : 'simulado (sin BREVO_API_KEY)',
    uptimeSeconds: Math.round(process.uptime()),
  });
}
