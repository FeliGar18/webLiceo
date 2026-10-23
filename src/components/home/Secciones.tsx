import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Emblema } from "@/components/ui/Emblema";
import { Foto } from "@/components/ui/Foto";
import { MapaGoogle } from "@/components/home/MapaGoogle";
import { Pendiente } from "@/components/ui/Pendiente";
import { documentos } from "@/content/documentos";
import { especialidades } from "@/content/especialidades";
import { imagenes } from "@/content/imagenes";
import { institucion, URL_PEI } from "@/content/institucion";
import { proyectos } from "@/content/proyectos";

export function ListaEspecialidades() {
  return (
    <section aria-labelledby="especialidades" className="pt-[var(--section-gap)]">
      <Container>
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="especialidades" className="reveal text-head">
            Cinco especialidades
          </h2>
          <Link href="/especialidades" className="hidden font-semibold text-accent underline sm:inline">
            Ver todas
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {especialidades.map((e, i) => (
            <li key={e.slug} className={`reveal ${i % 2 ? "reveal-2" : ""}`}>
              <Link href={`/especialidades/${e.slug}`} className="group flex gap-5 text-ink no-underline">
                <span className="relative size-16 flex-none overflow-hidden chamfer [--chamfer:0.6rem] sm:size-20">
                  <Image src={e.imagen.src} alt="" fill sizes="80px" className="zoom-img object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-[1.1875rem] font-extrabold leading-tight tracking-[-0.02em] group-hover:underline">
                      {e.nombre}
                    </span>
                    <Emblema emblema={e.emblema} className="size-5 flex-none" />
                  </span>
                  <span className="mt-1 block text-small font-semibold text-muted">Sector {e.sector}</span>
                  <span className="mt-2 block max-w-[46ch] text-[0.9375rem] leading-normal">{e.resumen.texto}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-small text-muted">
          Las descripciones son provisionales hasta su validación por cada especialidad.
        </p>
      </Container>
    </section>
  );
}

export function Proyectos() {
  const taller = imagenes.taller();
  return (
    <section aria-labelledby="proyectos" className="pt-[var(--section-gap)]">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <h2 id="proyectos" className="reveal text-head">
            Innovación y proyectos
          </h2>
          <ul className="mt-10 space-y-8">
            {proyectos.map((p) => (
              <li key={p.slug} className="reveal reveal-2 flex gap-4">
                <span className="bullet mt-2 text-accent" aria-hidden />
                <span>
                  <span className="block text-small font-semibold text-muted">{p.periodo}</span>
                  <span className="block text-[1.25rem] font-extrabold leading-tight tracking-[-0.02em]">{p.titulo}</span>
                  <span className="mt-1 block max-w-[46ch]">{p.descripcion}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/proyectos" className="reveal btn btn-ink mt-10">
            Proyectos y actividades
            <ArrowRight aria-hidden className="flecha size-4" />
          </Link>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="relative">
            <div aria-hidden className="absolute -right-[var(--gutter)] top-[12%] h-[76%] w-[70%] chamfer chamfer-lg" style={{ background: "var(--esp-metalicas)" }} />
            <Foto imagen={taller} forma="chamfer chamfer-lg" aspecto="aspect-[5/4]" className="relative w-[88%]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Accesos() {
  const grupos = [
    {
      titulo: "Estudiantes",
      enlaces: [
        { etiqueta: "Reglamento interno y de convivencia", href: "/documentos" },
        { etiqueta: "Especialidades y planes de estudio", href: "/especialidades" },
        { etiqueta: "Noticias y actividades", href: "/noticias" },
      ],
    },
    {
      titulo: "Apoderados",
      enlaces: [
        { etiqueta: "Admisión y postulación", href: "/admision" },
        { etiqueta: "Documentos y reglamentos", href: "/documentos" },
        { etiqueta: "Contacto con el liceo", href: "/contacto" },
      ],
    },
  ];
  return (
    <section aria-labelledby="accesos" className="pt-[var(--section-gap)]">
      <Container>
        <h2 id="accesos" className="reveal text-head">
          Para estudiantes y apoderados
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {grupos.map((g) => (
            <div key={g.titulo} className="reveal reveal-2">
              <h3 className="text-lead">{g.titulo}</h3>
              <ul className="mt-5">
                {g.enlaces.map((e) => (
                  <li key={e.etiqueta}>
                    <Link
                      href={e.href}
                      className="fila-mueve group flex min-h-14 items-center justify-between gap-4 bg-surface px-5 text-ink no-underline hover:bg-surface-strong [&:not(:first-child)]:mt-2"
                    >
                      <span className="font-semibold">{e.etiqueta}</span>
                      <ArrowRight aria-hidden className="flecha size-5 flex-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Pendiente className="mt-8">
          Plataformas de notas, comunicaciones y aula virtual: el liceo publicará aquí sus enlaces oficiales.
        </Pendiente>
      </Container>
    </section>
  );
}

export function Recursos() {
  return (
    <section aria-labelledby="documentos" className="pt-[var(--section-gap)]">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="documentos" className="reveal text-head">
            Documentos
          </h2>
          <p className="reveal reveal-2 mt-5 max-w-[34ch] text-muted">
            Documentos oficiales vigentes, publicados en el Sistema de Admisión Escolar.
          </p>
        </div>
        <ul className="space-y-3 lg:col-span-8">
          {documentos.map((d) => (
            <li key={d.id} className="reveal">
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fila-mueve group flex items-start gap-5 bg-surface px-5 py-6 text-ink no-underline hover:bg-surface-strong sm:px-8"
              >
                <FileText aria-hidden className="mt-1 size-6 flex-none text-accent" />
                <span className="flex-1">
                  <span className="block text-[1.25rem] font-extrabold leading-tight tracking-[-0.02em] group-hover:underline">
                    {d.titulo}
                  </span>
                  <span className="mt-1 block text-small font-semibold text-muted">
                    {d.formato} · {d.vigencia}
                  </span>
                  <span className="mt-2 block max-w-[56ch]">{d.descripcion}</span>
                </span>
                <ArrowUpRight aria-hidden className="flecha flecha-diagonal mt-1 size-5 flex-none" />
                <span className="sr-only">(PDF, abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
          <li>
            <Link href="/documentos" className="btn btn-ink mt-5">
              Documentos y reglamentos
              <ArrowRight aria-hidden className="flecha size-4" />
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}

export function Ubicacion() {
  return (
    <section aria-labelledby="ubicacion" className="pt-[var(--section-gap)]">
      <Container className="grid items-end gap-10 lg:grid-cols-12">
        <MapaGoogle
          latitud={institucion.coordenadas.latitud}
          longitud={institucion.coordenadas.longitud}
          comoLlegarUrl={institucion.comoLlegarUrl}
          className="lg:col-span-7"
        />
        <div className="lg:col-span-5">
          <h2 id="ubicacion" className="reveal text-head">
            Dónde estamos
          </h2>
          <p className="reveal reveal-2 mt-6 flex gap-3 text-lead leading-snug">
            <MapPin aria-hidden className="mt-1 size-6 flex-none text-accent" />
            {institucion.direccion.valor}, {institucion.region}.
          </p>
          <div className="reveal reveal-3 mt-8 flex flex-wrap gap-3">
            <a href={institucion.comoLlegarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Cómo llegar
              <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-4" />
              <span className="sr-only">(abre en una pestaña nueva)</span>
            </a>
            <Link href="/contacto" className="btn btn-ink">
              Contacto
            </Link>
          </div>
          <p className="mt-8 text-small text-muted">
            Proyecto Educativo Institucional:{" "}
            <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent">
              descargar PDF
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
