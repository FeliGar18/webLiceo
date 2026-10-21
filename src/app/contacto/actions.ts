"use server";

import { institucion } from "@/content/institucion";
import { enviarCorreoContacto } from "@/lib/contacto/correo";
import { CAMPOS, envioDemasiadoRapido, validarContacto, type EstadoContacto } from "@/lib/contacto/schema";

/*
 * Server action del formulario de contacto.
 *
 * Una server action es un endpoint POST público: cualquiera puede llamarla sin
 * pasar por la interfaz. Por eso aquí se vuelve a validar todo y nunca se
 * devuelve al navegador un detalle interno (respuesta de Resend, excepciones).
 * Next.js ya compara Origin con Host (CSRF) y limita el cuerpo a 1 MB.
 */

const CORREO_SECRETARIA = institucion.correos[0].valor;

const MENSAJE_FALLO = `No pudimos enviar su mensaje. Inténtelo más tarde o escriba directamente a ${CORREO_SECRETARIA}.`;
const MENSAJE_SIN_CONFIGURAR = `El formulario aún no está habilitado; escriba a ${CORREO_SECRETARIA}.`;
const MENSAJE_RAPIDO = `El formulario se envió demasiado rápido. Espere unos segundos y vuelva a intentarlo, o escriba a ${CORREO_SECRETARIA}.`;
const MENSAJE_FRECUENCIA = `Se recibieron demasiados mensajes desde su conexión. Inténtelo más tarde o escriba a ${CORREO_SECRETARIA}.`;

/**
 * Punto de extensión para limitar la frecuencia de envíos.
 *
 * Hoy SIEMPRE permite. En Vercel cada invocación puede correr en una instancia
 * distinta y efímera, así que un contador en memoria del proceso no sería
 * persistente ni compartido: daría una falsa sensación de protección, por eso
 * no se usa. Un límite real requiere un almacén externo, por ejemplo Upstash
 * Redis (integración del Marketplace de Vercel) con una ventana deslizante por
 * IP (`x-forwarded-for` vía `headers()` de `next/headers`), guardando solo un
 * hash de la IP y con expiración corta.
 *
 * Mientras tanto, el honeypot y el tiempo mínimo de llenado frenan el spam básico.
 */
async function verificarFrecuencia(): Promise<boolean> {
  return true;
}

function valoresParaReintento(entrada: Record<string, unknown>): EstadoContacto["valores"] {
  const valores: NonNullable<EstadoContacto["valores"]> = {};
  for (const campo of CAMPOS) {
    if (campo === "consentimiento") continue;
    const v = entrada[campo];
    // Se recorta para no reflejar cargas enormes de vuelta al navegador.
    if (typeof v === "string") valores[campo] = v.slice(0, 4000);
  }
  valores.consentimiento = entrada.consentimiento === "si";
  return valores;
}

export async function enviarContacto(_previo: EstadoContacto, formData: FormData): Promise<EstadoContacto> {
  const envio = Date.now();
  const entrada: Record<string, unknown> = {};
  for (const [clave, valor] of formData.entries()) {
    if (typeof valor === "string" && !clave.startsWith("$ACTION")) entrada[clave] = valor;
  }

  if (!(await verificarFrecuencia())) {
    return { estado: "error", mensaje: MENSAJE_FRECUENCIA, valores: valoresParaReintento(entrada), envio };
  }

  if (envioDemasiadoRapido(entrada.transcurrido)) {
    return { estado: "error", mensaje: MENSAJE_RAPIDO, valores: valoresParaReintento(entrada), envio };
  }

  const validacion = validarContacto(entrada);
  if (!validacion.ok) {
    if (validacion.trampa) {
      // Mensaje genérico: no se explica por qué se rechazó.
      return { estado: "error", mensaje: MENSAJE_FALLO, envio };
    }
    return {
      estado: "error",
      mensaje: "Revise los campos marcados.",
      errores: validacion.errores,
      valores: valoresParaReintento(entrada),
      envio,
    };
  }

  const resultado = await enviarCorreoContacto(validacion.datos);
  if (!resultado.ok) {
    return {
      estado: "error",
      mensaje: resultado.motivo === "sin-configurar" ? MENSAJE_SIN_CONFIGURAR : MENSAJE_FALLO,
      valores: valoresParaReintento(entrada),
      envio,
    };
  }

  return {
    estado: "enviado",
    mensaje: "Recibimos su mensaje. El liceo le responderá al correo que indicó.",
    envio,
  };
}
