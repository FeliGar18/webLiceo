import type { Proyecto } from "@/lib/types";
import { FUENTE_PEI } from "./institucion";

/**
 * Proyectos, actividades e hitos de innovación.
 *
 * Solo se incluyen hechos que constan en una fuente oficial. Agregue los
 * proyectos actuales del liceo siguiendo el mismo formato.
 */
export const proyectos: Proyecto[] = [
  {
    slug: "liceo-bicentenario",
    titulo: "Programa Liceos Bicentenario de Excelencia",
    tipo: "Hito",
    periodo: "2019",
    descripcion:
      "El liceo postuló y se adjudicó el programa Liceos Bicentenario de Excelencia del Ministerio de Educación, en la generación 2019.",
    fuente: FUENTE_PEI,
    ejemplo: false,
  },
  {
    slug: "worldskills",
    titulo: "Participación en WorldSkills",
    tipo: "Hito",
    periodo: "2012, 2014 y 2015",
    descripcion:
      "Estudiantes del liceo participaron en competencias WorldSkills, que miden el dominio de oficios técnicos frente a jóvenes de otros establecimientos.",
    fuente: FUENTE_PEI,
    ejemplo: false,
  },
  {
    slug: "jornada-escolar-completa",
    titulo: "Jornada Escolar Completa",
    tipo: "Hito",
    periodo: "2015",
    descripcion: "El liceo se incorporó a la Jornada Escolar Completa.",
    fuente: FUENTE_PEI,
    ejemplo: false,
  },
];
