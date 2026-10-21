import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Emblema } from "@/components/ui/Emblema";
import { EtiquetaProvisional } from "@/components/ui/Pendiente";
import { institucion } from "@/content/institucion";
import { noticiasOrdenadas } from "@/content/noticias";
import { formatearFecha } from "@/lib/fechas";
import { obtenerPublicacionesFacebook, type PublicacionFacebook } from "@/lib/facebook";

const MAXIMO = 6;
const LARGO_TITULO = 90;

const facebook = institucion.redes.find((r) => r.etiqueta === "Facebook")!;

const formatoFecha = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Santiago",
});

/** Lo que necesita una tarjeta, venga la noticia del sitio o de Facebook. */
type Tarjeta = {
  clave: string;
  titulo: string;
  resumen: string;
  fechaIso: string;
  fechaTexto: string;
  etiqueta?: string;
  href: string;
  externo: boolean;
  imagen?: { src: string; alt: string };
  ejemplo: boolean;
};

function desdeSitio(): Tarjeta[] {
  return noticiasOrdenadas()
    .slice(0, MAXIMO)
    .map((n) => ({
      clave: n.slug,
      titulo: n.titulo,
      resumen: n.bajada,
      fechaIso: n.fecha,
      fechaTexto: formatearFecha(n.fecha),
      etiqueta: n.categoria,
      href: `/noticias/${n.slug}`,
      externo: false,
      imagen: n.imagen ? { src: n.imagen.src, alt: n.imagen.alt } : undefined,
      ejemplo: n.ejemplo,
    }));
}

/** Una publicación de Facebook no tiene título: se usa su primera línea (recortada) y el resto como resumen. */
function desdeFacebook(p: PublicacionFacebook): Tarjeta {
  const [primera = "", ...resto] = p.texto.split(/\n+/);
  let titulo = primera.trim();
  let resumen = resto.join(" ").trim();
  if (titulo.length > LARGO_TITULO) {
    const corte = titulo.lastIndexOf(" ", LARGO_TITULO);
    resumen = `${titulo.slice(corte + 1)} ${resumen}`.trim();
    titulo = `${titulo.slice(0, corte)}…`;
  }
  return {
    clave: p.id,
    titulo: titulo || "Publicación del liceo",
    resumen,
    fechaIso: p.fecha,
    fechaTexto: formatoFecha.format(new Date(p.fecha)),
    etiqueta: "Facebook",
    href: p.enlace,
    externo: true,
    imagen: p.imagen ? { src: p.imagen, alt: "" } : undefined,
    ejemplo: false,
  };
}

function TarjetaNoticia({ t }: { t: Tarjeta }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface chamfer chamfer-lg">
        {t.imagen ? (
          <Image
            src={t.imagen.src}
            alt={t.imagen.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="zoom-img object-cover"
          />
        ) : (
          // Sin foto: el engranaje de la insignia como marca de agua, no una imagen inventada.
          <div aria-hidden className="flex h-full items-center justify-center text-surface-strong">
            <Emblema emblema="engranaje" className="size-24 transition-transform duration-700 ease-[var(--ease-out)] group-hover:rotate-45" />
          </div>
        )}
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-small">
        <time dateTime={t.fechaIso} className="tabular font-semibold">
          {t.fechaTexto}
        </time>
        {t.etiqueta ? (
          <span className="inline-flex items-center gap-2 text-muted">
            <span aria-hidden className="bullet text-accent" />
            {t.etiqueta}
          </span>
        ) : null}
        {t.ejemplo ? <EtiquetaProvisional>Texto de ejemplo</EtiquetaProvisional> : null}
      </p>

      <h3 className="mt-3 line-clamp-3 text-[clamp(1.2rem,1rem+0.6vw,1.5rem)] font-extrabold leading-tight tracking-[-0.025em]">
        {/* El enlace cubre toda la tarjeta (after:inset-0). */}
        {t.externo ? (
          <a
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink no-underline after:absolute after:inset-0 group-hover:underline"
          >
            {t.titulo}
            <span className="sr-only"> (abre Facebook en una pestaña nueva)</span>
          </a>
        ) : (
          <Link href={t.href} className="text-ink no-underline after:absolute after:inset-0 group-hover:underline">
            {t.titulo}
          </Link>
        )}
      </h3>
      {t.resumen ? <p className="mt-3 line-clamp-3 text-muted">{t.resumen}</p> : null}

      <div aria-hidden className="mt-auto pt-6">
        <span className="btn btn-ink px-4 text-small">
          Leer más
          {t.externo ? (
            <ArrowUpRight className="flecha flecha-diagonal size-4" />
          ) : (
            <ArrowRight className="flecha size-4" />
          )}
        </span>
      </div>
    </article>
  );
}

/**
 * Últimas noticias de la portada, en grilla de hasta seis.
 * Si están configurados FACEBOOK_PAGE_ID y FACEBOOK_PAGE_TOKEN, muestra las
 * publicaciones de la página de Facebook del liceo (src/lib/facebook.ts);
 * si no, las noticias del sitio (src/content/noticias.ts).
 */
export async function NoticiasPortada() {
  const publicaciones = await obtenerPublicacionesFacebook();
  const desdeFb = publicaciones.length > 0;
  const tarjetas = desdeFb ? publicaciones.slice(0, MAXIMO).map(desdeFacebook) : desdeSitio();

  return (
    <section aria-labelledby="noticias" className="pt-[var(--section-gap)]">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="noticias" className="text-head lg:col-span-7">
            Últimas noticias y anuncios
          </h2>
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-[40ch] text-muted">
              Actividades, logros y avisos de la comunidad del liceo
              {desdeFb ? ", tal como se publican en su página de Facebook." : "."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/noticias" className="btn btn-primary">
                Todas las noticias
                <ArrowRight aria-hidden className="flecha size-4" />
              </Link>
              <a href={facebook.href} target="_blank" rel="noopener noreferrer" className="btn bg-surface text-ink hover:bg-surface-strong">
                Facebook
                <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-4" />
                <span className="sr-only">(abre una pestaña nueva)</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {tarjetas.map((t) => (
            <li key={t.clave}>
              <TarjetaNoticia t={t} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
