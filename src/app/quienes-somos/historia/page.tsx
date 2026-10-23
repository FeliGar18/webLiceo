import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { Foto } from "@/components/ui/Foto";
import { FotoAmpliable } from "@/components/ui/FotoAmpliable";
import { imagenes } from "@/content/imagenes";
import {
  FUENTE_PEI,
  FUENTE_RESENA,
  FUENTE_TRAYECTORIA,
  URL_PEI,
  campus,
  crecimiento,
  enElMundo,
  hitos,
  liderazgo,
  origenes,
  resenaNombre,
} from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Historia",
  descripcion:
    "Historia del Liceo Industrial Ricardo Fenner Ruedi de La Unión: de la fundación de 1994 al programa Liceos Bicentenario en 2019.",
  ruta: "/quienes-somos/historia",
});

export default function HistoriaPage() {
  const primero = hitos[0]?.anio;
  // El último hito puede ser un periodo ("2020–2021"): el título usa su año final.
  const ultimo = hitos[hitos.length - 1]?.anio.split("–").at(-1);

  return (
    <>
      <Encabezado
        titulo="Historia"
        migas={[
          { etiqueta: "Quiénes somos", href: "/quienes-somos" },
          { etiqueta: "Historia", href: "/quienes-somos/historia" },
        ]}
        bajada={
          <p>
            Un liceo pensado para la comuna de La Unión, desde la fundación de {primero} hasta su selección como
            Liceo Bicentenario en 2019.
          </p>
        }
      />

      {/* Vista aérea del campus a todo el ancho; se abre en grande al hacer clic. */}
      <Container>
        <FotoAmpliable imagen={imagenes.campusAereo()} prioridad className="intro-fade" />
      </Container>

      <Container as="section" aria-labelledby="nombre" className="mt-[calc(var(--section-gap)/2)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <TituloSeccion id="nombre">Por qué lleva su nombre</TituloSeccion>
            <p className="reveal mt-8 max-w-[52ch] text-lead leading-snug">{resenaNombre}</p>
          </div>
          <Foto
            imagen={imagenes.ricardoFenner()}
            aspecto="aspect-square"
            forma="chamfer chamfer-lg"
            leyenda="Ricardo Fenner Ruedi y su esposa, Irma Paegelow Luppy."
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="lg:col-span-5 lg:col-start-8"
          />
        </div>
      </Container>

      <Container as="section" aria-labelledby="origen" className="mt-[var(--section-gap)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <TituloSeccion id="origen" className="lg:col-span-5">
            Cómo nació el liceo
          </TituloSeccion>
          <div className="reveal max-w-[60ch] space-y-5 lg:col-span-7">
            {origenes.map((parrafo) => (
              <p key={parrafo.slice(0, 32)}>{parrafo}</p>
            ))}
          </div>
        </div>
      </Container>

      <section aria-labelledby="hitos" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container>
          <TituloSeccion id="hitos">Hitos, de {primero} a {ultimo}</TituloSeccion>
          <ol className="reveal mt-12 space-y-10 sm:mt-16 sm:space-y-12">
            {hitos.map((h) => (
              <li key={h.anio} className="grid gap-x-10 gap-y-2 sm:grid-cols-12 sm:items-baseline">
                <p
                  className={`tabular font-extrabold leading-[0.9] tracking-[-0.045em] sm:col-span-4 lg:col-span-3 ${
                    // Los periodos ("2016–2018") van más chicos para caber en la columna.
                    h.anio.includes("–") ? "text-[clamp(2rem,1.3rem+2.6vw,3.5rem)]" : "text-[clamp(2.75rem,1.6rem+4.6vw,6rem)]"
                  }`}
                >
                  <time dateTime={h.anio}>{h.anio}</time>
                </p>
                <p className="flex max-w-[56ch] items-baseline gap-3 text-lead leading-snug sm:col-span-8 lg:col-span-7">
                  <span aria-hidden className="bullet text-accent" />
                  <span>{h.texto}</span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>


      {/* Crecimiento de la matrícula */}
      <Container as="section" aria-labelledby="crecimiento" className="mt-[var(--section-gap)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <TituloSeccion id="crecimiento" className="lg:col-span-6">
            Cómo ha crecido el liceo
          </TituloSeccion>
          <p className="max-w-[48ch] text-muted lg:col-span-6">
            De {crecimiento.desde.estudiantes} estudiantes y {crecimiento.desde.especialidades} especialidades en{" "}
            {crecimiento.desde.anio} a {crecimiento.hasta.estudiantes} estudiantes y {crecimiento.hasta.especialidades}{" "}
            especialidades en {crecimiento.hasta.anio}.
          </p>
        </div>
        <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["Estudiantes", "estudiantes"],
              ["Cursos", "cursos"],
              ["En el internado", "internos"],
              ["Especialidades", "especialidades"],
            ] as const
          ).map(([etiqueta, clave]) => (
            <div key={clave} className="bg-surface p-6 chamfer chamfer-lg sm:p-8">
              <dt className="text-small font-semibold text-muted">{etiqueta}</dt>
              <dd className="mt-4 flex items-baseline gap-3">
                <span className="tabular text-lead font-semibold text-muted">
                  {crecimiento.desde[clave]}
                  <span className="sr-only"> en {crecimiento.desde.anio}, </span>
                </span>
                <ArrowRight aria-hidden className="size-5 flex-none self-center text-accent" />
                <span className="tabular text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em]">
                  {crecimiento.hasta[clave]}
                  <span className="sr-only"> en {crecimiento.hasta.anio}</span>
                </span>
              </dd>
              <p aria-hidden className="mt-2 text-small text-muted">
                {crecimiento.desde.anio} → {crecimiento.hasta.anio}
              </p>
            </div>
          ))}
        </dl>
      </Container>

      {/* El campus hoy */}
      <Container as="section" aria-labelledby="campus" className="mt-[var(--section-gap)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <TituloSeccion id="campus" className="lg:col-span-6">
            El campus hoy
          </TituloSeccion>
          <p className="max-w-[48ch] text-muted lg:col-span-6">
            En {campus.terreno} se levantan las salas, los talleres de cada especialidad y el internado.
          </p>
        </div>
        <dl className="reveal mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {campus.cifras.map((c) => (
            <div key={c.etiqueta} className="flex flex-col gap-2">
              <dt className="order-2 max-w-[16ch] font-semibold text-muted">{c.etiqueta}</dt>
              <dd className="order-1 tabular text-[clamp(3rem,2rem+4vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
                {c.valor}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-lead tracking-[-0.02em]">Laboratorios e innovación</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {campus.laboratorios.map((l) => (
                <li key={l} className="bg-surface px-4 py-2 font-semibold chamfer [--chamfer:0.5rem]">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-lead tracking-[-0.02em]">Además</h3>
            <ul className="mt-4 space-y-2">
              {campus.otros.map((o) => (
                <li key={o} className="flex items-baseline gap-3">
                  <span aria-hidden className="bullet text-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Estudiantes y docentes en el extranjero */}
      <section aria-labelledby="mundo" className="mt-[var(--section-gap)] bg-ink py-16 text-bg on-dark sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TituloSeccion id="mundo">El liceo en el mundo</TituloSeccion>
            <p className="mt-6 max-w-[44ch] text-lead leading-snug text-[#e4dfe2]">
              <strong className="text-bg">{enElMundo.docentes} docentes</strong> han hecho pasantías en el extranjero desde
              2005, y <strong className="text-bg">{enElMundo.estudiantes} estudiantes</strong> han representado al liceo
              fuera de Chile.
            </p>
            <p className="mt-6 max-w-[48ch] text-small text-[#cfc8cc]">
              Pasantías docentes en {enElMundo.paisesPasantias.slice(0, -1).join(", ")} y{" "}
              {enElMundo.paisesPasantias.at(-1)}.
            </p>
          </div>
          <ol className="space-y-3 lg:col-span-7">
            {enElMundo.viajes.map((v) => (
              <li key={v.anio + v.texto} className="grid gap-2 bg-[#2a2629] px-6 py-5 sm:grid-cols-[6rem_1fr] sm:gap-6 sm:px-8">
                <span className="tabular text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-extrabold leading-none tracking-[-0.03em]">
                  {v.anio}
                </span>
                <span className="text-[#e4dfe2]">{v.texto}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Quienes han dirigido el liceo */}
      <Container as="section" aria-labelledby="direccion" className="mt-[var(--section-gap)]">
        <TituloSeccion id="direccion">El «Espíritu Fenner»</TituloSeccion>
        <div className="reveal mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {liderazgo.map((d) => (
            <article key={d.nombre} className="flex flex-col">
              <p className="text-small font-semibold text-accent">{d.periodo}</p>
              <h3 className="mt-2 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight tracking-[-0.03em]">{d.nombre}</h3>
              <p className="mt-4 max-w-[52ch] text-lead leading-snug">{d.texto}</p>
              {d.foto ? (
                // La foto de Ernesto Uslar mide 680 px: se muestran a lo más a 28 rem para no agrandarla.
                <Foto imagen={imagenes[d.foto]()} calidad={90} sizes="448px" className="mt-auto w-full max-w-md pt-8" />
              ) : null}
            </article>
          ))}
        </div>
      </Container>

      <Container as="section" aria-labelledby="fuente" className="mt-[calc(var(--section-gap)/2)]">
        <h2 id="fuente" className="text-lead tracking-[-0.02em]">
          Fuente
        </h2>
        <p className="mt-3 max-w-[60ch]">
          Reseña histórica del {FUENTE_PEI}, {FUENTE_RESENA} y {FUENTE_TRAYECTORIA}.{" "}
          <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent underline">
            Leer el documento (PDF)
            <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-4" />
            <span className="sr-only">(abre en una pestaña nueva)</span>
          </a>
        </p>
      </Container>
    </>
  );
}
