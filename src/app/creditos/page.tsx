import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { creditosImagenes } from "@/content/creditos-imagenes";
import { videoPortada } from "@/content/portada";
import { institucion } from "@/content/institucion";
import { logoLiceo, logoSostenedor } from "@/content/marca";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Créditos de imágenes",
  descripcion:
    "Autoría y licencia de las imágenes referenciales usadas en el sitio del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi.",
  ruta: "/creditos",
});

function EnlaceExterno({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-accent underline"
    >
      {children}
      <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-4 flex-none" />
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </a>
  );
}

export default function CreditosPage() {
  const logos = [logoLiceo, logoSostenedor].filter((l) => l !== null);

  return (
    <>
      <Encabezado
        titulo="Créditos de imágenes"
        migas={[{ etiqueta: "Créditos", href: "/creditos" }]}
        bajada="Imágenes referenciales de bancos abiertos; no corresponden al liceo."
      />

      <section aria-labelledby="imagenes">
        <Container>
          <h2 id="imagenes" className="text-head">
            Imágenes referenciales
          </h2>
          <p className="mt-6 max-w-[60ch]">
            Mientras el liceo reúne fotografías propias, el sitio usa imágenes publicadas con licencias abiertas. Cada
            una se rotula como imagen referencial y se acredita aquí con su autor, su licencia y su fuente.
          </p>

          {creditosImagenes.length === 0 ? (
            <Pendiente className="mt-10">El sitio no usa imágenes referenciales por ahora.</Pendiente>
          ) : (
            <ul className="mt-12 space-y-2">
              {creditosImagenes.map((c) => (
                <li key={c.archivo} className="grid gap-5 bg-surface p-4 sm:grid-cols-[12rem_1fr] sm:gap-8 sm:p-5">
                  <div className="chamfer relative aspect-[4/3] w-full overflow-hidden bg-surface-strong sm:w-48">
                    <Image src={c.archivo} alt={c.descripcion} fill sizes="(min-width: 640px) 12rem, 90vw" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lead leading-tight tracking-[-0.02em] [overflow-wrap:anywhere]">{c.titulo}</h3>
                    <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                      <dt className="text-muted">Autor</dt>
                      <dd className="min-w-0 [overflow-wrap:anywhere]">{c.autor}</dd>
                      <dt className="text-muted">Licencia</dt>
                      <dd className="min-w-0">
                        <EnlaceExterno href={c.licenciaUrl}>{c.licencia}</EnlaceExterno>
                      </dd>
                      <dt className="text-muted">Fuente</dt>
                      <dd className="min-w-0">
                        <EnlaceExterno href={c.fuenteUrl}>Ver la obra original</EnlaceExterno>
                      </dd>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {videoPortada?.provisional && videoPortada.credito ? (
            <div className="mt-16">
              <h3 className="text-lead leading-tight tracking-[-0.02em]">Video de la portada</h3>
              <div className="mt-6 grid gap-5 bg-surface p-4 sm:grid-cols-[12rem_1fr] sm:gap-8 sm:p-5">
                <div className="chamfer relative aspect-[16/9] w-full overflow-hidden bg-surface-strong sm:w-48">
                  <Image
                    src={videoPortada.poster}
                    alt={videoPortada.credito.descripcion}
                    fill
                    sizes="(min-width: 640px) 12rem, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lead font-extrabold leading-tight tracking-[-0.02em] [overflow-wrap:anywhere]">
                    {videoPortada.credito.titulo}
                  </p>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                    <dt className="text-muted">Autor</dt>
                    <dd className="min-w-0 [overflow-wrap:anywhere]">{videoPortada.credito.autor}</dd>
                    <dt className="text-muted">Licencia</dt>
                    <dd className="min-w-0">
                      <EnlaceExterno href={videoPortada.credito.licenciaUrl}>{videoPortada.credito.licencia}</EnlaceExterno>
                    </dd>
                    <dt className="text-muted">Fuente</dt>
                    <dd className="min-w-0">
                      <EnlaceExterno href={videoPortada.credito.fuenteUrl}>Ver la obra original</EnlaceExterno>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <section aria-labelledby="logotipos" className="mt-[var(--section-gap)]">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 id="logotipos" className="text-head">
              Logotipos
            </h2>
            <div className="prose-liceo mt-6">
              <p>
                La insignia del liceo pertenece al {institucion.nombreOficial}. El logotipo de SNA Educa pertenece a la{" "}
                {institucion.sostenedor.nombre}.
              </p>
              <p>
                Son marcas de sus titulares. Se muestran desde sus archivos originales, sin alterarlas, y no se pueden
                reutilizar sin su autorización.
              </p>
            </div>
          </div>
          {logos.length > 0 ? (
            <div className="flex flex-wrap items-end gap-6 lg:col-span-6 lg:justify-end">
              {logos.map((l) => (
                <div key={l.src} className="bg-white p-5">
                  <Image src={l.src} alt={l.alt} width={l.ancho} height={l.alto} className="h-36 w-auto sm:h-44" />
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
