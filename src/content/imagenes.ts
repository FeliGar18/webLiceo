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
  /** Foto entregada por el liceo (octubre de 2026). */
  ricardoFenner: () =>
    imagenPropia("/images/historia/ricardo-fenner.jpg", "Ricardo Fenner Ruedi, sonriente, junto a su esposa, Irma Paegelow Luppy, que le toma la mano.", 930, 930),
  campusAereo: () =>
    imagenPropia("/images/historia/campus-aereo.jpg", "Vista aérea del campus del liceo junto a la Ruta T-74: pabellones, talleres, gimnasio y estacionamientos rodeados de áreas verdes.", 2000, 1125),
  luisAlvarez: () =>
    imagenPropia("/images/historia/luis-alvarez.jpg", "Luis Adrián Álvarez Igor, sonriente, en un bosque.", 960, 720),
  ernestoUslar: () =>
    imagenPropia("/images/historia/ernesto-uslar.jpg", "Ernesto Uslar Goverts habla en un podio durante una ceremonia del liceo.", 680, 510),
};
