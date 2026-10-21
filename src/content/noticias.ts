import type { Noticia } from "@/lib/types";

/**
 * Noticias del liceo.
 *
 * Las entradas marcadas `ejemplo: true` solo muestran el diseño y aparecen con
 * la etiqueta "Texto de ejemplo". Reemplácelas por noticias reales y elimine
 * las de ejemplo antes de publicar.
 *
 * Fotografías: no publique imágenes en que se identifique a estudiantes sin la
 * autorización escrita de su apoderado (ver README, "Imágenes y menores de edad").
 */
export const noticias: Noticia[] = [
  {
    slug: "ejemplo-inicio-ano-escolar",
    titulo: "Así se verá una noticia del liceo",
    fecha: "2026-03-02",
    categoria: "Institucional",
    bajada:
      "Texto de ejemplo para mostrar el diseño de una noticia: título, fecha, categoría, bajada y cuerpo.",
    cuerpo: [
      "Este es un texto de ejemplo. Cada noticia tiene un título de no más de dos líneas, una bajada que resume lo esencial y un cuerpo en párrafos breves.",
      "Para publicar una noticia real, edite el archivo src/content/noticias.ts siguiendo el formato de esta entrada y cambie el campo ejemplo a false.",
    ],
    ejemplo: true,
  },
  {
    slug: "ejemplo-actividad-especialidades",
    titulo: "Ejemplo de noticia de especialidades",
    fecha: "2026-02-16",
    categoria: "Especialidades",
    bajada: "Texto de ejemplo para una actividad de taller o una visita a una empresa colaboradora.",
    cuerpo: [
      "Este es un texto de ejemplo. Las noticias de especialidades pueden contar una práctica en terreno, una visita técnica o un trabajo destacado de taller.",
      "Recuerde no identificar a estudiantes por nombre ni por fotografía sin autorización de sus apoderados.",
    ],
    ejemplo: true,
  },
  {
    slug: "ejemplo-proceso-admision",
    titulo: "Ejemplo de aviso de admisión",
    fecha: "2026-01-12",
    categoria: "Admisión",
    bajada: "Texto de ejemplo para un aviso sobre plazos del Sistema de Admisión Escolar.",
    cuerpo: [
      "Este es un texto de ejemplo. Las fechas del proceso las fija el Ministerio de Educación y se publican en sistemadeadmisionescolar.cl.",
    ],
    ejemplo: true,
  },
];

export function noticiasOrdenadas(): Noticia[] {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getNoticia(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug);
}
