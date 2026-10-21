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

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: cabecerasSeguridad }];
  },
  // Algunos navegadores piden /favicon.ico aunque exista <link rel="icon">.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
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
