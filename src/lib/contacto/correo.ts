/**
 * Envío del formulario de contacto por correo, con la API HTTP de Resend.
 *
 * SOLO SERVIDOR. Este módulo lee secretos (RESEND_API_KEY) y debe importarse
 * únicamente desde `src/app/contacto/actions.ts` (server action). El paquete
 * `server-only` no está instalado en el proyecto; si se instala, agregue
 * `import "server-only";` al inicio para que el build falle si un componente
 * de cliente llega a importarlo.
 *
 * Variables de entorno (ver .env.example):
 * - RESEND_API_KEY      secreto, nunca con prefijo NEXT_PUBLIC_.
 * - CONTACT_FROM_EMAIL  remitente de un dominio verificado en Resend.
 * - CONTACT_TO_EMAIL    buzón del liceo que recibe los mensajes.
 */
import type { DatosContacto } from "./schema";

const RESEND_URL = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

export type ResultadoEnvio = { ok: true } | { ok: false; motivo: "sin-configurar" | "fallo-envio" };

type Config = { apiKey: string; from: string; to: string };

function leerConfig(): Config | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

/**
 * Cuerpo en texto plano (no HTML): lo escrito por el visitante nunca se
 * interpreta como marcado en el cliente de correo del liceo.
 */
export function componerCuerpo(d: DatosContacto): string {
  return [
    "Mensaje recibido desde el formulario de contacto del sitio web.",
    "",
    `Nombre: ${d.nombre}`,
    `Correo: ${d.correo}`,
    `Teléfono: ${d.telefono ?? "(no indicado)"}`,
    `Perfil: ${d.perfil}`,
    `Asunto: ${d.asunto}`,
    "",
    "Mensaje:",
    d.mensaje,
    "",
    "--",
    "Para responder, use \"Responder\": el mensaje irá al correo del remitente.",
    "La persona aceptó la política de privacidad del sitio al enviar este formulario.",
  ].join("\n");
}

export async function enviarCorreoContacto(datos: DatosContacto): Promise<ResultadoEnvio> {
  const config = leerConfig();
  if (!config) {
    // Sin datos personales en el registro.
    console.error("[contacto] Formulario deshabilitado: faltan RESEND_API_KEY, CONTACT_FROM_EMAIL o CONTACT_TO_EMAIL.");
    return { ok: false, motivo: "sin-configurar" };
  }

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const respuesta = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: datos.correo,
        // El asunto ya viene en una sola línea (sin saltos) desde el esquema.
        subject: `[Sitio web] ${datos.asunto}`,
        text: componerCuerpo(datos),
      }),
      signal: controlador.signal,
      cache: "no-store",
    });

    if (!respuesta.ok) {
      // Solo el código HTTP: el cuerpo de la respuesta podría repetir datos del visitante.
      console.error(`[contacto] Resend respondió ${respuesta.status}.`);
      return { ok: false, motivo: "fallo-envio" };
    }
    return { ok: true };
  } catch (error) {
    const tipo = error instanceof Error && error.name === "AbortError" ? "tiempo agotado" : "error de red";
    console.error(`[contacto] No se pudo contactar a Resend (${tipo}).`);
    return { ok: false, motivo: "fallo-envio" };
  } finally {
    clearTimeout(temporizador);
  }
}
