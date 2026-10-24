import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Mail,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { fuenteDotacion, grupos, organizaciones, type IconoGrupo, type Integrante } from "@/content/comunidad";
import { institucion, URL_PEI } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Equipo directivo y comunidad educativa",
  descripcion:
    "Equipo directivo, área administrativa y finanzas, docentes, Programa de Integración Escolar y asistentes de la educación del Liceo Industrial Ricardo Fenner Ruedi de La Unión.",
  ruta: "/quienes-somos/comunidad",
});

const ICONOS: Record<IconoGrupo, LucideIcon> = {
  directivo: Landmark,
  administracion: Calculator,
  docentes: GraduationCap,
  pie: HeartHandshake,
  asistentes: BriefcaseBusiness,
};

function Tarjeta({ persona }: { persona: Integrante }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface chamfer chamfer-lg">
        {persona.foto ? (
          <Image
            src={persona.foto.src}
            alt={persona.foto.alt}
            fill
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="zoom-img object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted">
            <span className="flex size-14 items-center justify-center bg-surface-strong chamfer sm:size-20 [--chamfer:0.7rem] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105">
              <UserRound aria-hidden className="size-7 sm:size-10" strokeWidth={1.5} />
            </span>
            <span className="text-small font-semibold">Foto por publicar</span>
          </div>
        )}
        {persona.cantidad ? (
          <span className="absolute right-2 top-2 bg-accent px-2 py-1 sm:right-4 sm:top-4 sm:px-3 text-small font-semibold text-accent-ink">
            {persona.cantidad} personas
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-[0.9375rem] leading-tight tracking-[-0.02em] hyphens-auto sm:text-[1.25rem]">{persona.cargo}</h3>
        {persona.area ? <p className="mt-1 text-small font-semibold text-muted">{persona.area}</p> : null}
        <p className={`mt-3 text-[0.9375rem] sm:text-body ${persona.nombre ? "font-semibold" : "text-muted"}`}>
          {persona.nombre ?? (persona.cantidad ? "Nombres por publicar" : "Nombre por publicar")}
        </p>
        {persona.correo ? (
          <a
            href={`mailto:${persona.correo}`}
            className="mt-auto flex min-h-11 items-center gap-2 break-all pt-3 text-small font-semibold text-accent underline"
          >
            <Mail aria-hidden className="size-4 flex-none" />
            {persona.correo}
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function ComunidadPage() {
  const correoSecretaria = institucion.correos.find((c) => c.etiqueta === "Secretaría") ?? institucion.correos[0];

  return (
    <>
      <Encabezado
        titulo="Comunidad educativa"
        migas={[
          { etiqueta: "Quiénes somos", href: "/quienes-somos" },
          { etiqueta: "Comunidad educativa", href: "/quienes-somos/comunidad" },
        ]}
        bajada={
          <p>
            Las personas que hacen el liceo, organizadas según la dotación declarada en el Proyecto Educativo
            Institucional. Nombres y fotografías se publican solo con autorización de cada integrante.
          </p>
        }
      />

      <nav aria-label="Grupos de la comunidad" className="sticky top-[4.25rem] z-30 bg-bg/95 py-3">
        <Container>
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {grupos.map((g) => (
              <li key={g.id} className="flex-none">
                <a
                  href={`#${g.id}`}
                  className="flex min-h-11 items-center bg-surface px-4 text-small font-semibold text-ink no-underline transition-colors duration-200 hover:bg-surface-strong"
                >
                  {g.titulo}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {grupos.map((grupo) => {
        const Icono = ICONOS[grupo.icono];
        return (
          <Container
            as="section"
            key={grupo.id}
            aria-labelledby={grupo.id}
            className="mt-[calc(var(--section-gap)*0.6)] scroll-mt-36"
          >
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex size-12 flex-none items-center justify-center bg-accent text-accent-ink chamfer [--chamfer:0.55rem]"
                >
                  <Icono className="size-6" />
                </span>
                <h2 id={grupo.id} className="text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]">
                  {grupo.titulo}
                </h2>
              </div>
              <p className="text-small font-semibold text-muted tabular">{grupo.dotacion}</p>
            </div>
            <p className="mt-4 max-w-[60ch] text-muted">{grupo.descripcion}</p>
            {grupo.destacarPrimero ? (
              <>
                {/* Tarjetas del mismo ancho que en la grilla de 4 columnas de los otros grupos, centradas. */}
                <div className="mx-auto mt-10 w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-4.5rem)/4)]">
                  <Tarjeta persona={grupo.integrantes[0]} />
                </div>
                <ul
                  className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-12 sm:gap-x-6 sm:gap-y-12 ${
                    grupo.integrantes.length - 1 === 3
                      ? "lg:mx-auto lg:max-w-[calc((100%-4.5rem)*3/4+3rem)] lg:grid-cols-3"
                      : "lg:grid-cols-4"
                  }`}
                >
                  {grupo.integrantes.slice(1).map((persona, i) => (
                    <li
                      key={`${persona.cargo}-${i}`}
                      className="last:odd:col-span-2 last:odd:mx-auto last:odd:w-[calc(50%-0.5rem)] sm:last:odd:w-[calc(50%-0.75rem)] lg:last:odd:col-span-1 lg:last:odd:mx-0 lg:last:odd:w-auto"
                    >
                      <Tarjeta persona={persona} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
                {grupo.integrantes.map((persona, i) => (
                  <li key={`${persona.cargo}-${i}`}>
                    <Tarjeta persona={persona} />
                  </li>
                ))}
              </ul>
            )}
          </Container>
        );
      })}

      <p className="mx-auto mt-12 max-w-[90rem] px-[var(--gutter)] text-small text-muted">
        Dotación según el{" "}
        <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">
          {fuenteDotacion}
        </a>
        .
      </p>

      <section aria-labelledby="organizaciones" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container>
          <h2 id="organizaciones" className="text-head">
            Organizaciones de la comunidad
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {organizaciones.map((o) => (
              <li key={o.titulo} className="bg-bg p-7 chamfer chamfer-lg sm:p-8">
                <h3 className="text-lead leading-tight tracking-[-0.02em]">{o.titulo}</h3>
                <p className="mt-3">{o.texto}</p>
                <p className="mt-5 text-small font-semibold text-muted">Integrantes por publicar</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="privacidad" className="bg-ink py-16 text-bg on-dark sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="flex items-start gap-5 lg:col-span-8">
            <ShieldCheck aria-hidden className="mt-1 size-8 flex-none" />
            <div>
              <h2 id="privacidad" className="text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
                Datos y fotografías de la comunidad
              </h2>
              <p className="mt-4 max-w-[60ch] text-[#e4dfe2]">
                El liceo publica nombres y fotografías de funcionarios solo con su autorización, y nunca datos ni
                imágenes de estudiantes sin autorización escrita de su apoderado. Para corregir o retirar información,
                escriba a {correoSecretaria.valor}.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/privacidad" className="btn btn-light">
              Política de privacidad
              <ArrowRight aria-hidden className="flecha size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
