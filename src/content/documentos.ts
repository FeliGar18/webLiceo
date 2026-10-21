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
];

/** Documentos que el liceo debe publicar y que este sitio aún no enlaza. */
export const documentosPendientes: string[] = [
  "Reglamento de Evaluación, Calificación y Promoción",
  "Plan Integral de Seguridad Escolar",
  "Calendario escolar del año en curso",
  "Listas de útiles y requisitos de taller por especialidad",
];

export const categoriasDocumento = Array.from(new Set(documentos.map((d) => d.categoria)));
