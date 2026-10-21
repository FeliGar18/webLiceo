import type { CategoriaNoticia } from "@/lib/types";

/** Categorías de noticias en el orden en que se ofrecen como filtro. */
export const categoriasNoticia = [
  "Institucional",
  "Especialidades",
  "Comunidad",
  "Admisión",
] as const satisfies readonly CategoriaNoticia[];
