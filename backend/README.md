# Portfolio Backend — API de contacto

API REST que recibe las solicitudes del formulario de contacto de
[erickortegadev.cl](https://erickortegadev.cl) y las envía por correo con
**Nodemailer**:

1. **Notificación al buzón del sitio** (`contacto@erickortegadev.cl`) con la
   solicitud de contacto, con `replyTo` hacia el visitante para poder
   responder directamente.
2. **Auto-respuesta al visitante** confirmando que su mensaje fue recibido.

**Stack:** Node.js + TypeScript + Express + API REST de Brevo (Zod para validación).

## Estructura

```
backend/
├── src/
│   ├── app.ts                      # App Express: seguridad (helmet, cors, rate limit, 10 KB)
│   ├── server.ts                   # Levanta el servidor HTTP + apagado ordenado
│   ├── config/
│   │   └── env.ts                  # Carga y valida variables de entorno (fail fast)
│   ├── routes/                     # Definición de rutas (Router)
│   │   ├── index.ts                #   router raíz /api
│   │   └── contact.routes.ts       #   POST /api/contact (+ middlewares de la ruta)
│   ├── controllers/                # Endpoints (req -> servicio -> res)
│   │   ├── contact.controller.ts
│   │   └── health.controller.ts
│   ├── services/                   # Lógica de negocio y de correo
│   │   ├── contact.service.ts      #   caso de uso "solicitud de contacto"
│   │   └── mail.service.ts         #   cliente de la API de Brevo (HTTPS) + envíos
│   ├── middlewares/
│   │   ├── rateLimiter.ts          #   límites global y del formulario
│   │   ├── validateBody.ts          #   validación de body con zod
│   │   ├── requestLogger.ts
│   │   ├── notFoundHandler.ts
│   │   └── errorHandler.ts         #   errores centralizados sin filtrar detalles
│   ├── validators/
│   │   └── contact.validator.ts    #   esquema zod del formulario
│   ├── templates/
│   │   └── emailTemplates.ts       #   HTML/texto de los dos correos
│   └── utils/
│       ├── errors.ts               #   AppError
│       ├── asyncHandler.ts
│       ├── html.ts                 #   escape de contenido usuario
│       └── logger.ts
├── scripts/
│   └── smoke-test.mjs              # pruebas de humo de la API
├── .env.example                    # plantilla de variables de entorno
├── .gitignore                      # ignora node_modules y .env
├── package.json
└── tsconfig.json
```

## Contrato de la API

### `POST /api/contact`

Envía la solicitud de contacto y dispara los dos correos.

**Request**

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "message": "Hola, me gustaría conversar sobre un proyecto."
}
```

| Campo     | Tipo   | Reglas                                            |
| --------- | ------ | ------------------------------------------------- |
| `name`    | string | 2–80 caracteres, sin caracteres de control         |
| `email`   | string | correo válido, máximo 254 caracteres              |
| `message` | string | 10–5000 caracteres, saltos de línea permitidos    |

El cuerpo completo no puede superar **10 KB**.

**Responses**

| Código | Cuerpo                                                                 |
| ------ | ---------------------------------------------------------------------- |
| `200`  | `{ "ok": true, "message": "Mensaje enviado. Recibirás una confirmación en tu correo." }` |
| `400`  | `{ "ok": false, "message": "...", "errors": [{ "field": "email", "message": "..." }] }` (datos o JSON inválidos) |
| `413`  | `{ "ok": false, "message": "El cuerpo de la solicitud supera el límite de 10 KB." }` |
| `429`  | `{ "ok": false, "message": "Has alcanzado el límite de mensajes..." }` |
| `502`  | `{ "ok": false, "code": "MAIL_DELIVERY_FAILED", "message": "..." }` (falla SMTP) |
| `500`  | `{ "ok": false, "message": "Error interno del servidor." }`               |

### `GET /api/health`

Comprobación de disponibilidad. Responde `200` con
`{ ok, environment, mailer, uptimeSeconds }`.

## Seguridad implementada

| Medida                  | Dónde                                                 |
| ----------------------- | ----------------------------------------------------- |
| `helmet`                | `app.ts` — cabeceras de seguridad HTTP                 |
| CORS con whitelist      | `app.ts` — solo los orígenes de `CORS_ORIGIN`          |
| Rate limiting           | global (`/api`, 100 req/15 min por IP) y estricto en el formulario (5 envíos/15 min por IP) |
| Límite de carga 10 KB   | `express.json` / `express.urlencoded` con `limit: '10kb'` |
| Validación estricta     | `validators/contact.validator.ts` (zod) + rechazo de caracteres de control (anti inyección de cabeceras CRLF) |
| Escape de HTML          | `utils/html.ts` — el contenido usuario se escapa antes de entrar a las plantillas de correo |
| Secretos en `.env`     | credencial de la API fuera de git (`BREVO_API_KEY`) |
| Errores opacos          | `middlewares/errorHandler.ts` — sin stack traces al cliente |
| `x-powered-by` oculto   | `app.ts`                                               |

## Configuración (`.env`)

Copia `.env.example` a `.env` y completa los valores. Variables:

| Variable          | Descripción                                              | Default                        |
| ----------------- | -------------------------------------------------------- | ------------------------------ |
| `NODE_ENV`       | `development` / `production` / `test`                    | `development`                 |
| `PORT`           | puerto HTTP                                              | `3000`                        |
| `APP_URL`        | URL pública del sitio (plantillas de correo)             | `https://erickortegadev.cl`   |
| `CORS_ORIGIN`    | orígenes CORS permitidos, separados por coma              | `http://localhost:5173`       |
| `TRUST_PROXY`     | `true` detrás de un proxy (Render, nginx, Cloudflare)     | `false`                       |
| `CONTACT_EMAIL`   | buzón que recibe las solicitudes (obligatorio)           | —                              |
| `MAIL_FROM_NAME`  | nombre visible del remitente                             | `Erick Ortega`                |
| `MAIL_FROM`      | remitente verificado en Brevo (usa `CONTACT_EMAIL` si omite)| —                            |
| `BREVO_API_KEY`   | API key de Brevo (obligatoria en producción)             | —                              |

