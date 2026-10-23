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

/** Logotipo del Centro de Innovación del liceo (blanco sobre transparente: solo para fondos oscuros). */
export const logoCentroInnovacion: Logo | null = {
  src: "/brand/logo-centro-innovacion.png",
  ancho: 1000,
  alto: 439,
  alt: "Logotipo del Centro de Innovación del liceo",
};

/** Logotipo del programa Liceos Bicentenario del Mineduc (negro sobre transparente: solo para fondos claros). */
export const logoBicentenario: Logo | null = {
  src: "/brand/logo-liceos-bicentenario.svg",
  ancho: 1366,
  alto: 364,
  alt: "Programa Liceos Bicentenario",
};

/** Versión blanca del logotipo Liceos Bicentenario (solo para fondos oscuros). Se quitó el fondo blanco y el margen vacío del archivo original. */
export const logoBicentenarioBlanco: Logo | null = {
  src: "/brand/logo-liceos-bicentenario-blanco.svg",
  ancho: 750,
  alto: 184,
  alt: "Programa Liceos Bicentenario",
};

/** Logotipos que se ofrecen para descargar en /documentos (archivos originales, sin modificar). */
export const logosDescargables: { nombre: string; detalle: string; logo: Logo; formato: "PNG" | "SVG"; fondoOscuro?: boolean }[] = [
  ...(logoLiceo ? [{ nombre: "Insignia del liceo", detalle: "Versión a color.", logo: logoLiceo, formato: "PNG" as const }] : []),
  ...(logoSostenedor ? [{ nombre: "SNA Educa", detalle: "Sostenedor del liceo. Versión a color.", logo: logoSostenedor, formato: "PNG" as const }] : []),
  ...(logoBicentenario
    ? [{ nombre: "Liceos Bicentenario", detalle: "Programa del Mineduc. Versión negra, para fondos claros.", logo: logoBicentenario, formato: "SVG" as const }]
    : []),
  ...(logoBicentenarioBlanco
    ? [{ nombre: "Liceos Bicentenario", detalle: "Versión blanca, para fondos oscuros.", logo: logoBicentenarioBlanco, formato: "SVG" as const, fondoOscuro: true }]
    : []),
  ...(logoCentroInnovacion
    ? [{ nombre: "Centro de Innovación", detalle: "Versión blanca, para fondos oscuros.", logo: logoCentroInnovacion, formato: "PNG" as const, fondoOscuro: true }]
    : []),
];

/** Fondo de pantalla con los logos de SNA Educa, el liceo y el Centro de Innovación (entregado por el liceo). */
export const fondoPantalla = {
  src: "/brand/fondo-pantalla-liceo.jpg",
  ancho: 1673,
  alto: 940,
  alt: "Fondo de pantalla azul con los logos de SNA Educa, del liceo y del Centro de Innovación, con franjas de colores en las esquinas.",
};
