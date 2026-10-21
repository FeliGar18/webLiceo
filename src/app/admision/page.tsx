import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Emblema } from "@/components/ui/Emblema";
import { Encabezado } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { documentos } from "@/content/documentos";
import { especialidades } from "@/content/especialidades";
import { FUENTE_RIE, institucion, URL_SAE } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Admisión",
  descripcion:
    "Cómo postular al Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi de La Unión: la postulación se hace en el Sistema de Admisión Escolar (SAE) del Mineduc.",
  ruta: "/admision",
});

const pasos = [
  {
    titulo: "Registrarse en la plataforma",
    texto: "El apoderado crea su cuenta en el sitio del Sistema de Admisión Escolar con sus datos y los del estudiante.",
  },
  {
    titulo: "Buscar y agregar el liceo",
    texto:
      "En el buscador de establecimientos se encuentra el liceo por su nombre o su RBD y se agrega a la lista de postulación.",
  },
  {
    titulo: "Ordenar las preferencias",
    texto:
      "Se puede postular a más de un establecimiento, ordenándolos de mayor a menor preferencia. El orden importa en la asignación.",
  },
  {
    titulo: "Enviar la postulación",
    texto: "La postulación se envía dentro del período que fija el Mineduc. La plataforma entrega un comprobante.",
  },
  {
    titulo: "Revisar los resultados",
    texto:
      "Los resultados se publican en la misma plataforma. El apoderado acepta o rechaza el establecimiento asignado.",
  },
  {
    titulo: "Matricular en el liceo",
    texto: "Con la asignación aceptada, la matrícula se realiza en el establecimiento en el plazo que informe el Mineduc.",
  },
];

function EnlaceSae({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <a href={URL_SAE} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5" />
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </a>
  );
}

const preguntas: { pregunta: string; respuesta: React.ReactNode }[] = [
  {
    pregunta: "¿Dónde se postula al liceo?",
    respuesta: (
      <p>
        En el Sistema de Admisión Escolar (SAE) del Ministerio de Educación, en{" "}
        <a href={URL_SAE} target="_blank" rel="noopener noreferrer">
          sistemadeadmisionescolar.cl
          <span className="sr-only"> (abre en una pestaña nueva)</span>
        </a>
        . La postulación no se hace directamente en el liceo.
      </p>
    ),
  },
  {
    pregunta: "¿Quién fija las fechas de postulación?",
    respuesta: (
      <p>
        El Ministerio de Educación fija cada año el calendario de postulación, resultados y matrícula, y lo publica en el
        sitio del SAE. Revise allí las fechas vigentes.
      </p>
    ),
  },
  {
    pregunta: "¿Qué cursos imparte el liceo?",
    respuesta: <p>Enseñanza media técnico-profesional, de {institucion.niveles.valor}.</p>,
  },
  {
    pregunta: "¿Se puede postular a más de un establecimiento?",
    respuesta: (
      <p>
        Sí. El SAE permite agregar varios establecimientos y ordenarlos según la preferencia de la familia. La asignación
        considera ese orden.
      </p>
    ),
  },
  {
    pregunta: "¿Qué pasa si no quedo en el liceo?",
    respuesta: (
      <p>
        El SAE informa los resultados y las alternativas del proceso, como las listas de espera y el período
        complementario. Las reglas de cada etapa se publican en el sitio del SAE.
      </p>
    ),
  },
  {
    pregunta: "¿El liceo tiene internado?",
    respuesta: (
      <>
        <p>Sí. El liceo funciona en régimen externo y en régimen interno (internado).</p>
        <Pendiente className="mt-4">
          Requisitos, cupos y costos del internado pendientes de publicación por el liceo. Consulte por el formulario de
          contacto.
        </Pendiente>
      </>
    ),
  },
  {
    pregunta: "¿Se puede visitar el liceo antes de postular?",
    respuesta: (
      <Pendiente>
        Información sobre visitas y jornadas de puertas abiertas pendiente de publicación por el liceo.
      </Pendiente>
    ),
  },
];

