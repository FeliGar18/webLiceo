"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { enviarContacto } from "@/app/contacto/actions";
// Solo tipos: el esquema (zod) no se envía al navegador.
import type { Campo, EstadoContacto } from "@/lib/contacto/schema";

type Limites = {
  nombre: { max: number };
  correo: { max: number };
  telefono: { max: number };
  asunto: { max: number };
  mensaje: { max: number };
};

const ORDEN: Campo[] = ["nombre", "correo", "telefono", "perfil", "asunto", "mensaje", "consentimiento"];

const ETIQUETAS: Record<Campo, string> = {
  nombre: "Nombre",
  correo: "Correo electrónico",
  telefono: "Teléfono",
  perfil: "Usted es",
  asunto: "Asunto",
  mensaje: "Mensaje",
  consentimiento: "Política de privacidad",
};

const inicial: EstadoContacto = { estado: "inicial" };

/* Campo: bloque claro de 52px con borde inferior visible (contraste de controles, WCAG 1.4.11). */
const claseCampo =
  "block w-full bg-accent-soft px-4 text-body text-ink border-0 border-b-[3px] border-ink placeholder:text-muted " +
  "aria-[invalid=true]:border-b-[6px] transition-[border-width] duration-150";

export function FormularioContacto({
  perfiles,
  limites,
  correoSecretaria,
}: {
  perfiles: readonly string[];
  limites: Limites;
  correoSecretaria: string;
}) {
  const [estado, accion, pendiente] = useActionState(enviarContacto, inicial);
  // En una ref de React (no en un campo oculto): React reinicia los campos del
  // formulario tras cada envío y se perdería la marca de tiempo.
  const inicioRef = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resumenRef = useRef<HTMLDivElement>(null);
  const exitoRef = useRef<HTMLParagraphElement>(null);
  const id = useId();

  // El instante en que el formulario quedó disponible se toma en el navegador,
  // nunca durante el render en el servidor (la página es prerenderizada).
  useEffect(() => {
    inicioRef.current = Date.now();
  }, []);

  // Tras cada respuesta: foco al primer campo con error, o al resumen / al aviso de éxito.
  useEffect(() => {
    if (!estado.envio) return;
    if (estado.estado === "enviado") {
      exitoRef.current?.focus();
      return;
    }
    const primero = ORDEN.find((c) => estado.errores?.[c]);
    const campo = primero ? formRef.current?.elements.namedItem(primero) : null;
    if (campo instanceof HTMLElement) campo.focus();
    else resumenRef.current?.focus();
  }, [estado]);

  const enviar = (formData: FormData) => {
    // Tiempo de llenado medido por el propio navegador: no depende de que su reloj esté en hora.
    const inicio = inicioRef.current;
    formData.set("transcurrido", inicio > 0 ? String(Math.max(0, Date.now() - inicio)) : "");
    accion(formData);
  };

  const errores = estado.estado === "error" ? (estado.errores ?? {}) : {};
  const v = estado.estado === "error" ? (estado.valores ?? {}) : {};
  const idError = (c: Campo) => `${id}-${c}-error`;
  const props = (c: Campo, extra?: string) => ({
    id: `${id}-${c}`,
    name: c,
    "aria-invalid": errores[c] ? true : undefined,
    "aria-describedby": [extra, errores[c] ? idError(c) : undefined].filter(Boolean).join(" ") || undefined,
  });
  const listaErrores = ORDEN.filter((c) => errores[c]);

  return (
    <div>
      {/* Aviso de éxito: la región existe siempre para que los lectores de pantalla la anuncien. */}
      <div role="status">
        {estado.estado === "enviado" ? (
          <p
            ref={exitoRef}
            tabIndex={-1}
            className="mb-8 flex items-start gap-3 bg-bg px-5 py-4 font-semibold text-ink outline-none"
          >
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 flex-none text-accent" />
            <span>{estado.mensaje}</span>
          </p>
        ) : null}
      </div>

      <form ref={formRef} action={enviar} noValidate className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
      {estado.estado === "error" ? (
        <div
          ref={resumenRef}
          role="alert"
          tabIndex={-1}
          className="bg-bg px-5 py-4 text-ink outline-none sm:col-span-2"
        >
          <p className="flex items-start gap-3 font-semibold">
            <AlertTriangle aria-hidden className="mt-0.5 size-5 flex-none text-accent" />
            <span>{estado.mensaje}</span>
          </p>
          {listaErrores.length > 0 ? (
            <ul className="mt-3 grid gap-1 pl-8 text-small">
              {listaErrores.map((c) => (
                <li key={c}>
                  <a href={`#${id}-${c}`} className="font-semibold text-accent underline">
                    {ETIQUETAS[c]}
                  </a>
                  : {errores[c]}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <Fila etiqueta="Nombre" htmlFor={`${id}-nombre`} error={errores.nombre} idError={idError("nombre")}>
        <input
          {...props("nombre")}
          type="text"
          autoComplete="name"
          required
          maxLength={limites.nombre.max}
          defaultValue={v.nombre}
          className={`${claseCampo} h-[52px]`}
        />
      </Fila>

      <Fila etiqueta="Correo electrónico" htmlFor={`${id}-correo`} error={errores.correo} idError={idError("correo")}>
        <input
          {...props("correo")}
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          maxLength={limites.correo.max}
          defaultValue={v.correo}
          className={`${claseCampo} h-[52px]`}
        />
      </Fila>

      <Fila
        etiqueta="Teléfono"
        opcional
        htmlFor={`${id}-telefono`}
        error={errores.telefono}
        idError={idError("telefono")}
      >
        <input
          {...props("telefono")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={limites.telefono.max}
          placeholder="+56 9 1234 5678"
          defaultValue={v.telefono}
          className={`${claseCampo} h-[52px]`}
        />
      </Fila>

      <Fila etiqueta="Usted es" htmlFor={`${id}-perfil`} error={errores.perfil} idError={idError("perfil")}>
        <select
          {...props("perfil")}
          required
          defaultValue={v.perfil ?? ""}
          className={`${claseCampo} h-[52px] appearance-auto`}
        >
          <option value="" disabled>
            Elija una opción
          </option>
          {perfiles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Fila>

      <Fila
        etiqueta="Asunto"
        htmlFor={`${id}-asunto`}
        error={errores.asunto}
        idError={idError("asunto")}
        className="sm:col-span-2"
      >
        <input
          {...props("asunto")}
          type="text"
          required
          maxLength={limites.asunto.max}
          defaultValue={v.asunto}
          className={`${claseCampo} h-[52px]`}
        />
      </Fila>

      <Fila
        etiqueta="Mensaje"
        htmlFor={`${id}-mensaje`}
        error={errores.mensaje}
        idError={idError("mensaje")}
        className="sm:col-span-2"
        ayuda={{ id: `${id}-mensaje-ayuda`, texto: `Hasta ${limites.mensaje.max} caracteres.` }}
      >
        <textarea
          {...props("mensaje", `${id}-mensaje-ayuda`)}
          required
          rows={6}
          maxLength={limites.mensaje.max}
          defaultValue={v.mensaje}
          className={`${claseCampo} min-h-40 resize-y py-3`}
        />
      </Fila>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            {...props("consentimiento")}
            type="checkbox"
            value="si"
            required
            defaultChecked={v.consentimiento}
            className="mt-0.5 size-6 flex-none accent-[var(--ink)]"
          />
          <label htmlFor={`${id}-consentimiento`} className="font-semibold leading-snug">
            Acepto que el liceo use estos datos solo para responder mi mensaje, según la{" "}
            <Link href="/privacidad" className="underline">
              política de privacidad
            </Link>
            .
          </label>
        </div>
        {errores.consentimiento ? <MensajeError id={idError("consentimiento")} texto={errores.consentimiento} /> : null}
      </div>

      {/* Trampa para bots: fuera de pantalla, sin foco y oculta a lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${id}-sitio_web`}>No complete este campo</label>
        <input id={`${id}-sitio_web`} type="text" name="sitio_web" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pendiente}
          className="btn w-full bg-ink text-bg min-h-[3.5rem] text-lead hover:bg-bg hover:text-ink disabled:cursor-wait disabled:opacity-80"
        >
          {pendiente ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p className="mt-4 text-small">
          Si prefiere, escriba directamente a{" "}
          <a href={`mailto:${correoSecretaria}`} className="font-semibold underline">
            {correoSecretaria}
          </a>
          .
        </p>
      </div>
      </form>
    </div>
  );
}

function Fila({
  etiqueta,
  htmlFor,
  error,
  idError,
  opcional = false,
  ayuda,
  className = "",
  children,
}: {
  etiqueta: string;
  htmlFor: string;
  error?: string;
  idError: string;
  opcional?: boolean;
  ayuda?: { id: string; texto: string };
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block font-semibold">
        {etiqueta}
        {opcional ? <span className="font-normal"> (opcional)</span> : null}
      </label>
      {children}
      {ayuda ? (
        <p id={ayuda.id} className="mt-2 text-small">
          {ayuda.texto}
        </p>
      ) : null}
      {error ? <MensajeError id={idError} texto={error} /> : null}
    </div>
  );
}

function MensajeError({ id, texto }: { id: string; texto: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-small font-semibold">
      <AlertTriangle aria-hidden className="mt-0.5 size-4 flex-none" />
      <span>{texto}</span>
    </p>
  );
}
