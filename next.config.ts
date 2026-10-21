import type { NextConfig } from "next";

const esProduccion = process.env.NODE_ENV === "production";

/*
 * Content Security Policy (solo en producción; en desarrollo el HMR de Next
 * necesita eval y websockets).
 *
 * Por qué 'unsafe-inline' en script-src: con `cacheComponents` las páginas se
 * prerenderizan como HTML estático y Next.js inyecta scripts en línea (datos
 * de hidratación RSC, arranque del router, JSON-LD del layout). Un nonce exige
 * renderizar cada petición de forma dinámica (leer el nonce en `proxy.ts` y
 * `headers()`), lo que anula el prerender y el caché en el CDN. Para endurecer
 * la política más adelante: generar un nonce por petición en `proxy.ts`,
 * pasarlo en la cabecera CSP con 'strict-dynamic' y aceptar el render dinámico.
 *
 * El resto de la política cierra lo que más importa: sin orígenes externos de
 * scripts, sin <object>, sin <base> ajenos, formularios solo hacia el propio
 * sitio y sin ser incrustado en iframes (clickjacking).
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const cabecerasSeguridad = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(esProduccion ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

/*
 * CSP del panel de administración (/admin, Sveltia CMS). Reemplaza a la del
 * sitio solo en esas rutas: el panel habla con la API de GitHub, muestra fotos
 * del repositorio, consulta el estado de GitHub (githubstatus.com), carga sus
 * tipografías desde jsDelivr y algunos módulos opcionales desde unpkg.
 */
const cspPanel = [
  "default-src 'self'",
  "script-src 'self' https://unpkg.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://*.githubusercontent.com",
  "font-src 'self' https://cdn.jsdelivr.net",
  "connect-src 'self' blob: data: https://api.github.com https://*.githubusercontent.com https://www.githubstatus.com https://unpkg.com",
  "media-src 'self' blob:",
  "frame-src blob:",
  "manifest-src 'self' blob:",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const cabecerasPanel = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  ...(esProduccion ? [{ key: "Content-Security-Policy", value: cspPanel }] : []),
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Fotos de las publicaciones de Facebook (src/lib/facebook.ts). Pasan por
    // el optimizador del sitio: el navegador del visitante no contacta a Facebook.
    remotePatterns: [{ protocol: "https", hostname: "**.fbcdn.net" }],
  },
  // Las noticias se leen con fs desde src/content/datos/noticias (las edita el
  // panel): se incluyen en el servidor para las páginas que se generan al vuelo.
  outputFileTracingIncludes: {
    "/**": ["./src/content/datos/noticias/*.json"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: cabecerasSeguridad },
      // Va después: para /admin, su CSP reemplaza a la del sitio.
      { source: "/admin", headers: cabecerasPanel },
      { source: "/admin/:path*", headers: cabecerasPanel },
    ];
  },
  async rewrites() {
    return [
      // Algunos navegadores piden /favicon.ico aunque exista <link rel="icon">.
      { source: "/favicon.ico", destination: "/icon" },
      // Panel de administración (archivo estático en public/admin/).
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
