import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { EtiquetaProvisional } from "@/components/ui/Pendiente";
import { especialidades } from "@/content/especialidades";
import { FUENTE_PEI, FUENTE_RIE, URL_PEI, institucion, identidadSna } from "@/content/institucion";
import { logoLiceo } from "@/content/marca";
import type { Verificacion } from "@/lib/types";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Quiénes somos",
  descripcion:
    "Identidad del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi: liceo técnico-profesional de La Unión, de 1° a 4° medio, con régimen interno y externo.",
  ruta: "/quienes-somos",
});

type Fila = { termino: string; valor: ReactNode; estado?: Verificacion };

const filas: Fila[] = [
  { termino: "Tipo de establecimiento", valor: institucion.tipo },
  { termino: "Niveles", valor: institucion.niveles.valor, estado: institucion.niveles.estado },
  { termino: "Régimen", valor: institucion.regimen.valor, estado: institucion.regimen.estado },
  {
    termino: "Liceo Bicentenario",
    valor: institucion.liceoBicentenario.valor,
    estado: institucion.liceoBicentenario.estado,
  },
  { termino: "Dependencia", valor: institucion.dependencia.valor, estado: institucion.dependencia.estado },
  {
    termino: "Sostenedor",
    valor: (
      <a
        href={institucion.sostenedor.sitio}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent underline"
      >
        {institucion.sostenedor.nombre}
        <span className="sr-only"> (abre en una pestaña nueva)</span>
      </a>
    ),
  },
  { termino: "RBD", valor: <span className="tabular">{institucion.rbd.valor}</span>, estado: institucion.rbd.estado },
  { termino: "Dirección", valor: institucion.direccion.valor, estado: institucion.direccion.estado },
  ...institucion.telefonos.map((t) => ({
    termino: "Teléfono",
    valor: <span className="tabular">{t.valor}</span>,
    estado: t.estado,
  })),
];

const subpaginas = [
  {
    href: "/quienes-somos/historia",
    titulo: "Historia",
    texto: "De la fundación de 1994 al programa Liceos Bicentenario.",
  },
  {
    href: "/quienes-somos/proyecto-educativo",
    titulo: "Proyecto educativo",
    texto: "Visión, misión, valores y perfil del egresado.",
  },
  {
    href: "/quienes-somos/comunidad",
    titulo: "Comunidad educativa",
    texto: "Equipo directivo, docentes, asistentes, estudiantes y apoderados.",
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      <Encabezado
        titulo="Quiénes somos"
        migas={[{ etiqueta: "Quiénes somos", href: "/quienes-somos" }]}
        bajada={
          <p>
            Un liceo técnico-profesional de {institucion.comuna}, en la {institucion.region}, que forma en{" "}
            {especialidades.length} especialidades industriales.
          </p>
        }
        aparte={
          logoLiceo ? (
            <Image
              src={logoLiceo.src}
              alt={logoLiceo.alt}
              width={logoLiceo.ancho}
              height={logoLiceo.alto}
              sizes="(min-width: 1024px) 14rem, 9rem"
              className="h-auto w-36 lg:ml-auto lg:w-56"
            />
          ) : null
        }
      />

      <Container as="section" aria-labelledby="identidad" className="mt-[calc(var(--section-gap)/2)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <TituloSeccion id="identidad">Identidad</TituloSeccion>
            <p className="mt-6 max-w-[36ch] text-muted">
              Datos tomados del {FUENTE_PEI} y del {FUENTE_RIE}.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {filas.map((f, i) => (
              <div key={`${f.termino}-${i}`} className={i < 2 ? "reveal" : undefined}>
                <dt className="text-small font-semibold text-muted">{f.termino}</dt>
                <dd className="mt-1 text-lead font-semibold leading-snug tracking-[-0.015em]">
                  {f.valor}
                  {f.estado === "por-confirmar" ? (
                    <span className="ml-2 align-middle">
                      <EtiquetaProvisional>Por confirmar</EtiquetaProvisional>
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <Container as="section" aria-labelledby="sello" className="mt-[var(--section-gap)]">
        <div className="grid gap-8 bg-surface p-[clamp(1.5rem,1rem+3vw,4rem)] lg:grid-cols-12">
          <TituloSeccion id="sello" className="lg:col-span-6">
            Misión y visión
          </TituloSeccion>
          <div className="reveal space-y-6 lg:col-span-6">
            <p className="max-w-[60ch] text-lead leading-snug">{identidadSna.mision}</p>
            <p className="max-w-[60ch] text-muted">
              Misión de SNA Educa, la red a la que pertenece el liceo. Su visión, valores y perfil del egresado están
              en el proyecto educativo.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Leer el PEI (PDF)
                <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5" />
                <span className="sr-only">(abre en una pestaña nueva)</span>
              </a>
              <Link href="/quienes-somos/proyecto-educativo" className="btn btn-light">
                Sobre el proyecto educativo
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <section aria-labelledby="conozca" className="on-dark mt-[var(--section-gap)] bg-accent py-16 text-accent-ink sm:py-24">
        <Container>
          <TituloSeccion id="conozca">Conozca más del liceo</TituloSeccion>
          <ul className="mt-10 sm:mt-14">
            {subpaginas.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group grid min-h-11 gap-x-10 gap-y-2 py-5 text-accent-ink no-underline sm:grid-cols-12 sm:items-baseline"
                >
                  <span className="flex items-center gap-4 text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.035em] sm:col-span-6">
                    {s.titulo}
                    <ArrowRight
                      aria-hidden
                      className="flecha size-[0.7em] flex-none transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-2"
                    />
                  </span>
                  <span className="max-w-[48ch] text-body sm:col-span-6">{s.texto}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
