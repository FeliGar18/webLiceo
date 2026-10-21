import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { Foto } from "@/components/ui/Foto";
import { imagenes } from "@/content/imagenes";
import { FUENTE_PEI, URL_PEI, hitos, resenaNombre } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Historia",
  descripcion:
    "Historia del Liceo Industrial Ricardo Fenner Ruedi de La Unión: de la fundación de 1994 al programa Liceos Bicentenario en 2019.",
  ruta: "/quienes-somos/historia",
});

export default function HistoriaPage() {
  const primero = hitos[0]?.anio;
  const ultimo = hitos[hitos.length - 1]?.anio;

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
            Liceo Bicentenario en {ultimo}.
          </p>
        }
        aparte={<Foto imagen={imagenes.laUnion()} prioridad sizes="(min-width: 1024px) 40vw, 100vw" />}
      />

      <Container as="section" aria-labelledby="nombre" className="mt-[calc(var(--section-gap)/2)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <TituloSeccion id="nombre" className="lg:col-span-5">
            Por qué lleva su nombre
          </TituloSeccion>
          <p className="reveal max-w-[52ch] text-lead leading-snug lg:col-span-7">{resenaNombre}</p>
        </div>
      </Container>

      <section aria-labelledby="hitos" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container>
          <TituloSeccion id="hitos">Hitos, de {primero} a {ultimo}</TituloSeccion>
          <ol className="reveal mt-12 space-y-10 sm:mt-16 sm:space-y-12">
            {hitos.map((h) => (
              <li key={h.anio} className="grid gap-x-10 gap-y-2 sm:grid-cols-12 sm:items-baseline">
                <p className="tabular text-[clamp(2.75rem,1.6rem+4.6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.045em] sm:col-span-4 lg:col-span-3">
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

      <Container as="section" aria-labelledby="fuente" className="mt-[calc(var(--section-gap)/2)]">
        <h2 id="fuente" className="text-lead tracking-[-0.02em]">
          Fuente
        </h2>
        <p className="mt-3 max-w-[60ch]">
          Reseña histórica del {FUENTE_PEI}.{" "}
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
