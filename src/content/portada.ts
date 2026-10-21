/**
 * Video de fondo de la portada.
 *
 * Hoy es un clip provisional de banco abierto (no muestra al liceo). Para usar
 * un video propio: copie un archivo .webm (y, si puede, una versión .mp4 para
 * Safari antiguo) de 10 a 20 segundos, sin audio y de menos de 5 MB en
 * public/video/, extraiga un cuadro como póster .jpg y actualice estos datos.
 * Si `video` es `null`, la portada se muestra con fondo liso.
 */
export type VideoFondo = {
  webm: string;
  mp4?: string;
  poster: string;
  ancho: number;
  alto: number;
  /** `true` mientras sea material de banco abierto y no del liceo. */
  provisional: boolean;
  credito?: {
    titulo: string;
    autor: string;
    licencia: string;
    licenciaUrl: string;
    fuenteUrl: string;
    descripcion: string;
  };
};

export const videoPortada: VideoFondo | null = {
  webm: "/video/metal-hero.webm",
  poster: "/video/metal-hero-poster.jpg",
  ancho: 1280,
  alto: 720,
  provisional: true,
  credito: {
    titulo: "Gof a Gweithiwr Metrel Ray Burrell Metal Fabricator and Blacksmith",
    autor: "Rupertmaesglas",
    licencia: "CC0",
    licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    fuenteUrl:
      "https://commons.wikimedia.org/wiki/File:Gof_a_Gweithiwr_Metrel_Ray_Burrell_Metal_Fabricator_and_Blacksmith.webm",
    descripcion: "Soldador con careta trabajando una estructura metálica, entre chispas.",
  },
};
