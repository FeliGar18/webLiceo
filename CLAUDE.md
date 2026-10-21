@AGENTS.md

# Instrucciones para Claude Code — Sitio web del Liceo Fenner

Este archivo lo lee Claude Code automáticamente al abrir el proyecto. Resume el contexto,
las decisiones tomadas y lo que falta, para continuar el trabajo en cualquier computador.
Lee también `README.md` (instalación, despliegue, variables) y `DESIGN.md` (sistema visual y
de movimiento) antes de cambiar algo.

## El proyecto

Sitio institucional del **Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi**
(La Unión, Región de Los Ríos, Chile), liceo técnico-profesional de 1° a 4° medio con
internado. Sostenedor: SNA Educa. RBD 22140-6. Se desplegará en **Vercel** desde el repositorio
de GitHub `FeliGar18/webLiceo` (rama `main`).

El usuario habla español de Chile: responde y escribe todo el contenido en español de Chile.

## Stack (no cambiar sin motivo)

- Next.js **16.4** con App Router, `cacheComponents: true` y `partialPrefetching: true`.
  **Es más nuevo que lo que conoces**: antes de usar una API, lee la guía en
  `node_modules/next/dist/docs/` (ver `AGENTS.md`). Puntos ya comprobados:
  - `params` es una Promise; usar los tipos globales `PageProps<"/ruta/[slug]">`.
  - Con Cache Components no usar `new Date()`, `Math.random()`, `cookies()` ni `headers()`
    durante el render; `generateStaticParams` debe devolver al menos un elemento;
    no existe `dynamicParams` (usar `notFound()`).
  - `next/image`: `priority` está obsoleto, usar `preload`.
  - `<html data-scroll-behavior="smooth">` ya está puesto.
- React 19.3, TypeScript estricto, Tailwind CSS 4, `lucide-react`, `zod` 4, `vitest` 5.
- Sin base de datos. Todo el contenido está en `src/content/*.ts`.
- Formulario de contacto: server action + envío por la API HTTP de Resend (sin SDK). Si faltan
  las variables de entorno, el formulario lo dice: nunca simula un envío exitoso.

## Comandos

```bash
npm install        # primera vez en un computador nuevo
npm run dev        # desarrollo en http://localhost:3000
npm run check      # typecheck + lint + 50 pruebas (debe pasar antes de cada commit)
npm run build      # compilación de producción (31 rutas estáticas)
```

En Windows, si `node` no está en el PATH de la terminal de Git Bash:
`export PATH="/c/Program Files/nodejs:$PATH"`.

## Reglas que el usuario pidió y que no se negocian

1. **No inventar información oficial**: autoridades, nombres, cifras, fechas, perfiles de
   egreso, contactos ni normativa. Lo que falta se modela como `Contenido` pendiente y se muestra
   con `<Pendiente>`, o se marca con `<EtiquetaProvisional>`.
2. Toda la información verificada sale del **Proyecto Educativo Institucional 2025-2026** y del
   **Reglamento Interno 2026**, publicados en el Sistema de Admisión Escolar:
   - PEI: https://cdnsae.mineduc.cl/documentos/22140/ProyectoEducativo22140.pdf
   - RIE: https://cdnsae.mineduc.cl/documentos/22140/ReglamentodeConvivencia22140.pdf
   Si agregas un dato, cita de dónde sale (en el código o en el comentario del archivo de contenido).
3. **Menores de edad**: no publicar nombres ni fotografías identificables de estudiantes sin
   autorización escrita del apoderado. Para funcionarios, solo con su autorización.
4. Las imágenes y el video de bancos abiertos son **provisionales** (`provisional: true`), se
   rotulan como referenciales y se acreditan en `/creditos`. Nunca presentarlos como del liceo.
5. Los logotipos oficiales (`public/brand/`) no se alteran ni se recolorean.
6. Diseño: seguir `DESIGN.md` al pie de la letra (motivo del chaflán, colores de la insignia,
   sin eyebrows, sin sombras en reposo, sin degradados, títulos de 2 líneas como máximo,
   sin tarjetas idénticas con borde).
7. No afirmar que algo está desplegado, configurado o probado si no se hizo.

## Mapa rápido

