/**
 * Cifras de la portada (debajo del video).
 *
 * Solo datos entregados por el liceo. Mientras `cifra` sea null, la portada
 * muestra el espacio con la etiqueta "Por confirmar" en vez de inventar un número.
 * `texto` es opcional: una frase corta que acompaña la cifra.
 */
export type Cifra = {
  cifra: string | null;
  titulo: string;
  texto?: string;
};

export const cifras: Cifra[] = [
  // Cifras entregadas por el liceo.
  { cifra: "30", titulo: "años", texto: "Entregando educación técnico-profesional de excelencia" },
  { cifra: "29", titulo: "generaciones", texto: "Egresadas desde 1996" },
  { cifra: "850+", titulo: "alumnos" },
  { cifra: "50+", titulo: "profesionales", texto: "Al servicio de la comunidad educativa" },
];
