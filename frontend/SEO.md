# SEO del portafolio

Este documento explica qué se añadió para que `https://www.erickortegadev.cl/` pueda aparecer e indexarse en Google, y cómo modificarlo en el futuro.

> Estado actual: cambios aplicados en `frontend/`. Falta hacer `commit` y `push` para que se desplieguen.

---

## Qué se hizo

| Archivo                | Cambio                        | Para qué sirve                                                                                                                                       |
| ---------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`           | `<link rel="canonical">`      | Dice a Google que la versión oficial es `https://www.erickortegadev.cl/`. El dominio sin `www` redirige con `301` a `www`, así que evita duplicados. |
| `index.html`           | `meta description` mejorada   | Describe el sitio con palabras clave reales: React, Node.js, MongoDB, IoT, automatización, Chile.                                                    |
| `index.html`           | `meta robots`                 | `index, follow, max-image-preview:large`: permite indexar y muestra imagen grande en resultados.                                                     |
| `index.html`           | Open Graph (`og:*`)           | Controla título, descripción e imagen al compartir en WhatsApp, LinkedIn, X, etc.                                                                    |
| `index.html`           | Twitter Card (`twitter:*`)    | Igual que Open Graph, para X/Twitter.                                                                                                                |
| `index.html`           | JSON-LD `Person`              | Datos estructurados: nombre, rol, habilidades, universidad, ubicación, email y GitHub. Ayuda a Google a entender quién es la persona.                |
| `public/robots.txt`    | Archivo nuevo                 | Permite a todos los crawlers y declara la ruta del sitemap.                                                                                          |
| `public/sitemap.xml`   | Archivo nuevo                 | Lista la URL principal del sitio.                                                                                                                    |
| `public/og-image.webp` | Copia de `src/assets/yo.webp` | Imagen de vista previa al compartir el enlace.                                                                                                       |

`npm run build` verificado: los archivos `robots.txt`, `sitemap.xml` y `og-image.webp` se copian correctamente a `dist/`.

---

## Cómo modificarlo

### 1. Si cambias el dominio

El dominio aparece en varios lugares. Busca `erickortegadev.cl` y reemplázalo en:

1. `index.html` → `<link rel="canonical" ...>`
2. `index.html` → `og:url`
3. `index.html` → `og:image`
4. `index.html` → `twitter:image`
5. `index.html` → JSON-LD `"url"`
6. `public/robots.txt` → línea `Sitemap:`
7. `public/sitemap.xml` → etiqueta `<loc>`

Usa siempre la versión final con `www` y `https`, porque es la canonical.

### 2. Cambiar título o descripción

Edita `index.html`:

```html
<title>Erick Ortega | Desarrollador Fullstack</title>

<meta
  name="description"
  content="Portafolio de Erick Ortega, desarrollador fullstack especializado en React, Node.js, MongoDB, IoT y automatización industrial en Angol Chile."
/>
```

Recomendación: mantén la descripción entre 150 y 160 caracteres e incluye las palabras por las que quieres que te encuentren.

También actualiza los textos de `og:title`, `og:description`, `twitter:title` y `twitter:description` para que coincidan.

### 3. Cambiar la imagen de vista previa

Reemplaza el archivo:

```text
frontend/public/og-image.webp
```

- Si mantienes el mismo nombre, no hay que tocar nada más.
- Si cambias el nombre o formato, actualiza `og:image` y `twitter:image` en `index.html`.
- Si cambias las dimensiones, actualiza `og:image:width` y `og:image:height`.

Recomendación: usa una imagen de **1200×630 px** en JPG o PNG para máxima compatibilidad. La actual es cuadrada porque se copió de la foto de perfil.

### 4. Cambiar los datos personales del JSON-LD

Dentro de `index.html`, bloque:

```html
<script type="application/ld+json">
  { ... }
</script>
```

Campos que puedes editar:

- `"name"`: tu nombre.
- `"jobTitle"`: tu rol principal.
- `"email"`: tu correo. Si prefieres evitar spam, elimina esa línea.
- `"description"`: resumen profesional.
- `"knowsAbout"`: habilidades y tecnologías.
- `"alumniOf"`: universidad.
- `"workLocation"`: ciudad y país.
- `"sameAs"`: enlaces a GitHub, LinkedIn, etc. Puedes añadir más URLs separadas por coma.

Importante: debe ser JSON válido. No dejes comas al final de la última propiedad de un objeto.

### 5. Actualizar el sitemap

Archivo: `public/sitemap.xml`.

Cada vez que cambies contenido importantes del portafolio, actualiza:

```xml
<lastmod>2026-11-18</lastmod>
```

Si en el futuro añades rutas reales (por ejemplo `/proyectos`), agrega otro bloque:

```xml
<url>
  <loc>https://www.erickortegadev.cl/proyectos/</loc>
  <lastmod>2026-11-18</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Los anclas como `#proyectos` no se agregan al sitemap: Google las trata como parte de la misma página.

### 6. No edites `dist/`

`dist/` se regenera con:

```bash
npm run build
```

Edita siempre `index.html` y los archivos dentro de `public/`.

---

## Cómo publicar los cambios

```bash
git add frontend/index.html frontend/public
git commit -m "Add SEO metadata, sitemap and robots.txt"
git push
```

Después verifica en vivo:

- `https://www.erickortegadev.cl/robots.txt`
- `https://www.erickortegadev.cl/sitemap.xml`
- `https://www.erickortegadev.cl/og-image.webp`

---

## Cómo pedirle a Google que indexe

1. Entra a [Google Search Console](https://search.google.com/search-console).
2. Agrega una propiedad de **Dominio**: `erickortegadev.cl`.
3. Verifícala con un registro DNS TXT en Cloudflare o con el archivo HTML.
4. Ve a **Sitemaps**, escribe `sitemap.xml` y haz clic en **Enviar**.
5. Ve a **Inspección de URL**, pega `https://www.erickortegadev.cl/` y haz clic en **Solicitar indexación**.
6. Revisa el informe **Páginas** para ver errores o exclusiones.

Google puede tardar días o semanas en mostrar el sitio. Para comprobarlo busca:

```text
site:erickortegadev.cl
Erick Ortega fullstack Chile
```

---

## Solución de problemas

| Síntoma                            | Causa probable                                    | Solución                                                              |
| ---------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| `/robots.txt` da 404               | Los cambios aún no se desplegaron                 | Haz `push` y espera a que termine el deploy.                          |
| La vista previa no muestra imagen  | La URL de la imagen no es pública o está en caché | Verifica `og-image.webp` en vivo y limpia caché de Cloudflare.        |
| Aparece dos veces, con y sin `www` | Falta canonical o redirección                     | Ya está configurado: `301` a `www` + canonical.                       |
| No aparece en Google               | Falta verificación o tiempo de indexación         | Usa Search Console y solicita indexación.                             |
| Google ve poco texto               | El contenido se renderiza con React               | Es normal; opcionalmente usa prerender/SSR para servir HTML estático. |

---

## Mejoras futuras opcionales

- Separar idiomas en `/es/` y `/en/` con etiquetas `hreflang`, en vez de alternar idioma con un botón en la misma URL.
- Añadir más texto visible y proyectos con descripciones detalladas.
- Conseguir enlaces entrantes desde GitHub, LinkedIn, README y artículos.
- Generar una imagen OG 1200×630 con nombre y rol para mejorar el clic.
- Usar prerender/SSR si quieres que el HTML inicial ya contenga todo el contenido.
