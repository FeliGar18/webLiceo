import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { documentos, documentosPendientes } from "@/content/documentos";
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
