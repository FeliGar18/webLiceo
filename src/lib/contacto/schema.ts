import { z } from "zod";

/**
 * Validación del formulario de contacto.
 *
 * Se ejecuta SIEMPRE en el servidor (server action): lo que llega en FormData
 * no es confiable aunque el formulario tenga `required` o `maxLength`.
 * Este módulo no tiene efectos secundarios ni accede a variables de entorno,
 * para poder probarlo con vitest.
 */

export const PERFILES = [
  "Postulante o apoderado/a",
  "Estudiante",
  "Exalumno/a",
  "Empresa o institución",
  "Otro",
] as const;

export type Perfil = (typeof PERFILES)[number];

export const LIMITES = {
  nombre: { min: 2, max: 100 },
  correo: { max: 254 },
  telefono: { max: 20 },
  asunto: { min: 3, max: 120 },
  mensaje: { min: 10, max: 3000 },
} as const;

/** Tiempo mínimo (ms) entre que se muestra el formulario y se envía. */
export const TIEMPO_MINIMO_MS = 3000;

/** Campos visibles del formulario, en el orden en que aparecen. */
export const CAMPOS = ["nombre", "correo", "telefono", "perfil", "asunto", "mensaje", "consentimiento"] as const;
export type Campo = (typeof CAMPOS)[number];

/** Une espacios repetidos (incluidos saltos de línea) en uno solo. */
const unaLinea = (v: string) => v.replace(/\s+/g, " ").trim();

/** Normaliza saltos de línea y elimina caracteres de control (salvo \n y \t). */
const textoLargo = (v: string) =>
  v
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();

const texto = (requerido: string) =>
  z.preprocess((v) => (typeof v === "string" ? v : ""), z.string({ error: requerido }));

/**
 * Teléfono chileno laxo: acepta "+56 9 1234 5678", "912345678", "(64) 257 0409",
 * "+56642570409", etc. Se ignoran espacios, guiones, puntos y paréntesis.
 */
export const REGEX_TELEFONO_CL = /^(?:\+?56)?\d{8,9}$/;

export const esquemaContacto = z.object({
  nombre: texto("Escriba su nombre.")
    .transform(unaLinea)
    .pipe(
      z
        .string()
        .min(1, { error: "Escriba su nombre." })
        .min(LIMITES.nombre.min, { error: `El nombre debe tener al menos ${LIMITES.nombre.min} caracteres.` })
        .max(LIMITES.nombre.max, { error: `El nombre puede tener hasta ${LIMITES.nombre.max} caracteres.` }),
    ),

  correo: texto("Escriba su correo electrónico.")
    .transform((v) => v.trim().toLowerCase())
    .pipe(
      z
        .string()
        .min(1, { error: "Escriba su correo electrónico." })
        .max(LIMITES.correo.max, { error: "El correo es demasiado largo." })
        .pipe(z.email({ error: "Escriba un correo válido, por ejemplo nombre@dominio.cl." })),
    ),

  telefono: texto("")
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .max(LIMITES.telefono.max, { error: "El teléfono es demasiado largo." })
        .refine((v) => v === "" || REGEX_TELEFONO_CL.test(v.replace(/[\s\-().]/g, "")), {
          error: "Escriba un teléfono chileno válido, por ejemplo +56 9 1234 5678.",
        }),
    )
    .transform((v) => (v === "" ? undefined : v)),

  perfil: z.enum(PERFILES, { error: "Elija una opción." }),

  asunto: texto("Escriba el asunto.")
    .transform(unaLinea)
    .pipe(
      z
        .string()
        .min(1, { error: "Escriba el asunto." })
        .min(LIMITES.asunto.min, { error: `El asunto debe tener al menos ${LIMITES.asunto.min} caracteres.` })
        .max(LIMITES.asunto.max, { error: `El asunto puede tener hasta ${LIMITES.asunto.max} caracteres.` }),
    ),

  mensaje: texto("Escriba su mensaje.")
    .transform(textoLargo)
    .pipe(
      z
        .string()
        .min(1, { error: "Escriba su mensaje." })
        .min(LIMITES.mensaje.min, { error: `El mensaje debe tener al menos ${LIMITES.mensaje.min} caracteres.` })
        .max(LIMITES.mensaje.max, { error: `El mensaje puede tener hasta ${LIMITES.mensaje.max} caracteres.` }),
    ),

  consentimiento: z.literal("si", {
    error: "Para enviar el mensaje debe aceptar la política de privacidad.",
  }),

  /** Trampa para bots: un campo oculto que una persona nunca completa. */
  sitio_web: z.preprocess((v) => (typeof v === "string" ? v : ""), z.string().max(0)),
});

export type DatosContacto = z.output<typeof esquemaContacto>;

export type ResultadoValidacion =
  | { ok: true; datos: DatosContacto }
  | { ok: false; trampa: true }
  | { ok: false; trampa: false; errores: Partial<Record<Campo, string>> };

/** Valida un objeto plano (p. ej. `Object.fromEntries(formData)`). */
export function validarContacto(entrada: Record<string, unknown>): ResultadoValidacion {
  const r = esquemaContacto.safeParse(entrada);
  if (r.success) return { ok: true, datos: r.data };

  const errores: Partial<Record<Campo, string>> = {};
  let trampa = false;
  for (const issue of r.error.issues) {
    const campo = issue.path[0];
    if (campo === "sitio_web") {
      trampa = true;
      continue;
    }
    if (typeof campo === "string" && (CAMPOS as readonly string[]).includes(campo)) {
      errores[campo as Campo] ??= issue.message;
    }
  }
  // Si la trampa se activó no se informa nada más: no se le explica al bot por qué falló.
  if (trampa) return { ok: false, trampa: true };
  return { ok: false, trampa: false, errores };
}

/**
 * `true` si el envío fue demasiado rápido para ser de una persona, o si falta
 * la medición. `transcurrido` lo calcula el navegador (ms desde que se mostró
 * el formulario), así no depende de que el reloj del equipo esté en hora.
 */
export function envioDemasiadoRapido(transcurrido: unknown): boolean {
  if (typeof transcurrido !== "string" || !/^\d{1,12}$/.test(transcurrido)) return true;
  return Number(transcurrido) < TIEMPO_MINIMO_MS;
}

/** Estado que la server action devuelve al formulario (solo lo que la interfaz muestra). */
export type EstadoContacto = {
  estado: "inicial" | "error" | "enviado";
  mensaje?: string;
  errores?: Partial<Record<Campo, string>>;
  /** Valores para volver a llenar el formulario tras un error (nunca el honeypot). */
  valores?: Partial<Record<Exclude<Campo, "consentimiento">, string>> & { consentimiento?: boolean };
  /** Cambia en cada respuesta, para mover el foco aunque el mensaje se repita. */
  envio?: number;
};
