import { z } from "zod";
import datosAdmision from "./datos/admision.json";
import datosInternado from "./datos/internado.json";
import datosPreguntas from "./datos/preguntas.json";
import datosRazones from "./datos/razones.json";

/**
 * Secciones informativas de la portada: calendario de admisión, razones para
 * estudiar en el liceo, internado y preguntas frecuentes.
 *
 * Se editan desde el panel (/admin → Portada). Regla del proyecto: no inventar
 * datos. Un texto vacío se muestra como "por confirmar" en vez de rellenarlo.
 */

/** Texto opcional: el panel puede guardarlo vacío, como null o no guardarlo. */
const opcional = z.string().nullish().transform((v) => v?.trim() ?? "");
const requerido = z.string().trim().min(1);

export const admision = z
  .object({
    titulo: requerido,
    bajada: opcional,
    etapas: z.array(z.object({ etapa: requerido, fechas: opcional, detalle: opcional })),
    nota: opcional,
  })
  .parse(datosAdmision);

export const iconosRazon = ["especialidades", "titulo", "bicentenario", "internado", "trayectoria", "empresas"] as const;
export type IconoRazon = (typeof iconosRazon)[number];

export const razones = z
  .object({
    titulo: requerido,
    razones: z.array(
      z.object({
        icono: z.enum(iconosRazon).nullish().transform((v) => v ?? "especialidades"),
        titulo: requerido,
        texto: opcional,
      }),
    ),
  })
  .parse(datosRazones);

export const internado = z
  .object({
    titulo: requerido,
    texto: opcional,
    puntos: z.array(z.object({ titulo: requerido, texto: opcional })),
    contacto: opcional,
  })
  .parse(datosInternado);

export const preguntas = z
  .object({
    titulo: requerido,
    preguntas: z.array(z.object({ pregunta: requerido, respuesta: opcional })),
  })
  .parse(datosPreguntas);
