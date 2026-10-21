import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BedDouble,
  Building2,
  CalendarCheck,
  GraduationCap,
  Mail,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EtiquetaProvisional, Pendiente } from "@/components/ui/Pendiente";
import { admision, internado, preguntas, razones, type IconoRazon } from "@/content/informacion";
import { institucion, URL_SAE } from "@/content/institucion";

/*
 * Secciones informativas de la portada. El contenido se edita en el panel
 * (/admin → Portada) y vive en src/content/datos/*.json.
 */

const ICONOS_RAZON: Record<IconoRazon, LucideIcon> = {
  especialidades: Wrench,
  titulo: GraduationCap,
  bicentenario: Award,
  internado: BedDouble,
  trayectoria: CalendarCheck,
  empresas: Building2,
};

/** ¿Por qué estudiar aquí? Título fijo a la izquierda y razones en filas a la derecha. */
export function PorQueEstudiar() {
  return (
    <section aria-labelledby="por-que" className="pt-[var(--section-gap)]">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="por-que" className="max-w-[14ch] text-head">
              {razones.titulo}
            </h2>
            <Link href="/quienes-somos" className="btn btn-ink mt-8">
              Conocer el liceo
              <ArrowRight aria-hidden className="flecha size-4" />
            </Link>
          </div>
        </div>
        <ul className="space-y-3 lg:col-span-7">
          {razones.razones.map((r) => {
            const Icono = ICONOS_RAZON[r.icono];
            return (
              <li key={r.titulo} className="flex gap-5 bg-surface p-6 chamfer chamfer-lg sm:gap-6 sm:p-8">
                <span
                  aria-hidden
                  className="flex size-12 flex-none items-center justify-center bg-accent text-accent-ink chamfer [--chamfer:0.55rem] sm:size-14"
                >
                  <Icono className="size-6 sm:size-7" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-tight tracking-[-0.025em]">
                    {r.titulo}
                  </h3>
                  {r.texto ? <p className="mt-2 max-w-[52ch] text-muted">{r.texto}</p> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Calendario de admisión del SAE, en la franja granate de admisión. */
export function CalendarioAdmision() {
  return (
    <section aria-labelledby="admision" className="mt-[var(--section-gap)] bg-accent text-accent-ink on-dark">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="admision" className="text-[clamp(2.25rem,1.3rem+4vw,5rem)]">
              {admision.titulo}
            </h2>
            {admision.bajada ? <p className="mt-6 max-w-[48ch] text-lead leading-snug">{admision.bajada}</p> : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
            <a href={URL_SAE} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Postular en el SAE
              <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-4" />
              <span className="sr-only">(abre sistemadeadmisionescolar.cl en una pestaña nueva)</span>
            </a>
            <Link href="/admision" className="btn btn-ink">
              Cómo postular paso a paso
              <ArrowRight aria-hidden className="flecha size-4" />
            </Link>
          </div>
        </div>

        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {admision.etapas.map((e) => (
            <li key={e.etapa} className="flex gap-4 bg-[#7d120d] p-5 chamfer sm:p-6">
              <span aria-hidden className="mt-1.5 size-3 flex-none bg-accent-ink chamfer [--chamfer:0.3rem]" />
              <div>
                <p className="text-small font-semibold text-[#f6dcda]">{e.etapa}</p>
                <p className="mt-1 text-lead font-semibold leading-tight tracking-[-0.02em]">
                  {e.fechas || <EtiquetaProvisional>Fecha por confirmar</EtiquetaProvisional>}
                </p>
                {e.detalle ? <p className="mt-2 text-[0.9375rem] text-[#f6dcda]">{e.detalle}</p> : null}
              </div>
            </li>
          ))}
        </ol>
        {admision.nota ? <p className="mt-6 max-w-[70ch] text-small text-[#f6dcda]">{admision.nota}</p> : null}
      </Container>
    </section>
  );
}

/** Residencia escolar: qué es, para quién, qué incluye y a quién escribir. */
export function Internado() {
  const correo = institucion.correos.find((c) => c.etiqueta === "Secretaría") ?? institucion.correos[0];
  return (
    <section aria-labelledby="internado" className="bg-surface py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span
            aria-hidden
            className="flex size-16 items-center justify-center bg-accent text-accent-ink chamfer [--chamfer:0.75rem]"
          >
            <BedDouble className="size-8" strokeWidth={1.5} />
          </span>
          <h2 id="internado" className="mt-6 max-w-[16ch] text-head">
            {internado.titulo}
          </h2>
          {internado.texto ? <p className="mt-6 max-w-[48ch] text-lead leading-snug">{internado.texto}</p> : null}
          {internado.contacto ? <p className="mt-6 max-w-[48ch] text-muted">{internado.contacto}</p> : null}
          <a href={`mailto:${correo.valor}`} className="btn btn-ink mt-6 break-all">
            <Mail aria-hidden className="size-4 flex-none" />
            {correo.valor}
          </a>
        </div>
        <dl className="space-y-3 lg:col-span-7 lg:self-end">
          {internado.puntos.map((p) => (
            <div key={p.titulo} className="bg-bg p-6 chamfer chamfer-lg sm:p-8">
              <dt className="text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] font-extrabold leading-tight tracking-[-0.025em]">
                {p.titulo}
              </dt>
              <dd className="mt-3 max-w-[56ch]">
                {p.texto ? p.texto : <Pendiente>Información por confirmar con el liceo.</Pendiente>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Preguntas frecuentes en acordeón nativo (details/summary): funciona sin JavaScript. */
export function PreguntasFrecuentes() {
  return (
    <section aria-labelledby="preguntas-frecuentes" className="pt-[var(--section-gap)]">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="preguntas-frecuentes" className="text-head">
            {preguntas.titulo}
          </h2>
          <Link href="/contacto" className="btn btn-ink mt-8">
            Hacer otra pregunta
            <ArrowRight aria-hidden className="flecha size-4" />
          </Link>
        </div>
        <div className="space-y-2 lg:col-span-8">
          {preguntas.preguntas.map((p) => (
            <details key={p.pregunta} className="group bg-surface">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[1.0625rem] font-semibold sm:px-6 [&::-webkit-details-marker]:hidden">
                <span>{p.pregunta}</span>
                <span
                  aria-hidden
                  className="bullet flex-none text-accent transition-transform duration-200 ease-[var(--ease-out)] group-open:rotate-90"
                />
              </summary>
              <div className="max-w-[62ch] px-5 pb-6 sm:px-6">
                {p.respuesta ? p.respuesta : <EtiquetaProvisional>Respuesta por confirmar</EtiquetaProvisional>}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
