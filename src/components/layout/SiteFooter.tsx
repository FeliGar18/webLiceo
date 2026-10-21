import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { institucion } from "@/content/institucion";
import { logoLiceo, logoSostenedor } from "@/content/marca";
import { navegacionPie } from "@/content/navegacion";
import { Container } from "@/components/ui/Container";

/**
 * Cierre del sitio: la insignia oficial con el nombre completo, las dos
 * acciones principales y una franja con los colores de las cinco
 * especialidades (los emblemas de la insignia).
 */
const franja = [
  "var(--esp-edificacion)",
  "var(--esp-electricidad)",
  "var(--esp-mecanica)",
  "var(--esp-metalicas)",
  "var(--esp-sanitarias)",
];

export function SiteFooter() {
  return (
    <footer className="mt-[var(--section-gap)] bg-ink pb-10 pt-16 text-bg on-dark">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="flex items-start gap-6 sm:gap-8 lg:col-span-8">
            {logoLiceo ? (
              <Image
                src={logoLiceo.src}
                alt={logoLiceo.alt}
                width={logoLiceo.ancho}
                height={logoLiceo.alto}
                className="h-auto w-20 flex-none sm:w-28"
              />
            ) : null}
            <div>
              <p className="max-w-[22ch] text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
                {institucion.nombreOficial}
              </p>
              <p className="mt-4 max-w-[44ch] text-[#e4dfe2]">
                Educación media técnico-profesional en {institucion.comuna}, {institucion.region}, desde 1996.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link href="/admision" className="btn btn-primary">
              Admisión
              <ArrowRight aria-hidden className="flecha size-4" />
            </Link>
            <Link href="/contacto" className="btn btn-light">
              Contacto
            </Link>
          </div>
        </div>

        <div aria-hidden data-rv-franja className="mt-14 flex h-2 gap-1">
          {franja.map((color) => (
            <span key={color} className="franja-pie flex-1" style={{ background: color }} />
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12">
          {navegacionPie.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo} className="lg:col-span-2">
              <h2 className="text-small font-semibold tracking-normal text-[#c9c3c6]">{grupo.titulo}</h2>
              <ul className="mt-3 space-y-1">
                {grupo.enlaces.map((e) => (
                  <li key={e.href}>
                    <Link href={e.href} className="inline-flex min-h-9 items-center text-[0.9375rem] text-bg no-underline hover:underline">
                      {e.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-4">
            <h2 className="text-small font-semibold tracking-normal text-[#c9c3c6]">Contacto</h2>
            <address className="mt-3 space-y-2 text-[0.9375rem] not-italic">
              <p>{institucion.direccion.valor}</p>
              <p>{institucion.region}, Chile</p>
              {institucion.correos.map((c) => (
                <p key={c.valor}>
                  <span className="text-[#c9c3c6]">{c.etiqueta}: </span>
                  <a href={`mailto:${c.valor}`} className="break-all text-bg">
                    {c.valor}
                  </a>
                </p>
              ))}
            </address>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {institucion.redes.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1 font-semibold text-bg no-underline hover:underline"
                  >
                    {r.etiqueta}
                    <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-4" />
                    <span className="sr-only">(abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 bg-[#2a2629] p-5 sm:flex-row sm:items-center">
          {logoSostenedor ? (
            // PNG transparente: va directo sobre el fondo oscuro, sin recuadro.
            <Image
              src={logoSostenedor.src}
              alt={logoSostenedor.alt}
              width={logoSostenedor.ancho}
              height={logoSostenedor.alto}
              className="h-20 w-auto flex-none"
            />
          ) : null}
          <p className="max-w-[62ch] text-[0.9375rem] text-[#e4dfe2]">
            Establecimiento {institucion.dependencia.valor.toLowerCase()}. Sostenedor:{" "}
            <a href={institucion.sostenedor.sitio} target="_blank" rel="noopener noreferrer" className="text-bg">
              {institucion.sostenedor.nombre}
            </a>
            . RBD {institucion.rbd.valor}.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-small text-[#c9c3c6] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {institucion.nombreOficial}.{" "}
            <Link href="/creditos" className="text-[#e4dfe2]">
              Créditos de imágenes
            </Link>
          </p>
          <a href="#contenido" className="btn btn-light self-start sm:self-auto">
            Volver arriba
          </a>
        </div>
      </Container>
    </footer>
  );
}
