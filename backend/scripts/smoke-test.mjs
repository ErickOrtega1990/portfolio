#!/usr/bin/env node
/**
 * Smoke test de la API de contacto.
 *
 * Requiere el servidor corriendo (npm run dev) en http://localhost:3000
 * (o pasa la URL base como argumento).
 *
 * Uso: node scripts/smoke-test.mjs [baseUrl]
 *
 * Nota: la prueba de rate limit consume la cuota de la ventana de 15
 * minutos; para repetir la prueba completa reinicia el servidor o espera
 * la ventana.
 */

const baseUrl = process.argv[2] ?? 'http://localhost:3000';

let passed = 0;
let failed = 0;

function check(name, condition, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`[PASS] ${name}`);
  } else {
    failed += 1;
    console.error(`[FAIL] ${name}${detail ? ` -> ${detail}` : ''}`);
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  let body = null;
  try {
    body = await response.json();
  } catch {
    // respuesta sin cuerpo JSON
  }
  return { response, body };
}

const jsonPost = (path, payload) =>
  request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
    body: JSON.stringify(payload),
  });

async function main() {
  console.log(`\nSmoke test contra ${baseUrl}\n`);

  // 1) Health check
  const health = await request('/api/health');
  check('GET /api/health responde 200', health.response.status === 200, `status=${health.response.status}`);
  check('GET /api/health devuelve ok:true', health.body?.ok === true);

  // 2) Cabeceras de seguridad (helmet + x-powered-by deshabilitado)
  check(
    'helmet: X-Content-Type-Options: nosniff',
    health.response.headers.get('x-content-type-options') === 'nosniff',
  );
  check(
    'helmet: Strict-Transport-Security presente',
    health.response.headers.has('strict-transport-security'),
  );
  check('x-powered-by oculto', !health.response.headers.has('x-powered-by'));

  // 3) CORS: whitelist de orígenes
  const preflightAllowed = await fetch(`${baseUrl}/api/contact`, {
    method: 'OPTIONS',
    headers: {
      Origin: 'http://localhost:5173',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type',
    },
  });
  check(
    'CORS: origen permitido recibe Access-Control-Allow-Origin',
    preflightAllowed.headers.get('access-control-allow-origin') === 'http://localhost:5173',
    preflightAllowed.headers.get('access-control-allow-origin') ?? '(sin cabecera)',
  );

  const preflightDenied = await fetch(`${baseUrl}/api/contact`, {
    method: 'OPTIONS',
    headers: { Origin: 'https://evil.example', 'Access-Control-Request-Method': 'POST' },
  });
  check(
    'CORS: origen NO permitido no recibe Access-Control-Allow-Origin',
    !preflightDenied.headers.has('access-control-allow-origin'),
  );

  // 4) Validación de datos (400 con detalle por campo)
  const invalid = await jsonPost('/api/contact', {
    name: 'x',
    email: 'no-es-un-correo',
    message: 'hola',
  });
  check('POST con datos inválidos responde 400', invalid.response.status === 400, `status=${invalid.response.status}`);
  check(
    'POST inválido devuelve errores por campo',
    Array.isArray(invalid.body?.errors) && invalid.body.errors.length >= 3,
    JSON.stringify(invalid.body?.errors),
  );

  // 5) JSON malformado
  const malformed = await request('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"name": ',
  });
  check('JSON malformado responde 400', malformed.response.status === 400, `status=${malformed.response.status}`);

  // 6) Límite de tamaño del cuerpo: 10 KB
  const tooBig = await request('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'a'.repeat(11 * 1024),
      email: 'test@example.com',
      message: 'mensaje',
    }),
  });
  check('Cuerpo > 10 KB responde 413', tooBig.response.status === 413, `status=${tooBig.response.status}`);

  // 7) Ruta inexistente
  const notFound = await request('/api/no-existe');
  check('Ruta inexistente responde 404', notFound.response.status === 404, `status=${notFound.response.status}`);

  // 8) Envío válido (debe generar el correo al visitante y la notificación
  //    a contacto@erickortegadev.cl)
  const valid = await jsonPost('/api/contact', {
    name: 'Prueba Smoke',
    email: 'smoke.test@example.com',
    message: 'Mensaje de prueba enviado por el smoke test del portfolio.',
  });
  check('POST válido responde 200', valid.response.status === 200, `status=${valid.response.status}`);
  check('POST válido devuelve ok:true', valid.body?.ok === true, JSON.stringify(valid.body));

  // 9) Rate limit del formulario: 5 envíos por ventana de 15 min.
  //    Ya se consumieron 3 (inválido, malformado y válido); los siguientes
  //    deben agotar la cuota y responder 429.
  let rateLimitedAt = null;
  for (let i = 1; i <= 5; i += 1) {
    const r = await jsonPost('/api/contact', {
      name: 'Rate Limit',
      email: 'rate@example.com',
      message: 'Prueba de rate limit del smoke test del portfolio.',
    });
    if (r.response.status === 429) {
      rateLimitedAt = i;
      break;
    }
  }
  check('Rate limit responde 429 al agotar la cuota', rateLimitedAt !== null, 'nunca respondió 429');

  console.log(`\nResultado: ${passed} correctas, ${failed} fallidas.\n`);
  process.exitCode = failed > 0 ? 1 : 0;
}

main().catch((error) => {
  console.error('\n[FAIL] No se pudo ejecutar el smoke test:', error.message);
  console.error('¿Está el servidor corriendo? (npm run dev)\n');
  process.exitCode = 1;
});
