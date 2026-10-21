import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { categoriasNoticia } from "@/components/noticias/categorias";
import type { Noticia } from "@/lib/types";
import { imagenPropia } from "./imagenes";

/**
 * Noticias del liceo.
 *
 * Cada noticia es un archivo JSON en src/content/datos/noticias/ (el nombre del
 * archivo es su dirección: /noticias/<archivo>). Se crean, editan y borran
 * desde el panel de administración (/admin); ver docs/panel-admin.md.
 *
 * Las entradas con `ejemplo: true` solo muestran el diseño y aparecen con la
 * etiqueta "Texto de ejemplo". Elimínelas antes de publicar.
 *
 * Fotografías: no publique imágenes en que se identifique a estudiantes sin la
 * autorización escrita de su apoderado (ver README, "Imágenes y menores de edad").
 */

const CARPETA = join(process.cwd(), "src", "content", "datos", "noticias");

/** Texto opcional: el panel puede guardarlo vacío, como null o no guardarlo. */
const opcional = z.string().nullish().transform((v) => v?.trim() ?? "");

const noticiaSchema = z.object({
  titulo: z.string().trim().min(1),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato AAAA-MM-DD"),
  categoria: z.enum(categoriasNoticia),
  bajada: z.string().trim().min(1),
  /** Párrafos separados por una línea en blanco. Texto plano, sin HTML. */
  cuerpo: opcional,
  imagen: opcional,
  imagenAlt: opcional,
  ejemplo: z.boolean().nullish().transform((v) => v ?? false),
});

function leerNoticias(): Noticia[] {
  return readdirSync(CARPETA)
    .filter((archivo) => archivo.endsWith(".json"))
    .map((archivo) => {
      const slug = archivo.replace(/\.json$/, "");
      const resultado = noticiaSchema.safeParse(JSON.parse(readFileSync(join(CARPETA, archivo), "utf8")));
      if (!resultado.success) {
        throw new Error(`La noticia "${archivo}" tiene datos inválidos: ${resultado.error.message}`);
      }
      const n = resultado.data;
      return {
        slug,
        titulo: n.titulo,
        fecha: n.fecha,
        categoria: n.categoria,
        bajada: n.bajada,
        cuerpo: n.cuerpo
          .split(/\n\s*\n/)
          .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
          .filter(Boolean),
        // Las fotos se muestran ajustadas a su marco: el tamaño solo es referencial.
        imagen: n.imagen ? imagenPropia(n.imagen, n.imagenAlt || n.titulo, 1600, 1000) : undefined,
        ejemplo: n.ejemplo,
      };
    });
}

export const noticias: Noticia[] = leerNoticias();

export function noticiasOrdenadas(): Noticia[] {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getNoticia(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug);
}
