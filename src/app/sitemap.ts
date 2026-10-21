import type { MetadataRoute } from "next";
import { especialidades } from "@/content/especialidades";
import { siteUrl } from "@/content/institucion";
import { noticias } from "@/content/noticias";

/** Rutas estáticas públicas del sitio. */
const RUTAS: { ruta: string; prioridad: number; frecuencia: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { ruta: "/", prioridad: 1, frecuencia: "weekly" },
  { ruta: "/quienes-somos", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/quienes-somos/historia", prioridad: 0.6, frecuencia: "yearly" },
  { ruta: "/quienes-somos/proyecto-educativo", prioridad: 0.7, frecuencia: "yearly" },
  { ruta: "/quienes-somos/comunidad", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/especialidades", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/admision", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/noticias", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/proyectos", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/documentos", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/contacto", prioridad: 0.8, frecuencia: "yearly" },
  { ruta: "/privacidad", prioridad: 0.2, frecuencia: "yearly" },
  { ruta: "/creditos", prioridad: 0.1, frecuencia: "yearly" },
];

/*
 * Sin `lastModified` en las rutas estáticas: no hay una fecha real de
 * modificación y `new Date()` haría creer a los buscadores que todo cambia en
 * cada despliegue. Las noticias usan su propia fecha de publicación.
 * Las noticias de ejemplo (`ejemplo: true`) no se publican en el sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    ...RUTAS.map((r) => ({ url: `${base}${r.ruta === "/" ? "" : r.ruta}`, changeFrequency: r.frecuencia, priority: r.prioridad })),
    ...especialidades.map((e) => ({
      url: `${base}/especialidades/${e.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...noticias
      .filter((n) => !n.ejemplo)
      .map((n) => ({
        url: `${base}/noticias/${n.slug}`,
        lastModified: n.fecha,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
  ];
}