export default function AdmisionPage() {
  const docs = documentos.filter((d) => d.categoria === "Proyecto Educativo" || d.categoria === "Reglamentos");

  return (
    <>
      <Encabezado
        titulo="Admisión"
        migas={[{ etiqueta: "Admisión", href: "/admision" }]}
        bajada="La postulación al liceo se hace en línea, en el Sistema de Admisión Escolar del Ministerio de Educación."
        aparte={
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <EnlaceSae className="btn btn-primary">Ir al Sistema de Admisión Escolar</EnlaceSae>
            <p className="text-small text-muted lg:text-right">RBD del liceo: {institucion.rbd.valor}</p>
          </div>
        }
      />

      <section aria-labelledby="como-postular" className="bg-accent py-16 text-accent-ink on-dark sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="como-postular" className="text-head">
              Cómo se postula
            </h2>
            <p className="mt-6 max-w-[44ch] text-lead leading-snug">
              Todo el proceso se realiza en la plataforma del SAE, no directamente en el liceo.
            </p>
            <p className="mt-6 max-w-[48ch]">
              Las fechas cambian cada año: las fija el Ministerio de Educación y se publican en el sitio del SAE.
            </p>
            <EnlaceSae className="btn btn-light mt-8">Ver fechas en el SAE</EnlaceSae>
            <p className="mt-8 max-w-[48ch] text-small">Fuente: {FUENTE_RIE}, artículo 50.</p>
          </div>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {pasos.map((p) => (
              <li key={p.titulo}>
                <h3 className="flex items-baseline gap-3 text-lead leading-tight tracking-[-0.02em]">
                  <span aria-hidden className="bullet" />
                  {p.titulo}
                </h3>
                <p className="mt-3 max-w-[40ch]">{p.texto}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="niveles" className="mt-[var(--section-gap)]">
        <Container>
        <h2 id="niveles" className="text-head">
          Niveles y régimen
        </h2>
        <dl className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <dt className="text-small font-semibold text-muted">Niveles</dt>
            <dd className="mt-2 text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-extrabold leading-tight tracking-[-0.035em]">
              {institucion.niveles.valor}
            </dd>
            <dd className="mt-3 max-w-[44ch]">
              Enseñanza media técnico-profesional. En esta modalidad, la formación en una especialidad corresponde a 3° y 4° medio.
            </dd>
          </div>
          <div>
            <dt className="text-small font-semibold text-muted">Régimen</dt>
            <dd className="mt-2 text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-extrabold leading-tight tracking-[-0.035em]">
              Externo e internado
            </dd>
            <dd className="mt-3 max-w-[44ch]">
              El liceo recibe estudiantes en régimen externo y en régimen interno, con internado.
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-small text-muted">Fuente: {institucion.niveles.fuente}.</p>
        </Container>
      </section>

      <section aria-labelledby="especialidades" className="mt-[var(--section-gap)]">
        <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="especialidades" className="text-head">
              Cinco especialidades
            </h2>
            <p className="mt-6 max-w-[40ch]">
              Cada una lleva el emblema y el color que tiene en la insignia del liceo.
            </p>
          </div>
          <ul className="space-y-2 lg:col-span-8">
            {especialidades.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/especialidades/${e.slug}`}
                  className="group flex min-h-20 items-center gap-5 bg-surface pr-5 text-ink no-underline transition-colors duration-200 hover:bg-surface-strong"
                >
                  <span
                    className="flex size-20 flex-none items-center justify-center"
                    style={{ background: `var(--${e.color})`, color: `var(--${e.color}-ink)` }}
                  >
                    <Emblema emblema={e.emblema} className="size-9" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col py-3">
                    <span className="text-lead font-extrabold leading-tight tracking-[-0.02em]">{e.nombre}</span>
                    <span className="text-small text-muted">Sector {e.sector}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="flecha size-5 flex-none transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </Container>
      </section>

      <section aria-labelledby="documentos-utiles" className="mt-[var(--section-gap)]">
        <Container>
        <h2 id="documentos-utiles" className="text-head">
          Documentos para leer antes
        </h2>
        <p className="mt-6 max-w-[56ch]">
          El Proyecto Educativo y el Reglamento Interno explican cómo funciona el liceo. Conviene revisarlos antes de
          postular.
        </p>
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {docs.map((d) => (
            <li key={d.id} className="flex gap-4">
              <FileText aria-hidden className="mt-1 size-6 flex-none text-accent" />
              <div>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lead font-extrabold leading-tight tracking-[-0.02em] text-ink"
                >
                  {d.titulo}
                  <span className="sr-only"> ({d.formato}, abre en una pestaña nueva)</span>
                </a>
                <p className="mt-2 max-w-[48ch] text-muted">
                  {d.vigencia ? `Vigencia ${d.vigencia}. ` : ""}
                  {d.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/documentos" className="font-semibold text-accent">
            Ver todos los documentos
          </Link>
        </p>
        </Container>
      </section>

      <section aria-labelledby="preguntas" className="mt-[var(--section-gap)]">
        <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 id="preguntas" className="text-head lg:col-span-4">
            Preguntas frecuentes
          </h2>
          <div className="space-y-2 lg:col-span-8">
            {preguntas.map((p) => (
              <details key={p.pregunta} className="group bg-surface">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{p.pregunta}</span>
                  <span
                    aria-hidden
                    className="bullet text-accent transition-transform duration-200 ease-[var(--ease-out)] group-open:rotate-90"
                  />
                </summary>
                <div className="max-w-[62ch] px-5 pb-6 [&_a]:font-semibold [&_a]:text-accent">{p.respuesta}</div>
              </details>
            ))}
          </div>
        </div>
        </Container>
      </section>

      <section aria-labelledby="contacto-admision" className="mt-[var(--section-gap)]">
        <Container>
        <div className="chamfer chamfer-lg flex flex-col gap-8 bg-surface-strong p-6 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="contacto-admision" className="max-w-[18ch] text-head">
              ¿Le quedan dudas?
            </h2>
            <p className="mt-6 max-w-[48ch]">
              Escríbanos y le responderemos. Para dudas sobre la plataforma o las fechas, contacte al Mineduc.
            </p>
          </div>
          <Link href="/contacto" className="btn btn-ink self-start lg:self-auto">
            Escribir al liceo
            <ArrowRight aria-hidden className="flecha size-5" />
          </Link>
        </div>
        </Container>
      </section>
    </>
  );
}