> Sin `BREVO_API_KEY` en desarrollo, la API arranca igual y los correos se
> simulan por consola, para poder desarrollar sin secretos. En producción su
> ausencia hace fallar el arranque.

## Ejecución

```bash
npm install
cp .env.example .env   # y completar credenciales

npm run dev            # desarrollo con recarga (tsx watch)
npm run build          # compila a dist/ (CommonJS)
npm start              # ejecuta el build (definir NODE_ENV=production)
npm run typecheck      # verificación de tipos sin emitir
npm run smoke          # smoke test contra localhost:3000 (requiere npm run dev)
```

## Configuración de Brevo

1. Crea una cuenta en [Brevo](https://www.brevo.com/) (el plan gratuito
   incluye 300 envíos/día, suficiente para un formulario de contacto).
2. Verifica el remitente: *Senders* → añade `contacto@erickortegadev.cl` (o el
   valor que uses en `MAIL_FROM`) y confirma el correo de verificación.
3. Genera una API key con permisos de envío y guárdala en `BREVO_API_KEY`.
4. Para mejorar la entregabilidad, agrega en el DNS de Hostinger los registros
   **SPF / DKIM / DMARC** que te indique Brevo para `erickortegadev.cl`.
   **No cambies los registros MX**: el correo entrante sigue llegando al buzón
   de Hostinger.

## Despliegue en Render (plan Free)

Los servicios Free de Render **no pueden enviar tráfico saliente por los
puertos SMTP 25, 465 y 587**; por eso el envío se hace por HTTPS a la API de
Brevo (puerto 443).

Variables a configurar en Render → *Environment*:

```text
NODE_ENV=production
CORS_ORIGIN=https://erickortegadev.cl,https://www.erickortegadev.cl
TRUST_PROXY=true
CONTACT_EMAIL=contacto@erickortegadev.cl
MAIL_FROM_NAME=Erick Ortega
MAIL_FROM=contacto@erickortegadev.cl
BREVO_API_KEY=...
```

`PORT` la asigna Render automáticamente. Build Command:
`npm install && npm run build`. Start Command: `npm start`.

`TRUST_PROXY=true` es obligatorio: Render envía `X-Forwarded-For` y sin
esta variable `express-rate-limit` falla con
`ERR_ERL_UNEXPECTED_X_FORWARDED_FOR`.

Comprueba el despliegue con `GET /api/health`: debe devolver
`"mailer": "brevo (API HTTPS)"`.

## Conexión con el frontend

Ejemplo para el hook del formulario (`useMailjs.ts`):

```ts
const sendEmail = async (data: FormDataType) => {
  setResStatus("Enviando...");
  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    setResStatus(response.ok ? "¡Mensaje enviado!" : body.message);
  } catch {
    setResStatus("Error de red. Intenta nuevamente.");
  }
};
```

En producción, si el frontend está en Hostinger y el backend en Render, la URL
debe ser **absoluta** (`https://TU-SERVICIO.onrender.com/api/contact`). Vite
incorpora `VITE_MAILING` al compilar, así que hay que reconstruir el frontend
después de cambiarla. Si en cambio ambos están bajo el mismo dominio mediante
un proxy inverso, se puede usar la ruta relativa `/api/contact`.
