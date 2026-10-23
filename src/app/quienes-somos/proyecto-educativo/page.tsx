import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { documentos } from "@/content/documentos";
import { articulacion, desafios, FUENTE_PEI_SNA, identidadSna, metodologias, URL_PEI } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Proyecto educativo",
  descripcion:
    "Proyecto Educativo Institucional 2025-2026 del Liceo Industrial Ricardo Fenner Ruedi: qué es, dónde descargarlo y qué contiene.",
  ruta: "/quienes-somos/proyecto-educativo",
});

const pei = documentos.find((d) => d.url === URL_PEI);

function Descarga() {
  return (
    <div className="chamfer on-dark bg-accent p-6 text-accent-ink sm:p-8">
      <FileText aria-hidden className="size-10" />
      <p className="mt-6 text-lead font-extrabold leading-tight tracking-[-0.02em]">
        {pei?.titulo ?? "Proyecto Educativo Institucional"}
      </p>
      <p className="mt-2 text-small">
        {pei?.formato ?? "PDF"}
        {pei?.vigencia ? ` · Vigencia ${pei.vigencia}` : null}
        {pei?.publicadoEn ? ` · Publicado en el ${pei.publicadoEn}` : null}
      </p>
      <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-8">
        Descargar el PEI
        <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5" />
        <span className="sr-only">(PDF, abre en una pestaña nueva)</span>
      </a>
    </div>
  );
}

