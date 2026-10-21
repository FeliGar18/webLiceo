import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/institucion";

/**
 * En Vercel, `VERCEL_ENV` vale "production", "preview" o "development".
 * Las vistas previas no se indexan, para no competir con el sitio oficial
 * ni exponer cambios aún no aprobados. Fuera de Vercel (sin `VERCEL_ENV`) se
 * permite todo.
 */
export default function robots(): MetadataRoute.Robots {
  const entorno = process.env.VERCEL_ENV;
  if (entorno && entorno !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  };
}
