import type { DatoFuente, Enlace } from "@/lib/types";

/**
 * Datos institucionales centralizados.
 *
 * Fuentes:
 * - PEI: Proyecto Educativo Institucional 2025-2026, publicado en el Sistema de
 *   Admisión Escolar (Mineduc).
 * - RIE: Reglamento Interno 2026, publicado en el Sistema de Admisión Escolar.
 *
 * Antes de publicar, el liceo debe confirmar todo dato marcado "por-confirmar".
 */

export const FUENTE_PEI =
  "Proyecto Educativo Institucional 2025-2026 (Sistema de Admisión Escolar, Mineduc)";
export const FUENTE_RIE = "Reglamento Interno 2026 (Sistema de Admisión Escolar, Mineduc)";

export const URL_PEI = "https://cdnsae.mineduc.cl/documentos/22140/ProyectoEducativo22140.pdf";
export const URL_RIE = "https://cdnsae.mineduc.cl/documentos/22140/ReglamentodeConvivencia22140.pdf";
export const URL_SAE = "https://www.sistemadeadmisionescolar.cl";

/** 40°18'47.0"S 73°00'01.3"W, entregadas por el liceo. */
const COORDENADAS = { latitud: -40.313056, longitud: -73.000361 } as const;

export const institucion = {
  nombreOficial: "Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi",
  nombreCorto: "Liceo Industrial Fenner",
  tipo: "Establecimiento de educación media técnico-profesional",
  comuna: "La Unión",
  region: "Región de Los Ríos",
  pais: "Chile",

  rbd: { valor: "22140-6", estado: "verificado", fuente: FUENTE_PEI } satisfies DatoFuente,
  dependencia: {
    valor: "Particular subvencionado, en administración delegada (DL 3166/1980)",
    estado: "verificado",
    fuente: FUENTE_PEI,
  } satisfies DatoFuente,
  niveles: { valor: "1° a 4° año medio", estado: "verificado", fuente: FUENTE_RIE } satisfies DatoFuente,
  regimen: {
    valor: "Régimen interno (internado) y externo",
    estado: "verificado",
    fuente: FUENTE_RIE,
  } satisfies DatoFuente,
  liceoBicentenario: {
    valor: "Seleccionado en la generación 2019 del programa Liceos Bicentenario",
    estado: "verificado",
    fuente: "Listado de Liceos Bicentenario vigentes (Mineduc, enero 2025)",
  } satisfies DatoFuente,

  sostenedor: {
    nombre: "Corporación Educacional de la Sociedad Nacional de Agricultura F.G. (SNA Educa)",
    nombreCorto: "SNA Educa",
    sitio: "https://www.snaeduca.cl",
    correo: "snaeduca@snaeduca.cl",
    telefono: "+56 2 2585 3343",
    fuente: FUENTE_PEI,
  },

  direccion: {
    valor: "Sector San Javier km 7, Ruta T-74, camino a Puerto Nuevo, La Unión",
    estado: "verificado",
    fuente: FUENTE_PEI,
  } satisfies DatoFuente,
  /** Ubicación exacta del liceo (entregada por el liceo). */
  coordenadas: COORDENADAS,
  /**
   * Ficha del liceo en Google Maps (pin con su nombre), centrada en las
   * coordenadas. No comparte datos del visitante hasta que hace clic.
   */
  mapaUrl: `https://www.google.com/maps/place/Liceo+Bicentenario+Industrial+Ingeniero+Ricardo+Fenner+Ruedi/@${COORDENADAS.latitud},${COORDENADAS.longitud},17z/data=!4m6!3m5!1s0x96166a223fc5b313:0xadca52d070d89c84!8m2!3d-40.3129249!4d-73.0004272!16s%2Fg%2F11b6gbrtlg`,

  telefonos: [
    {
      valor: "+56 64 257 0409",
      estado: "por-confirmar",
      fuente: "PEI y RIE (las fuentes lo escriben de formas distintas)",
    },
  ] satisfies DatoFuente[],

  correos: [
    {
      etiqueta: "Secretaría",
      valor: "i.launion.secretaria@snaeduca.cl",
      estado: "verificado",
      fuente: "Página del liceo en snaeduca.cl",
    },
    {
      etiqueta: "Dirección",
      valor: "i.launion.direccion@snaeduca.cl",
      estado: "verificado",
      fuente: FUENTE_PEI,
    },
  ] satisfies (DatoFuente & { etiqueta: string })[],

  redes: [
    { etiqueta: "Facebook", href: "https://www.facebook.com/indufenner", externo: true },
    { etiqueta: "Instagram", href: "https://www.instagram.com/indufenner/", externo: true },
  ] satisfies Enlace[],

  /** Horario de atención: no publicado en las fuentes revisadas. */
  horarioAtencion: null as string | null,
} as const;

/** Hitos tomados textualmente de la reseña histórica del PEI 2025-2026. */
export const hitos: { anio: string; texto: string }[] = [
  {
    anio: "1994",
    texto:
      "Se realiza el estudio de diagnóstico y, el 19 de diciembre, se constituye en Santiago la Fundación Ricardo Fenner Ruedi.",
  },
  { anio: "1995", texto: "El 30 de agosto se presenta al Ministerio de Educación el proyecto de creación del liceo." },
  {
    anio: "1996",
    texto:
      "Comienzan las clases en dependencias del Liceo Agrícola San Javier, con dos cursos y 90 estudiantes. El 11 de abril la Seremi de Educación autoriza oficialmente su funcionamiento.",
  },
  { anio: "1997", texto: "En julio, el liceo se traslada a su campus propio." },
  { anio: "2001", texto: "Es reconocido como Liceo de Especial Singularidad." },
  { anio: "2015", texto: "Se incorpora a la Jornada Escolar Completa." },
  {
    anio: "2019",
    texto: "Se adjudica el programa Liceos Bicentenario de Excelencia del Ministerio de Educación.",
  },
];

/** Reseña del ingeniero que da nombre al liceo (PEI y página de historia en snaeduca.cl). */
export const resenaNombre =
  "Ricardo Fenner Ruedi fue ingeniero de la empresa Minas San Pedro de Catamutún, en La Unión, y en vida expresó la idea de crear un liceo industrial en la comuna. Su viuda constituyó la Fundación Ricardo Fenner Ruedi, que hizo un aporte decisivo para construir el establecimiento.";

export function siteUrl(): string {
  // En Vercel, VERCEL_PROJECT_PRODUCTION_URL apunta al dominio de producción
  // incluso en previews, así las URL canónicas nunca quedan en *.vercel.app.
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return url.replace(/\/$/, "");
}