| Qué | Dónde |
| --- | --- |
| Datos del liceo (dirección, correos, teléfono, redes, hitos) | `src/content/institucion.ts` |
| Especialidades (módulos del PEI, título, talleres, logros, pendientes) | `src/content/especialidades.ts` |
| Comunidad educativa (cargos según dotación del PEI) | `src/content/comunidad.ts` |
| Noticias (hoy solo 3 de **ejemplo**) | `src/content/noticias.ts` |
| Documentos, proyectos, navegación | `src/content/documentos.ts`, `proyectos.ts`, `navegacion.ts` |
| Video de la portada | `src/content/portada.ts` + `public/video/` |
| Logotipos | `src/content/marca.ts` + `public/brand/` |
| Créditos de imágenes | `src/content/creditos-imagenes.ts` |
| Tokens de color y tipografía | `src/app/globals.css` |
| Sistema de movimiento | `src/app/motion.css` + `src/components/layout/Movimiento.tsx` |
| Encabezado, menú, pie | `src/components/layout/` |
| Portada | `src/app/page.tsx` + `src/components/home/` |

## Decisiones técnicas que ya se probaron (no repetir el error)

- **View Transitions**: la transición entre páginas es `<ViewTransition update="pagina">`
  alrededor de `<main>` en `layout.tsx`. **No usar `<ViewTransition name>` compartidos entre
  páginas**: con Cache Components la página anterior queda montada y oculta, el nombre se duplica
  y el navegador cancela la transición. Se intentó (foto de especialidad que viaja) y se quitó.
- **Entradas al hacer scroll**: las maneja `Movimiento.tsx` con IntersectionObserver y la Web
  Animations API (`element.animate`). **No agregarle clases ni atributos al DOM**: el efecto corre
  antes de que React hidrate la página y eso causa un error de hidratación. Lo visible al cargar nunca se oculta. Para excluir una zona: `data-sin-rv`.
- Las animaciones de entrada usan `animation-fill-mode: backwards` para no bloquear el
  `:active` de los botones.
- La franja animada y el video de la portada tienen botón de pausa (WCAG 2.2.2) y respetan
  `prefers-reduced-motion`.
- Cabeceras de seguridad y CSP (solo en producción) en `next.config.ts`. `X-Frame-Options: DENY`
  impide abrir el sitio en iframes (también en pruebas automáticas).
- Python **no** está instalado en el computador original; ffmpeg tampoco.

## Estado al último commit

Hecho y verificado en navegador (1440 px y 375 px): portada con video de fondo y carpetas de
especialidades, todas las páginas internas, detalle de especialidad con datos del PEI,
comunidad educativa por cargos, formulario de contacto, SEO (sitemap, robots, Open Graph,
JSON-LD), cabeceras de seguridad, sistema de movimiento completo, 50 pruebas en verde.

## Pendiente (en orden sugerido)

1. Desplegar en Vercel (pasos en `README.md`, sección "Despliegue en Vercel") y configurar
   `NEXT_PUBLIC_SITE_URL`. **No está desplegado todavía.**
2. (Opcional) Obtener el token de la página de Facebook (`docs/facebook.md`) para que la grilla
   de noticias de la portada muestre las publicaciones de Facebook; sin él muestra las del sitio.
3. Configurar Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) y probar un
   envío real del formulario.
4. Reemplazar las 3 noticias de ejemplo por noticias reales.
5. Completar con información del liceo: campo laboral, perfil de egreso, competencias y
   actividades prácticas de cada especialidad; visión, misión y sellos (transcribir del PEI);
   nombres y fotos autorizadas en comunidad educativa; horario de atención.
6. Confirmar el teléfono (las fuentes oficiales lo escriben distinto) y la cuenta de Instagram.
7. Confirmar con el liceo qué laboratorio corresponde a cada especialidad (la asignación actual
   es por afinidad).
8. Reemplazar fotos y video provisionales por material propio del liceo con autorizaciones.
9. Revisión legal de `/privacidad` por el asesor del sostenedor.
10. Auditoría Lighthouse y prueba con lector de pantalla en el primer despliegue de prueba.

## Skills que se usaron (instalarlas en el computador nuevo)

El diseño y el movimiento se hicieron con estas skills de Claude Code, instaladas a nivel de
usuario en `~/.claude/skills/`. No viajan con el repositorio: en el computador nuevo, pídele a
Claude Code que las instale desde estos repositorios (revisando su contenido antes):

- https://github.com/emilkowalski/skills (animate, emil-design-eng, review-animations,
  improve-animations, break-ui, mobile-native, etc.)
- https://github.com/LEONXLNX/TASTE-SKILL (design-taste-frontend; sus scripts necesitan Node 22+)
- https://github.com/pbakaus/impeccable (impeccable)

Las skills solo aparecen en una sesión nueva de Claude Code después de instalarlas.

## Cómo trabajar con el usuario

- Explica en español sencillo qué cambiaste y qué falta; muestra el resultado en el navegador
  cuando el cambio es visual (escritorio y móvil).
- Antes de cada commit: `npm run check` y `npm run build`.
- Haz commit y `git push` solo cuando el usuario lo pida. Al empezar en un computador, `git pull`.
