/**
 * Publicaciones de la página de Facebook del liceo, con la Graph API de Meta.
 *
 * SOLO SERVIDOR. Lee un secreto (FACEBOOK_PAGE_TOKEN) y se usa únicamente
 * desde componentes de servidor. El navegador del visitante nunca habla con
 * Facebook: el servidor trae las publicaciones y las fotos pasan por el
 * optimizador de imágenes del propio sitio.
 *
 * Variables de entorno (ver .env.example y docs/facebook.md):
 * - FACEBOOK_PAGE_ID     id numérico de la página (o su nombre de usuario).
 * - FACEBOOK_PAGE_TOKEN  token de acceso de la página (secreto).
 *
 * Sin estas variables, o si Facebook responde con error, devuelve una lista
 * vacía y la portada muestra las noticias del sitio.
 */
import { cacheLife } from "next/cache";
import { z } from "zod";

/** Versión de la Graph API. Meta mantiene cada versión unos dos años. */
const GRAPH_VERSION = "v23.0";
const LIMITE = 10;
const TIMEOUT_MS = 10_000;

export type PublicacionFacebook = {
  id: string;
  /** Texto de la publicación (puede venir vacío si es solo foto). */
  texto: string;
  /** Fecha y hora ISO 8601. */
  fecha: string;
  enlace: string;
  imagen: string | null;
};

const respuestaSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      message: z.string().optional(),
      created_time: z.string(),
      permalink_url: z.string().url().optional(),
      full_picture: z.string().url().optional(),
    }),
  ),
});

type Config = { pagina: string; token: string };

function leerConfig(): Config | null {
  const pagina = process.env.FACEBOOK_PAGE_ID?.trim();
  const token = process.env.FACEBOOK_PAGE_TOKEN?.trim();
  if (!pagina || !token) return null;
  return { pagina, token };
}

/** Facebook entrega "2026-10-18T15:30:00+0000"; se normaliza a ISO 8601. */
function normalizarFecha(fecha: string): string {
  return fecha.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
}

/**
 * Convierte la respuesta de la Graph API en publicaciones listas para mostrar.
 * Descarta las que no tienen texto ni foto, o que no traen enlace.
 */
export function interpretarRespuesta(json: unknown): PublicacionFacebook[] {
  const { data } = respuestaSchema.parse(json);
  return data
    .filter((p) => p.permalink_url && (p.message?.trim() || p.full_picture))
    .map((p) => ({
      id: p.id,
      texto: p.message?.trim() ?? "",
      fecha: normalizarFecha(p.created_time),
      enlace: p.permalink_url!,
      imagen: p.full_picture ?? null,
    }));
}

/**
 * Consulta cacheada: se renueva en segundo plano cada hora. Lanza si falla.
 * El token se lee aquí dentro para que no forme parte de la clave de caché.
 */
async function consultar(pagina: string): Promise<PublicacionFacebook[]> {
  "use cache";
  cacheLife("hours");

  const token = leerConfig()?.token;
  if (!token) return [];
  const params = new URLSearchParams({
    fields: "id,message,created_time,permalink_url,full_picture",
    limit: String(LIMITE),
    access_token: token,
  });
  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(pagina)}/posts?${params}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    // El cuerpo de error de Meta no incluye el token, pero tampoco se registra completo.
    throw new Error(`Graph API respondió ${res.status}`);
  }
  return interpretarRespuesta(await res.json());
}

export async function obtenerPublicacionesFacebook(): Promise<PublicacionFacebook[]> {
  const config = leerConfig();
  if (!config) return [];
  try {
    return await consultar(config.pagina);
  } catch (error) {
    // Un error no se guarda en caché: la próxima visita vuelve a intentarlo.
    console.error("[facebook] No se pudieron leer las publicaciones:", error instanceof Error ? error.message : error);
    return [];
  }
}