export default function ProyectoEducativoPage() {
  return (
    <>
      <Encabezado
        titulo="Proyecto educativo"
        migas={[
          { etiqueta: "Quiénes somos", href: "/quienes-somos" },
          { etiqueta: "Proyecto educativo", href: "/quienes-somos/proyecto-educativo" },
        ]}
        bajada={<p>El documento que define quiénes somos, qué buscamos y cómo enseñamos.</p>}
        aparte={<Descarga />}
      />

      <Container as="section" aria-labelledby="que-es" className="mt-[calc(var(--section-gap)/2)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <TituloSeccion id="que-es" className="lg:col-span-5">
            Qué es el PEI
          </TituloSeccion>
          <div className="prose-liceo reveal lg:col-span-7">
            <p>
              El Proyecto Educativo Institucional (PEI) es el documento que orienta la vida del liceo. Declara su
              identidad, sus propósitos y la forma en que organiza la enseñanza.
            </p>
            <p>
              El PEI vigente está publicado en el Sistema de Admisión Escolar del Ministerio de Educación. Así,
              cada familia puede conocerlo antes de postular.
            </p>
            {pei ? <p>El PEI del liceo incluye: {pei.descripcion.charAt(0).toLowerCase() + pei.descripcion.slice(1)}</p> : null}
            <p>
              Las normas de convivencia están en el Reglamento Interno, disponible en{" "}
              <Link href="/documentos">Documentos</Link>.
            </p>
          </div>
        </div>
      </Container>

      <section aria-labelledby="identidad" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <TituloSeccion id="identidad" className="lg:col-span-7">
              Visión, misión y valores
            </TituloSeccion>
            <p className="max-w-[48ch] lg:col-span-5 lg:self-end">
              El liceo pertenece a la red SNA Educa y comparte su visión, su misión, sus valores y el perfil de sus
              egresados.
            </p>
          </div>

          <div className="mt-12 space-y-12 sm:mt-16">
            {(
              [
                ["vision", "Visión", identidadSna.vision],
                ["mision", "Misión", identidadSna.mision],
              ] as const
            ).map(([id, titulo, texto]) => (
              <section key={id} aria-labelledby={id} className="reveal grid gap-4 sm:grid-cols-12 sm:items-baseline">
                <h3 id={id} className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] tracking-[-0.03em] sm:col-span-5">
                  {titulo}
                </h3>
                <p className="max-w-[58ch] text-lead leading-snug sm:col-span-7">{texto}</p>
              </section>
            ))}

            <section aria-labelledby="valores" className="grid gap-4 sm:grid-cols-12">
              <h3 id="valores" className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] tracking-[-0.03em] sm:col-span-5">
                Valores
              </h3>
              <dl className="reveal grid gap-x-8 gap-y-6 sm:col-span-7 md:grid-cols-2">
                {identidadSna.valores.map((v) => (
                  <div key={v.nombre}>
                    <dt className="flex items-baseline gap-3 font-extrabold">
                      <span aria-hidden className="bullet text-accent" />
                      {v.nombre}
                    </dt>
                    <dd className="mt-1 text-muted">{v.texto}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="perfil" className="grid gap-4 sm:grid-cols-12">
              <h3 id="perfil" className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] tracking-[-0.03em] sm:col-span-5">
                Perfil del egresado
              </h3>
              <div className="reveal sm:col-span-7">
                <p className="max-w-[58ch]">{identidadSna.perfilEgresado.intro}</p>
                <ul className="mt-5 space-y-3">
                  {identidadSna.perfilEgresado.rasgos.map((r) => (
                    <li key={r.slice(0, 24)} className="flex max-w-[58ch] items-baseline gap-3">
                      <span aria-hidden className="bullet flex-none text-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="sellos" className="grid gap-4 sm:grid-cols-12 sm:items-baseline">
              <h3 id="sellos" className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] tracking-[-0.03em] sm:col-span-5">
                Sellos del liceo
              </h3>
              <Pendiente className="bg-surface-strong! sm:col-span-7">
                Pendiente: el PEI del liceo publicado en el SAE viene incompleto en este apartado.
              </Pendiente>
            </section>
          </div>
          <p className="mt-12 text-small text-muted">Fuente: {FUENTE_PEI_SNA}.</p>
        </Container>
      </section>

      <Container as="section" aria-labelledby="desafios" className="mt-[var(--section-gap)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TituloSeccion id="desafios">Desafíos de la dirección</TituloSeccion>
            <p className="mt-6 max-w-[40ch] text-muted">
              En lo que viene, la dirección del liceo concentra sus esfuerzos en estos objetivos.
            </p>
          </div>
          <ul className="space-y-2 lg:col-span-7">
            {desafios.map((d) => (
              <li key={d} className="flex items-baseline gap-4 bg-surface px-6 py-5 text-lead leading-snug sm:px-8">
                <span aria-hidden className="bullet flex-none text-accent" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container as="section" aria-labelledby="como-se-aprende" className="mt-[var(--section-gap)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <TituloSeccion id="como-se-aprende" className="lg:col-span-5">
            Cómo se aprende
          </TituloSeccion>
          <div className="reveal lg:col-span-7">
            <p className="max-w-[52ch] text-lead leading-snug">
              El liceo aplica metodologías activas, que ponen en el centro la acción del estudiante y fortalecen sus
              competencias.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {metodologias.map((m) => (
                <li key={m} className="bg-surface px-4 py-2 font-semibold chamfer [--chamfer:0.5rem]">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <section aria-labelledby="despues" className="mt-[var(--section-gap)] bg-ink py-16 text-bg on-dark sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TituloSeccion id="despues">Seguir estudiando</TituloSeccion>
            <p className="mt-6 max-w-[44ch] text-lead leading-snug text-[#e4dfe2]">
              El liceo tiene convenios de articulación con instituciones de educación superior, para que sus egresados
              continúen estudiando.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            {(
              [
                ["Región de Los Ríos", articulacion.losRios],
                ["Región de Los Lagos", articulacion.losLagos],
              ] as const
            ).map(([region, lista]) => (
              <div key={region}>
                <h3 className="text-lead tracking-[-0.02em]">{region}</h3>
                <ul className="mt-4 space-y-2 text-[#e4dfe2]">
                  {lista.map((i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span aria-hidden className="bullet text-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="sm:col-span-2">
              <h3 className="text-lead tracking-[-0.02em]">Alianzas nacionales e internacionales</h3>
              <p className="mt-4 max-w-[60ch] text-[#e4dfe2]">
                Junto a SNA Educa: {articulacion.alianzas.slice(0, -1).join(", ")} y {articulacion.alianzas.at(-1)}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
