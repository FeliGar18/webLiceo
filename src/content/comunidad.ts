import { z } from "zod";
import type { Imagen } from "@/lib/types";
import datos from "./datos/comunidad.json";
import { imagenPropia } from "./imagenes";
import { FUENTE_PEI } from "./institucion";

/**
 * Comunidad educativa: grupos y sus integrantes.
 *
 * Se edita desde el panel de administración (/admin), que guarda
 * src/content/datos/comunidad.json. Las fotos van en public/images/comunidad/
 * (idealmente recortadas a 4:5; la tarjeta las ajusta a su marco).
 *
 * No se publican nombres, fotografías ni correos personales sin autorización
 * de cada persona. Mientras falten, la tarjeta lo indica.
 */

export type Integrante = {
  cargo: string;
  /** Se omite cuando el cargo basta (p. ej. asistentes de la educación). */
  area?: string;
  nombre?: string;
  foto?: Imagen;
  /** Solo correos institucionales verificados (nunca personales). */
  correo?: string;
  /** Número de personas en ese cargo, cuando es más de una. */
  cantidad?: number;
};

export const iconosGrupo = ["directivo", "administracion", "docentes", "pie", "asistentes"] as const;
export type IconoGrupo = (typeof iconosGrupo)[number];

export type GrupoComunidad = {
  /** Ancla de la sección (#id), derivada del título. */
  id: string;
  titulo: string;
  icono: IconoGrupo;
  descripcion: string;
  /** Resumen de dotación, p. ej. "54 docentes". */
  dotacion: string;
  /** Muestra al primer integrante solo, en una fila sobre el resto (p. ej. la dirección). */
  destacarPrimero?: boolean;
  integrantes: Integrante[];
};

/** Texto opcional: el panel puede guardarlo vacío, como null o no guardarlo. */
const texto = z.string().nullish().transform((v) => v?.trim() ?? "");

const comunidadSchema = z.object({
  grupos: z.array(
    z.object({
      titulo: z.string().trim().min(1),
      icono: z.enum(iconosGrupo).nullish().transform((v) => v ?? "asistentes"),
      descripcion: texto,
      dotacion: texto,
      destacarPrimero: z.boolean().nullish().transform((v) => v ?? false),
      integrantes: z.array(
        z.object({
          nombre: texto,
          cargo: z.string().trim().min(1),
          area: texto,
          foto: texto,
          correo: texto,
          cantidad: z.number().int().positive().nullish(),
        }),
      ),
    }),
  ),
});

/** "Área Administrativa y Finanzas" -> "area-administrativa-y-finanzas". */
function anclaDesde(titulo: string): string {
  return titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const grupos: GrupoComunidad[] = comunidadSchema.parse(datos).grupos.map((g) => ({
  id: anclaDesde(g.titulo),
  titulo: g.titulo,
  icono: g.icono,
  descripcion: g.descripcion,
  dotacion: g.dotacion,
  destacarPrimero: g.destacarPrimero,
  integrantes: g.integrantes.map((p) => ({
    cargo: p.cargo,
    area: p.area || undefined,
    nombre: p.nombre || undefined,
    // Tamaño referencial: la tarjeta muestra la foto ajustada a 4:5.
    foto: p.foto ? imagenPropia(p.foto, p.nombre ? `${p.nombre}, ${p.cargo}` : p.cargo, 640, 800) : undefined,
    correo: p.correo || undefined,
    cantidad: p.cantidad ?? undefined,
  })),
}));

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
