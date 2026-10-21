import type { Imagen } from "@/lib/types";
import { especialidades } from "./especialidades";
import { FUENTE_PEI, institucion } from "./institucion";

/**
 * Comunidad educativa: cargos y estamentos según la dotación declarada en el
 * PEI 2025-2026 ("Dotación del personal").
 *
 * No se publican nombres, fotografías ni correos personales sin autorización
 * de cada persona. Para completar una tarjeta, agregue `nombre`, `foto`
 * (con imagenPropia en ./imagenes) y, si corresponde, un `correo`
 * institucional. Mientras falten, la tarjeta lo indica.
 */

export type Integrante = {
  cargo: string;
  area: string;
  nombre?: string;
  foto?: Imagen;
  /** Solo correos institucionales verificados (nunca personales). */
  correo?: string;
  /** Número de personas en ese cargo, cuando es más de una (PEI). */
  cantidad?: number;
};

export type IconoGrupo = "directivo" | "docentes" | "pie" | "convivencia" | "asistentes";

export type GrupoComunidad = {
  id: string;
  titulo: string;
  icono: IconoGrupo;
  descripcion: string;
  /** Resumen de dotación, p. ej. "54 docentes". */
  dotacion: string;
  integrantes: Integrante[];
};

const correo = (etiqueta: string) => institucion.correos.find((c) => c.etiqueta === etiqueta)?.valor;

export const grupos: GrupoComunidad[] = [
  {
    id: "equipo-directivo",
    titulo: "Equipo directivo",
    icono: "directivo",
    descripcion: "Conduce el proyecto educativo y la gestión del liceo.",
    dotacion: "4 cargos",
    integrantes: [
      { cargo: "Director(a)", area: "Dirección", correo: correo("Dirección") },
      { cargo: "Jefe(a) de UTP", area: "Unidad Técnico-Pedagógica" },
      { cargo: "Coordinador(a) de Especialidades Técnicas", area: "Formación técnico-profesional" },
      { cargo: "Encargado(a) de Convivencia Escolar", area: "Convivencia escolar" },
    ],
  },
  {
    id: "docentes",
    titulo: "Docentes",
    icono: "docentes",
    descripcion: "Enseñan la formación general y la formación diferenciada de cada especialidad, en aulas, talleres y laboratorios.",
    dotacion: "54 docentes",
    integrantes: [
      { cargo: "Docentes de Formación General", area: "Asignaturas de 1° a 4° medio" },
      ...especialidades.map((e) => ({
        cargo: `Docentes de ${e.nombreCorto}`,
        area: `Formación diferenciada · Sector ${e.sector}`,
      })),
    ],
  },
  {
    id: "integracion",
    titulo: "Programa de Integración Escolar",
    icono: "pie",
    descripcion: "Acompaña a estudiantes con necesidades educativas especiales junto a docentes y familias.",
    dotacion: "16 profesionales",
    integrantes: [
      { cargo: "Educadora coordinadora PIE", area: "Programa de Integración Escolar" },
      { cargo: "Educadoras diferenciales", area: "Programa de Integración Escolar", cantidad: 12 },
      { cargo: "Psicólogo(a) PIE", area: "Programa de Integración Escolar" },
      { cargo: "Terapeuta ocupacional", area: "Programa de Integración Escolar" },
    ],
  },
  {
    id: "convivencia",
    titulo: "Convivencia y apoyo",
    icono: "convivencia",
    descripcion: "Apoya el bienestar de estudiantes y familias, la convivencia y la seguridad en talleres.",
    dotacion: "5 profesionales",
    integrantes: [
      { cargo: "Psicólogas de Convivencia Escolar", area: "Convivencia escolar", cantidad: 2 },
      { cargo: "Trabajadora social", area: "Apoyo psicosocial" },
      { cargo: "Técnico en trabajo social", area: "Apoyo psicosocial" },
      { cargo: "Prevencionista de riesgos", area: "Seguridad y prevención" },
    ],
  },
  {
    id: "asistentes",
    titulo: "Asistentes de la educación",
    icono: "asistentes",
    descripcion: "Sostienen el funcionamiento diario del liceo, el internado, los talleres y la atención a la comunidad.",
    dotacion: "69 asistentes",
    integrantes: [
      { cargo: "Secretaría", area: "Administración", correo: correo("Secretaría") },
      { cargo: "Administrativos", area: "Administración" },
      { cargo: "Paradocentes", area: "Unidad educativa e internado" },
      { cargo: "Ayudantes de taller", area: "Talleres de especialidad" },
      { cargo: "Manipuladores de alimentos", area: "Alimentación" },
      { cargo: "Auxiliares de servicio", area: "Mantención y aseo" },
      { cargo: "Conductor", area: "Transporte" },
    ],
  },
];

export const fuenteDotacion = FUENTE_PEI;

/** Organizaciones de la comunidad (sin integrantes publicados todavía). */
export const organizaciones = [
  { titulo: "Centro de Estudiantes", texto: "Organiza y representa a las y los estudiantes del liceo." },
  { titulo: "Centro de Padres y Apoderados", texto: "Organiza y representa a las familias ante el establecimiento." },
  {
    titulo: "Consejo Asesor Empresarial",
    texto: "Trece empresarios que apoyan la gestión, orientación y supervisión del proyecto educativo (PEI).",
  },
];
