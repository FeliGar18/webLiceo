import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { documentos, documentosPendientes, plantillas } from "@/content/documentos";
import { fondoPantalla, logosDescargables } from "@/content/marca";
import { crearMetadata } from "@/lib/seo";
import type { Documento } from "@/lib/types";

export const metadata = crearMetadata({
  titulo: "Documentos y reglamentos",
  descripcion:
    "Proyecto Educativo Institucional, Reglamento Interno y otros documentos oficiales del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi.",
  ruta: "/documentos",
});

function textoFormato(d: Documento) {
  return d.formato === "Enlace" ? "enlace" : d.formato;
}

function EnlaceDocumento({ documento: d, className = "" }: { documento: Documento; className?: string }) {
  return (
    <a href={d.url} target="_blank" rel="noopener noreferrer" className={`btn btn-ink ${className}`}>
      {d.formato === "Enlace" ? "Abrir" : "Descargar"}
      <span className="sr-only">
        {" "}
        {d.titulo} ({textoFormato(d)}, abre en una pestaña nueva)
      </span>
      <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5" />
    </a>
  );
}

export default function DocumentosPage() {
  return (
    <>
      <Encabezado
        titulo="Documentos y reglamentos"
        migas={[{ etiqueta: "Documentos", href: "/documentos" }]}
        bajada="Documentos oficiales del liceo, en su versión pública vigente."
      />

      <section aria-labelledby="publicados">
        <Container>
          <h2 id="publicados" className="sr-only">
            Documentos publicados
          </h2>

          {documentos.length === 0 ? (
            <Pendiente>Aún no hay documentos publicados en este sitio.</Pendiente>
          ) : (
            <>
              {/* Escritorio y tableta: tabla. */}
              <table className="hidden w-full border-collapse text-left md:table">
                <caption className="pb-6 text-left text-small text-muted">
                  Documentos oficiales publicados, con su vigencia, formato y lugar de publicación.
                </caption>
                <thead>
                  <tr className="border-b-2 border-ink text-small">
                    <th scope="col" className="py-3 pr-6 font-semibold">
                      Documento
                    </th>
                    <th scope="col" className="py-3 pr-6 font-semibold">
                      Categoría
                    </th>
                    <th scope="col" className="py-3 pr-6 font-semibold">
                      Vigencia
                    </th>
                    <th scope="col" className="py-3 pr-6 font-semibold">
                      Formato
                    </th>
                    <th scope="col" className="hidden py-3 pr-6 font-semibold lg:table-cell">
                      Publicado en
                    </th>
                    <th scope="col" className="py-3 font-semibold">
                      <span className="sr-only">Enlace</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((d) => (
                    <tr key={d.id} className="border-b border-surface-strong align-top">
                      <th scope="row" className="py-6 pr-6 font-normal">
                        <span className="block text-lead font-extrabold leading-tight tracking-[-0.02em]">
                          {d.titulo}
                        </span>
                        <span className="mt-2 block max-w-[52ch] text-muted">{d.descripcion}</span>
                        <span className="mt-2 block text-small text-muted lg:hidden">Publicado en {d.publicadoEn}</span>
                      </th>
                      <td className="py-6 pr-6">{d.categoria}</td>
                      <td className="tabular py-6 pr-6">{d.vigencia ?? "Sin indicar"}</td>
                      <td className="py-6 pr-6">{d.formato}</td>
                      <td className="hidden py-6 pr-6 lg:table-cell">{d.publicadoEn}</td>
                      <td className="py-6 text-right">
                        <EnlaceDocumento documento={d} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Móvil: lista apilada, sin desborde horizontal. */}
              <ul className="space-y-2 md:hidden">
                {documentos.map((d) => (
                  <li key={d.id} className="bg-surface p-5">
                    <h3 className="text-lead leading-tight tracking-[-0.02em]">{d.titulo}</h3>
                    <p className="mt-2 text-muted">{d.descripcion}</p>
                    <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-small">
                      <dt className="font-semibold">Categoría</dt>
                      <dd>{d.categoria}</dd>
                      <dt className="font-semibold">Vigencia</dt>
                      <dd className="tabular">{d.vigencia ?? "Sin indicar"}</dd>
                      <dt className="font-semibold">Formato</dt>
                      <dd>{d.formato}</dd>
                      <dt className="font-semibold">Publicado en</dt>
                      <dd>{d.publicadoEn}</dd>
                    </dl>
                    <EnlaceDocumento documento={d} className="mt-5 w-full" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>

      <section aria-labelledby="logos" className="mt-[var(--section-gap)]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="logos" className="text-head lg:col-span-7">
              Logos e insignias
            </h2>
            <p className="max-w-[48ch] text-muted lg:col-span-5">
              Archivos originales para actividades, presentaciones y documentos del liceo. Úselos sin cambiar sus colores
              ni sus proporciones.
            </p>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {logosDescargables.map((l) => (
              <li key={l.logo.src}>
                <div
                  className={`flex aspect-[4/3] items-center justify-center p-8 chamfer ${l.fondoOscuro ? "bg-ink" : "bg-surface"}`}
                >
                  <Image
                    src={l.logo.src}
                    alt={l.logo.alt}
                    width={l.logo.ancho}
                    height={l.logo.alto}
                    className="max-h-full w-auto max-w-full object-contain"
                    unoptimized={l.formato === "SVG"}
                  />
                </div>
                <p className="mt-4 font-extrabold tracking-[-0.01em]">{l.nombre}</p>
                <p className="mt-1 text-small text-muted">
                  {l.detalle} {l.formato}.
                </p>
                <a href={l.logo.src} download className="btn btn-ink mt-4">
                  <Download aria-hidden className="size-4" />
                  Descargar
                  <span className="sr-only"> el logo de {l.nombre} ({l.formato})</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="overflow-hidden chamfer chamfer-lg lg:col-span-8">
              <Image
                src={fondoPantalla.src}
                alt={fondoPantalla.alt}
                width={fondoPantalla.ancho}
                height={fondoPantalla.alto}
                sizes="(min-width: 1024px) 60vw, 100vw"
                quality={90}
                className="h-auto w-full"
              />
            </div>
            <div className="lg:col-span-4">
              <h3 className="text-lead font-extrabold tracking-[-0.02em]">Fondo de pantalla</h3>
              <p className="mt-2 max-w-[40ch] text-small text-muted">
                Para el computador o para proyectar en actividades del liceo. JPG, {fondoPantalla.ancho} × {fondoPantalla.alto}{" "}
                píxeles.
              </p>
              <a href={fondoPantalla.src} download className="btn btn-ink mt-4">
                <Download aria-hidden className="size-4" />
                Descargar
                <span className="sr-only"> el fondo de pantalla (JPG)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="plantillas" className="mt-[var(--section-gap)]">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="plantillas" className="text-head">
              Plantillas
            </h2>
            <p className="mt-6 max-w-[40ch] text-muted">
              Documentos y presentaciones con el membrete del liceo, listos para informes, comunicaciones y exposiciones.
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {plantillas.map((p) => (
              <li key={p.url} className="flex flex-col gap-4 bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
                {/* Programa con que se abre, en el color de cada uno (Word azul, PowerPoint naranjo rojizo). */}
                <span
                  aria-hidden
                  className={`w-20 flex-none text-[1.75rem] font-extrabold leading-none tracking-[-0.03em] ${
                    p.formato.startsWith("Word") ? "text-[#2b579a]" : "text-[#c43e1c]"
                  }`}
                >
                  {p.formato.startsWith("Word") ? "Word" : "PPT"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold tracking-[-0.01em]">{p.titulo}</p>
                  <p className="mt-1 text-small text-muted">{p.descripcion} {p.formato}.</p>
                </div>
                <a href={p.url} download className="btn btn-ink self-start sm:self-center">
                  <Download aria-hidden className="size-4" />
                  Descargar
                  <span className="sr-only"> la plantilla {p.titulo} ({p.formato})</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="pendientes" className="mt-[var(--section-gap)]">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="pendientes" className="text-head">
              Pendientes de publicar
            </h2>
          </div>
          <div className="bg-surface lg:col-span-7">
            <Pendiente className="max-w-none">
              El liceo debe entregar estos documentos para publicarlos aquí.
            </Pendiente>
            <ul className="space-y-3 px-4 pb-6 pt-2">
              {documentosPendientes.map((titulo) => (
                <li key={titulo} className="flex items-baseline gap-3">
                  <span aria-hidden className="bullet text-muted" />
                  {titulo}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="que-se-publica" className="mt-[var(--section-gap)]">
        <Container>
          <h2 id="que-se-publica" className="max-w-[20ch] text-head">
            Qué se publica en este sitio
          </h2>
          <div className="prose-liceo mt-8">
            <p>
              Aquí solo se publican documentos oficiales de carácter público. No se publican documentos internos ni
              documentos que contengan datos personales de estudiantes, apoderados o funcionarios.
            </p>
            <p>
              Si necesita un certificado, un documento propio o de su pupilo, o un documento que no aparece en esta
              página, solicítelo directamente al liceo por la página de <Link href="/contacto">contacto</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
