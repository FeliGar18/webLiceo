import type { Documento } from "@/lib/types";
import { URL_PEI, URL_RIE } from "./institucion";

/**
 * Documentos oficiales públicos.
 *
 * Solo se listan documentos que existen en una URL pública oficial. Para agregar
 * uno nuevo, súbalo al almacenamiento del liceo (ver README, "Documentos") y
 * agregue su entrada aquí. No publique documentos internos ni con datos
 * personales de estudiantes.
 */
export const documentos: Documento[] = [
  {
    id: "pei-2025-2026",
    titulo: "Proyecto Educativo Institucional",
    categoria: "Proyecto Educativo",
    descripcion:
      "Identidad, sellos, reseña histórica, organización y planes de estudio de las especialidades.",
    url: URL_PEI,
    formato: "PDF",
    vigencia: "2025-2026",
    publicadoEn: "Sistema de Admisión Escolar (Mineduc)",
  },
  {
    id: "reglamento-interno-2026",
    titulo: "Reglamento Interno y de Convivencia Escolar",
    categoria: "Reglamentos",
    descripcion:
      "Normas de convivencia, derechos y deberes de la comunidad, uniforme, admisión y protocolos.",
    url: URL_RIE,
    formato: "PDF",
    vigencia: "2026",
    publicadoEn: "Sistema de Admisión Escolar (Mineduc)",
  },
  {
    id: "reglamento-evaluacion-2025",
    titulo: "Reglamento de Evaluación y Promoción",
    categoria: "Reglamentos",
    descripcion:
      "Cómo se evalúa y califica, asistencia mínima, requisitos para pasar de curso, licencia de enseñanza media y situaciones especiales.",
    // Documento de SNA Educa para sus liceos, entregado por el liceo (octubre de 2026).
    url: "/archivos/reglamento-evaluacion-promocion-2025.pdf",
    formato: "PDF",
    vigencia: "2025",
    publicadoEn: "SNA Educa",
  },
];

/** Documentos que el liceo debe publicar y que este sitio aún no enlaza. */
export const documentosPendientes: string[] = [
  "Plan Integral de Seguridad Escolar",
  "Calendario escolar del año en curso",
  "Listas de útiles y requisitos de taller por especialidad",
];

export const categoriasDocumento = Array.from(new Set(documentos.map((d) => d.categoria)));

/** Plantillas con el membrete del liceo (entregadas por el liceo, octubre de 2026). */
export const plantillas: { titulo: string; descripcion: string; url: string; formato: "Word (DOCX)" | "PowerPoint (PPTX)" }[] = [
  {
    titulo: "Informe tamaño carta",
    descripcion: "Hoja carta (21,6 × 27,9 cm) con el membrete del liceo y SNA Educa y numeración de páginas.",
    url: "/archivos/plantillas/plantilla-informe-carta.docx",
    formato: "Word (DOCX)",
  },
  {
    titulo: "Informe tamaño oficio",
    descripcion: "Hoja oficio (21,6 × 33 cm) con el membrete del liceo y SNA Educa y numeración de páginas.",
    url: "/archivos/plantillas/plantilla-informe-oficio.docx",
    formato: "Word (DOCX)",
  },
  {
    titulo: "Presentación institucional",
    descripcion: "Seis diapositivas en formato panorámico (16:9) con los logos del liceo y SNA Educa.",
    url: "/archivos/plantillas/plantilla-presentacion-institucional.pptx",
    formato: "PowerPoint (PPTX)",
  },
];
