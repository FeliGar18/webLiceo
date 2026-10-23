import type { ItemNavegacion } from "@/lib/types";
import { especialidades } from "./especialidades";

export const navegacionPrincipal: ItemNavegacion[] = [
  {
    etiqueta: "El liceo",
    href: "/quienes-somos",
    hijos: [
      { etiqueta: "Quiénes somos", href: "/quienes-somos", descripcion: "Identidad, niveles y sostenedor" },
      { etiqueta: "Historia", href: "/quienes-somos/historia", descripcion: "Desde la fundación de 1994" },
      {
        etiqueta: "Proyecto educativo",
        href: "/quienes-somos/proyecto-educativo",
        descripcion: "Visión, misión y valores",
      },
      {
        etiqueta: "Comunidad educativa",
        href: "/quienes-somos/comunidad",
        descripcion: "Equipo directivo y estamentos",
      },
    ],
  },
  {
    etiqueta: "Especialidades",
    href: "/especialidades",
    hijos: especialidades.map((e) => ({
      etiqueta: e.nombreCorto,
      href: `/especialidades/${e.slug}`,
      descripcion: `Sector ${e.sector}`,
    })),
  },
  { etiqueta: "Admisión", href: "/admision" },
  { etiqueta: "Noticias", href: "/noticias" },
  { etiqueta: "Proyectos", href: "/proyectos" },
  { etiqueta: "Documentos", href: "/documentos" },
];

export const accionPrincipal = { etiqueta: "Contacto", href: "/contacto" };

export const navegacionPie: { titulo: string; enlaces: ItemNavegacion[] }[] = [
  {
    titulo: "El liceo",
    enlaces: [
      { etiqueta: "Quiénes somos", href: "/quienes-somos" },
      { etiqueta: "Historia", href: "/quienes-somos/historia" },
      { etiqueta: "Proyecto educativo", href: "/quienes-somos/proyecto-educativo" },
      { etiqueta: "Comunidad educativa", href: "/quienes-somos/comunidad" },
    ],
  },
  {
    titulo: "Especialidades",
    enlaces: especialidades.map((e) => ({ etiqueta: e.nombreCorto, href: `/especialidades/${e.slug}` })),
  },
  {
    titulo: "Información",
    enlaces: [
      { etiqueta: "Admisión", href: "/admision" },
      { etiqueta: "Noticias", href: "/noticias" },
      { etiqueta: "Proyectos y actividades", href: "/proyectos" },
      { etiqueta: "Documentos y reglamentos", href: "/documentos" },
    ],
  },
  {
    titulo: "Sitio",
    enlaces: [
      { etiqueta: "Contacto y ubicación", href: "/contacto" },
      { etiqueta: "Política de privacidad", href: "/privacidad" },
    ],
  },
];
