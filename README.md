# Sitio web — Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi

Sitio institucional del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi (La Unión,
Región de Los Ríos, Chile). Construido con Next.js (App Router), React, TypeScript estricto y
Tailwind CSS, preparado para desplegarse en Vercel.

> **Estado del contenido.** Ningún dato oficial fue inventado. Lo que aún no entrega el liceo
> aparece marcado en el sitio como *pendiente*, *por confirmar*, *texto provisional* o *texto de
> ejemplo*. Antes de publicar, revise la sección [Antes de publicar](#antes-de-publicar).

## Índice

1. [Requisitos](#requisitos)
2. [Instalación y ejecución local](#instalación-y-ejecución-local)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Cómo actualizar el contenido](#cómo-actualizar-el-contenido)
5. [Variables de entorno](#variables-de-entorno)
6. [Servicios externos](#servicios-externos)
7. [Pruebas y verificación](#pruebas-y-verificación)
8. [Conexión con GitHub](#conexión-con-github)
9. [Despliegue en Vercel](#despliegue-en-vercel)
10. [Dominio personalizado y HTTPS](#dominio-personalizado-y-https)
11. [Seguridad y privacidad](#seguridad-y-privacidad)
12. [Mantenimiento](#mantenimiento)
13. [Antes de publicar](#antes-de-publicar)

## Requisitos

- Node.js 20.9 o superior (recomendado: la versión LTS actual, 24.x).
- npm 10 o superior.
- Una cuenta de GitHub y una de Vercel para publicar.

## Instalación y ejecución local

```bash
npm install
cp .env.example .env.local   # en Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

Compilación de producción local:

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
src/
  app/                    Rutas (App Router). Cada carpeta es una URL.
    page.tsx              Portada
    quienes-somos/        Quiénes somos, historia, proyecto educativo, comunidad
    especialidades/       Índice y [slug] con el detalle de cada especialidad
    noticias/             Listado y [slug] con el detalle
    admision/  documentos/  proyectos/  contacto/  privacidad/  creditos/
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.tsx
  components/
    layout/               Encabezado (menú y menú móvil) y pie de página
    ui/                   Piezas reutilizables (Container, Foto, Emblema, Pendiente…)
    home/                 Secciones de la portada
    especialidades/ noticias/ contacto/
  content/                TODO el contenido editable (ver abajo)
  lib/                    Tipos, SEO, fechas, validación y envío del formulario
public/
  brand/                  Logotipos oficiales (no editar ni recolorear)
  images/                 Imágenes provisionales de bancos abiertos
tests/                    Pruebas (vitest)
DESIGN.md                 Sistema visual y reglas de diseño
```

## Cómo actualizar el contenido

Todo el contenido está centralizado en `src/content/`. No hace falta tocar componentes.

| Qué | Archivo |
| --- | --- |
| Nombre, dirección, correos, teléfono, redes, sostenedor, hitos | `src/content/institucion.ts` |
| Especialidades (resumen, competencias, perfil de egreso, campo laboral, galería) | `src/content/especialidades.ts` |
| Noticias | `src/content/noticias.ts` |
| Documentos descargables | `src/content/documentos.ts` |
| Proyectos y actividades | `src/content/proyectos.ts` |
| Menú y pie de página | `src/content/navegacion.ts` |
| Logotipos | `src/content/marca.ts` y `public/brand/` |
| Créditos de imágenes provisionales | `src/content/creditos-imagenes.ts` |

### Datos pendientes de validación

Los bloques que el liceo debe completar usan el tipo `Contenido`:

```ts
// Pendiente (el sitio muestra la nota en un recuadro "pendiente"):
perfilEgreso: { estado: "pendiente", nota: "…" },
// Validado (el sitio muestra la lista):
perfilEgreso: { estado: "validado", valor: ["Primer punto", "Segundo punto"] },
```

Los resúmenes de especialidad tienen `validado: false` mientras sean provisionales.

### Publicar una noticia

Agregue un objeto al arreglo de `src/content/noticias.ts` con `slug` único (minúsculas y guiones),
`fecha` en formato `AAAA-MM-DD`, `categoria`, `titulo`, `bajada`, `cuerpo` (párrafos) y
`ejemplo: false`. **Elimine las noticias de ejemplo antes de publicar.** Para una imagen, copie el
archivo a `public/images/noticias/` y use `imagenPropia(src, alt, ancho, alto)`.

### Reemplazar imágenes provisionales por fotografías del liceo

1. Copie la foto (JPG o WebP, idealmente de 1920 px de ancho) en `public/images/...`.
2. En el archivo de contenido, cambie `imagenProvisional("/images/…")` por
   `imagenPropia("/images/…", "Descripción de lo que se ve", ancho, alto)`.
3. Si ya no usa una imagen provisional, quítela de `creditos-imagenes.ts`.

### Imágenes y menores de edad

La comunidad incluye menores de edad. No publique fotografías en que se identifique a estudiantes,
ni sus nombres completos, sin la **autorización escrita de su apoderado**. Prefiera fotos de
manos, herramientas, trabajos terminados o grupos a distancia.

### Documentos

Publique solo documentos oficiales y públicos. Hoy se enlazan los PDF que el liceo publica en el
Sistema de Admisión Escolar (Mineduc). Para documentos propios, súbalos a un almacenamiento
persistente (por ejemplo **Vercel Blob**, ver [Servicios externos](#servicios-externos)) o a
`public/documentos/` si son pequeños y públicos, y agregue la entrada en `documentos.ts`. Nunca
publique documentos internos o con datos personales.

## Variables de entorno

Copie `.env.example` a `.env.local` para desarrollo. En Vercel se configuran en
**Project → Settings → Environment Variables**.

| Variable | Tipo | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Pública | URL canónica del sitio (p. ej. `https://www.industrialfenner.cl`). Se usa en metadatos, sitemap y Open Graph. |
| `RESEND_API_KEY` | **Secreta** | Clave de la API de Resend para enviar el formulario de contacto. |
| `CONTACT_TO_EMAIL` | Secreta | Casilla del liceo que recibe los mensajes. |
| `CONTACT_FROM_EMAIL` | Secreta | Remitente verificado en Resend (p. ej. `Sitio web <contacto@dominio-del-liceo.cl>`). |
| `FACEBOOK_PAGE_ID` | Secreta | Id de la página de Facebook del liceo, para las noticias de la portada. |
| `FACEBOOK_PAGE_TOKEN` | **Secreta** | Token de acceso de la página. Sin él, la portada muestra las noticias del sitio. Cómo obtenerlo: [`docs/facebook.md`](docs/facebook.md). |

- Solo las variables con prefijo `NEXT_PUBLIC_` llegan al navegador. Las demás quedan en el servidor.
- `.env.local` y cualquier `.env*` están en `.gitignore`. **Nunca suba claves al repositorio.**
- Si faltan las variables del formulario, el sitio no simula el envío: muestra un aviso con el
  correo de secretaría.

## Servicios externos

| Servicio | ¿Obligatorio? | Para qué |
| --- | --- | --- |
| **Vercel** | Sí | Hospedaje, HTTPS, despliegues de prueba y producción. |
| **GitHub** | Sí | Repositorio y despliegue continuo. |
| **Resend** (resend.com) | Para el formulario | Envío de los mensajes de contacto por correo. Requiere verificar el dominio del remitente (registros DNS SPF/DKIM). |
| **Meta (Graph API)** | Opcional | Muestra las publicaciones de Facebook en la grilla de noticias de la portada, visibles sin sesión. Ver [`docs/facebook.md`](docs/facebook.md). |
| Vercel Blob | Opcional | Documentos o fotografías que deban persistir y no quepan en el repositorio. |
| Base de datos (Postgres desde el Marketplace de Vercel, p. ej. Neon) | No por ahora | Solo si en el futuro se agrega un panel de administración o limitación de frecuencia persistente. |

El sitio **no usa base de datos**: todo el contenido vive en el repositorio y el formulario envía un
correo sin guardar los mensajes. Esto evita guardar datos personales y mantiene costos en cero.

### Hacia un panel de administración (futuro)

La arquitectura ya separa contenido (`src/content/`) de presentación, con tipos en
`src/lib/types.ts`. Para un panel con usuarios y roles se recomienda: Postgres administrado
(Marketplace de Vercel), autenticación mantenida (p. ej. Auth.js o el proveedor del sostenedor),
autorización por rol verificada en el servidor, validación con zod, y Vercel Blob para archivos.
Las funciones de `src/content/*` (p. ej. `noticiasOrdenadas`, `getNoticia`) serían reemplazadas por
consultas a la base de datos con `"use cache"` y `cacheTag`. No se construyó en esta versión porque
no era necesario para publicar.

## Pruebas y verificación

```bash
npm run typecheck   # TypeScript estricto
npm run lint        # ESLint (reglas de Next.js y Core Web Vitals)
npm run test        # Pruebas con vitest (validación del formulario e integridad del contenido)
npm run check       # Las tres anteriores
npm run build       # Compilación de producción
```

## Conexión con GitHub

```bash
git init
git add .
git commit -m "Sitio web del liceo"
git branch -M main
git remote add origin https://github.com/<organizacion>/<repositorio>.git
git push -u origin main
```

Antes del primer `git add`, confirme que `git status` no lista ningún archivo `.env` con claves.

## Despliegue en Vercel

1. Entre a <https://vercel.com/new> e importe el repositorio de GitHub.
2. Framework: **Next.js** (se detecta solo). Comando de build `npm run build`; no cambie la
   carpeta de salida.
3. En **Environment Variables** agregue las variables de la tabla anterior para *Production*
   (y, si quiere probar el formulario en previews, también para *Preview*).
4. Pulse **Deploy**.

Desde entonces:

- Cada `git push` a `main` publica en **producción**.
- Cada rama o pull request genera un **despliegue de prueba** (*Preview*) con su propia URL. Los
  previews no se indexan en buscadores (`robots.txt` bloquea todo cuando `VERCEL_ENV` no es
  `production`).

## Dominio personalizado y HTTPS

1. En Vercel: **Project → Settings → Domains → Add** e ingrese el dominio (p. ej.
   `www.industrialfenner.cl`, que el PEI declara como sitio oficial).
2. Vercel indica los registros DNS a crear en el proveedor del dominio (para `.cl`, el
   administrador del dominio en NIC Chile o su proveedor DNS): normalmente un registro `CNAME`
   para `www` y un `A` para el dominio raíz.
3. Vercel emite y renueva el certificado HTTPS automáticamente.
4. Actualice `NEXT_PUBLIC_SITE_URL` con el dominio final y vuelva a desplegar.

## Seguridad y privacidad

- Cabeceras de seguridad en `next.config.ts`: HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` y una
  `Content-Security-Policy` en producción.
- Formulario: validación en servidor con zod, campo trampa contra spam y tiempo mínimo de
  llenado, cuerpo del correo en texto plano, sin exponer errores internos.
- Sin cookies de seguimiento ni analítica. Sin mapas incrustados (el mapa se abre en Google Maps
  solo si la persona hace clic).
- Política de privacidad en `/privacidad` (debe revisarla el asesor legal del sostenedor).

## Mantenimiento

- Actualice dependencias periódicamente: `npm outdated`, luego `npm update` y `npm run check && npm run build`.
- Revise `npm audit` antes de cada publicación importante.
- El archivo `AGENTS.md` lo mantiene Next.js para asistentes de código; no lo borre.

## Antes de publicar

- [ ] Confirmar el teléfono oficial (las fuentes oficiales lo escriben de formas distintas).
- [ ] Confirmar la cuenta oficial de Instagram (`@indufenner`).
- [ ] Eliminar las tres noticias de ejemplo y publicar noticias reales.
- [ ] Validar resúmenes de especialidades y completar competencias, perfil de egreso, actividades y campo laboral.
- [ ] Transcribir visión, misión y sellos desde el PEI.
- [ ] Completar equipo directivo y estamentos (con autorización de cada persona).
- [ ] Reemplazar imágenes provisionales por fotografías propias autorizadas.
- [ ] Configurar Resend y las variables del formulario, y enviar un mensaje de prueba.
- [ ] Obtener el token de la página de Facebook y configurar `FACEBOOK_PAGE_ID` y `FACEBOOK_PAGE_TOKEN` ([guía](docs/facebook.md)).
- [ ] Revisión legal de la política de privacidad.
- [ ] Configurar el dominio y `NEXT_PUBLIC_SITE_URL`.

## Verificaciones realizadas (octubre de 2026)

Ejecutado en local con Node.js 24.20 sobre la compilación de producción (`npm run build` + `next start`):

- `npm run typecheck`, `npm run lint` y `npm run test` (50 pruebas) sin errores; `npm run build` genera 31 rutas estáticas.
- Revisión en navegador a 1440 px y 375 px de las 17 rutas: un solo `h1` por página, títulos de dos líneas como máximo, sin desborde horizontal, sin enlaces internos rotos ni recursos con error.
- Interacciones: menú y submenús, menú móvil, pestañas de especialidades de la portada, filtro de noticias.
- Formulario: validación por campo, aviso cuando faltan las variables de Resend (no simula el envío) y tiempo mínimo tras un reintento.
- Cabeceras de seguridad, `robots.txt`, `sitemap.xml` (sin noticias de ejemplo), imagen Open Graph e iconos.

**No verificado todavía:**

- Envío real de correo: necesita una cuenta de Resend y un dominio verificado.
- Despliegue en Vercel y dominio propio: el proyecto no se ha publicado.
- Auditoría Lighthouse y pruebas con lector de pantalla y dispositivos físicos: no se ejecutaron. Conviene hacerlas en el primer despliegue de prueba.
