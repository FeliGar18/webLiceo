import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { Foto } from "@/components/ui/Foto";
import { EtiquetaProvisional, Pendiente } from "@/components/ui/Pendiente";
import { formatearFecha } from "@/lib/fechas";
import { institucion, siteUrl } from "@/content/institucion";
import { getNoticia, noticias, noticiasOrdenadas } from "@/content/noticias";
import { crearMetadata, serializarJsonLd } from "@/lib/seo";
import type { Noticia } from "@/lib/types";

export function generateStaticParams() {
  // Con Cache Components debe existir al menos un parámetro: si aún no hay
  // noticias, se usa un marcador que termina en notFound().
  if (noticias.length === 0) return [{ slug: "sin-noticias" }];
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const noticia = getNoticia(slug);
  if (!noticia) return { title: "Noticia no encontrada" };
  return {
    ...crearMetadata({
      titulo: noticia.titulo,
      descripcion: noticia.bajada,
      ruta: `/noticias/${noticia.slug}`,
      imagen: noticia.imagen?.src,
    }),
    // Las noticias de ejemplo no deben aparecer en buscadores.
    ...(noticia.ejemplo ? { robots: { index: false, follow: true } } : {}),
  };
}

function relacionadas(actual: Noticia): Noticia[] {
  const otras = noticiasOrdenadas().filter((n) => n.slug !== actual.slug);
  const misma = otras.filter((n) => n.categoria === actual.categoria);
  const distintas = otras.filter((n) => n.categoria !== actual.categoria);
  return [...misma, ...distintas].slice(0, 2);
}

function jsonLdNoticia(n: Noticia) {
  const url = `${siteUrl()}/noticias/${n.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.titulo,
    description: n.bajada,
    datePublished: n.fecha,
    inLanguage: "es-CL",
    mainEntityOfPage: url,
    url,
    articleSection: n.categoria,
    ...(n.imagen ? { image: [`${siteUrl()}${n.imagen.src}`] } : {}),
    author: { "@type": "Organization", name: institucion.nombreOficial, url: siteUrl() },
    publisher: {
      "@type": "Organization",
      name: institucion.nombreOficial,
      logo: { "@type": "ImageObject", url: `${siteUrl()}/brand/logo-liceo.png` },
    },
  };
}

export default async function NoticiaPage({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const noticia = getNoticia(slug);
  if (!noticia) notFound();

  const otras = relacionadas(noticia);

  return (
    <>
      {noticia.ejemplo ? null : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLdNoticia(noticia)) }}
        />
      )}
      <article>
        <Encabezado
          titulo={noticia.titulo}
          migas={[
            { etiqueta: "Noticias", href: "/noticias" },
            { etiqueta: noticia.titulo, href: `/noticias/${noticia.slug}` },
          ]}
          bajada={
            <>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-body">
                <time dateTime={noticia.fecha} className="tabular font-semibold">
                  {formatearFecha(noticia.fecha)}
                </time>
                <span className="inline-flex items-center gap-2 text-muted">
                  <span aria-hidden className="bullet text-accent" />
                  {noticia.categoria}
                </span>
                {noticia.ejemplo ? <EtiquetaProvisional>Texto de ejemplo</EtiquetaProvisional> : null}
              </p>
              <p className="mt-6">{noticia.bajada}</p>
            </>
          }
        />

        <Container>
          {noticia.ejemplo ? (
            <Pendiente className="mb-10">
              Esta es una noticia de ejemplo para mostrar el diseño del sitio. No describe un hecho real del liceo.
            </Pendiente>
          ) : null}

          {noticia.imagen ? (
            <Foto
              imagen={noticia.imagen}
              forma="chamfer chamfer-lg"
              aspecto="aspect-[16/9]"
              prioridad
              sizes="(min-width: 1440px) 1376px, 100vw"
              className="mb-12 max-w-5xl"
            />
          ) : null}

          <div className="prose-liceo">
            {noticia.cuerpo.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>

          <p className="mt-14">
            <Link href="/noticias" className="btn btn-ink">
              <ArrowLeft aria-hidden className="size-5" />
              Volver a noticias
            </Link>
          </p>
        </Container>
      </article>

      {otras.length > 0 ? (
        <section aria-labelledby="otras-noticias" className="mt-[var(--section-gap)]">
          <Container>
            <h2 id="otras-noticias" className="text-head">
              Otras noticias
            </h2>
            <ul className="mt-10 grid gap-2 md:grid-cols-2">
              {otras.map((n, i) => (
                <li
                  key={n.slug}
                  className={`relative flex flex-col p-6 sm:p-8 ${i === 0 ? "chamfer bg-surface-strong" : "bg-surface"}`}
                >
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small">
                    <time dateTime={n.fecha} className="tabular font-semibold">
                      {formatearFecha(n.fecha)}
                    </time>
                    <span className="text-muted">{n.categoria}</span>
                    {n.ejemplo ? <EtiquetaProvisional>Texto de ejemplo</EtiquetaProvisional> : null}
                  </p>
                  <h3 className="mt-4 max-w-[26ch] text-lead leading-tight tracking-[-0.025em]">
                    <Link
                      href={`/noticias/${n.slug}`}
                      className="text-ink no-underline after:absolute after:inset-0 hover:underline"
                    >
                      {n.titulo}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-muted">{n.bajada}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
