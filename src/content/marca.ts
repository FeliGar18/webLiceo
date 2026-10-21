/**
 * Logotipos oficiales. Se usan siempre desde su archivo original, sin
 * recolorear ni deformar (se respeta su proporción con `ancho`/`alto`).
 *
 * Si un archivo se retira de /public/brand, deje el valor en `null`: el sitio
 * muestra entonces el nombre en texto, sin imitar el logotipo.
 */
export type Logo = { src: string; ancho: number; alto: number; alt: string };

export const logoLiceo: Logo | null = {
  src: "/brand/logo-liceo.png",
  ancho: 420,
  alto: 593,
  alt: "Insignia del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi",
};

export const logoSostenedor: Logo | null = {
  src: "/brand/logo-snaeduca.png",
  ancho: 413,
  alto: 605,
  alt: "Logotipo de SNA Educa, sostenedor del liceo",
};
