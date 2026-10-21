import type { Imagen } from "@/lib/types";
import { creditosImagenes } from "./creditos-imagenes";

/**
 * Imágenes provisionales de bancos abiertos (no son fotografías del liceo).
 *
 * Para reemplazar una por una fotografía propia: copie el archivo en
 * `public/images/...`, y use `imagenPropia()` en el archivo de contenido que
 * corresponda con su ancho y alto reales.
 */
export function imagenProvisional(src: string): Imagen {
  const credito = creditosImagenes.find((c) => c.archivo === src);
  if (!credito) {
    throw new Error(`Falta el crédito de la imagen provisional ${src} en creditos-imagenes.ts`);
  }
  return {
    src,
    alt: credito.descripcion,
    ancho: credito.ancho,
    alto: credito.alto,
    provisional: true,
  };
}

export function imagenPropia(src: string, alt: string, ancho: number, alto: number): Imagen {
  return { src, alt, ancho, alto, provisional: false };
}

export const imagenes = {
  laUnion: () => imagenProvisional("/images/entorno/la-union.jpg"),
  taller: () => imagenProvisional("/images/entorno/taller.jpg"),
  aulaTecnica: () => imagenProvisional("/images/entorno/aula-tecnica.jpg"),
};
