import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Hammer,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Emblema } from "@/components/ui/Emblema";
import { Encabezado } from "@/components/ui/Encabezado";
import { Foto } from "@/components/ui/Foto";
import { EtiquetaProvisional, Pendiente } from "@/components/ui/Pendiente";
import { especialidades, getEspecialidad } from "@/content/especialidades";
import { URL_PEI } from "@/content/institucion";
import type { Contenido, Enlace } from "@/lib/types";
import { crearMetadata } from "@/lib/seo";

// Con Cache Components no está disponible `dynamicParams`: los slugs que no
// existen se resuelven con notFound().
export function generateStaticParams() {
  return especialidades.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/especialidades/[slug]">) {
  const { slug } = await params;
  const especialidad = getEspecialidad(slug);
  if (!especialidad) notFound();
  return crearMetadata({
    titulo: especialidad.nombre,
    descripcion: `Especialidad técnico-profesional de ${especialidad.nombre}, sector ${especialidad.sector}: plan de estudio, título, talleres y logros en el Liceo Industrial Ricardo Fenner Ruedi de La Unión.`,
    ruta: `/especialidades/${especialidad.slug}`,
    imagen: especialidad.imagen.src,
  });
}

/** Cuadro achaflanado con un icono, en el color de la especialidad. */
function Icono({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      aria-hidden
      className="flex size-12 flex-none items-center justify-center chamfer [--chamfer:0.55rem]"
      style={{ background: `var(--${color})`, color: `var(--${color}-ink)` }}
    >
      {children}
    </span>
  );
}

function Lista({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3">
          <span aria-hidden className="bullet flex-none" style={{ color: `var(--${color})` }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ListaContenido({ contenido, color }: { contenido: Contenido<string[]>; color: string }) {
  if (contenido.estado === "pendiente") return <Pendiente>{contenido.nota}</Pendiente>;
  return <Lista items={contenido.valor} color={color} />;
}

function EnlaceFila({ enlace }: { enlace: Enlace }) {
  const clase =
    "fila-mueve group flex min-h-11 items-center justify-between gap-6 bg-bg px-5 py-5 font-semibold text-ink no-underline hover:bg-surface-strong sm:px-6";
  if (enlace.externo) {
    return (
      <a href={enlace.href} target="_blank" rel="noopener noreferrer" className={clase}>
        <span>{enlace.etiqueta}</span>
        <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5 flex-none" />
        <span className="sr-only">(abre en una pestaña nueva)</span>
      </a>
    );
  }
  return (
    <Link href={enlace.href} className={clase}>
      <span>{enlace.etiqueta}</span>
      <ArrowRight aria-hidden className="flecha size-5 flex-none" />
    </Link>
  );
}

export default async function EspecialidadPage({ params }: PageProps<"/especialidades/[slug]">) {
  const { slug } = await params;
  const especialidad = getEspecialidad(slug);
  if (!especialidad) notFound();

  const { color } = especialidad;
  const fondo = `var(--${color})`;
  const tinta = `var(--${color}-ink)`;

  const indice = especialidades.findIndex((e) => e.slug === especialidad.slug);
  const total = especialidades.length;
  const anterior = especialidades[(indice - 1 + total) % total];
  const siguiente = especialidades[(indice + 1) % total];

  const enlaces: Enlace[] = [
    ...especialidad.enlaces,
    { etiqueta: "Admisión: cómo postular", href: "/admision" },
    { etiqueta: "Proyecto Educativo Institucional y planes de estudio (PDF)", href: URL_PEI, externo: true },
    { etiqueta: "Contacto", href: "/contacto" },
  ];

  // Dentro de un campo de color, el foco y la selección usan la tinta de la especialidad.
  const campo = { "--accent": tinta, "--accent-ink": fondo } as CSSProperties;
  const iconoClase = "size-6";

  const seccionModulos = (
    <section aria-labelledby="plan" className="bg-surface p-7 chamfer chamfer-lg sm:p-10">
      <Icono color={color}>
        <BookOpen className={iconoClase} />
      </Icono>
      <h2 id="plan" className="mt-8 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
        Módulos de la especialidad
      </h2>
      <div className="mt-6">
        <Lista items={especialidad.plan.modulos} color={color} />
      </div>
      <p className="mt-8 text-small text-muted">
        Formación diferenciada según el plan de estudio vigente ({especialidad.plan.resolucion}), publicado en el{" "}
        <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">
          Proyecto Educativo Institucional
        </a>
        . Algunos módulos pueden ser electivos.
      </p>
    </section>
  );
  const seccionAreas = (
    <section aria-labelledby="areas" className="bg-surface p-7 chamfer chamfer-lg sm:p-10">
      <Icono color={color}>
        <BookOpen className={iconoClase} />
      </Icono>
      <h2 id="areas" className="mt-8 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
        Áreas de aprendizaje
      </h2>
      <div className="mt-6">
        <ListaContenido contenido={especialidad.areaFormativa} color={color} />
      </div>
    </section>
  );
  const seccionCampo = (
    <section aria-labelledby="campo-laboral" className="bg-surface p-7 chamfer chamfer-lg sm:p-10">
      <Icono color={color}>
        <Briefcase className={iconoClase} />
      </Icono>
      <h2 id="campo-laboral" className="mt-8 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
        Campo laboral
      </h2>
      <div className="mt-6">
        <ListaContenido contenido={especialidad.campoLaboral} color={color} />
      </div>
    </section>
  );
  const seccionPerfil = (
    <section aria-labelledby="perfil-egreso" className="bg-surface p-7 chamfer chamfer-lg sm:p-10">
      <Icono color={color}>
        <GraduationCap className={iconoClase} />
      </Icono>
      <h2 id="perfil-egreso" className="mt-8 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
        Perfil de egreso
      </h2>
      <div className="mt-6">
        <ListaContenido contenido={especialidad.perfilEgreso} color={color} />
      </div>
    </section>
  );


  return (
    <>
      <div style={campo}>
        <Encabezado
          titulo={especialidad.nombreCorto}
          colorFondo={fondo}
          colorTinta={tinta}
          migas={[
            { etiqueta: "Especialidades", href: "/especialidades" },
            { etiqueta: especialidad.nombreCorto, href: `/especialidades/${especialidad.slug}` },
          ]}
          bajada={
            <p className="font-semibold">
              {especialidad.nombre !== especialidad.nombreCorto ? `${especialidad.nombre} · ` : null}
              Especialidad técnico-profesional · Sector {especialidad.sector}
            </p>
          }
          aparte={<Emblema emblema={especialidad.emblema} className="size-28 sm:size-40 lg:ml-auto lg:size-56" />}
        />
      </div>

      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[clamp(4rem,12vw,12rem)]" style={{ background: fondo }} />
        <Container className="relative">
          <Foto
            imagen={especialidad.imagen}
            forma="chamfer chamfer-lg"
            prioridad
            aspecto="aspect-[4/3] sm:aspect-[21/9]"
            sizes="(min-width: 1440px) 88rem, 100vw"
          />
        </Container>
      </div>

      {/* Descripción y título que otorga */}
      <Container className="mt-[var(--section-gap)] grid gap-6 lg:grid-cols-12">
        <section aria-labelledby="descripcion" className="bg-surface p-7 chamfer chamfer-lg sm:p-10 lg:col-span-7">
          <h2 id="descripcion" className="text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]">
            Descripción de la especialidad
          </h2>
          {especialidad.descripcion ? (
            especialidad.descripcion.map((parrafo, i) => (
              <p key={i} className={`max-w-[60ch] ${i === 0 ? "mt-6 text-lead leading-snug" : "mt-5"}`}>
                {parrafo}
              </p>
            ))
          ) : (
            <>
              <p className="mt-6 max-w-[60ch] text-lead leading-snug">{especialidad.resumen.texto}</p>
              {especialidad.resumen.validado ? null : (
                <p className="mt-3">
                  <EtiquetaProvisional />
                </p>
              )}
              <p className="mt-6 max-w-[60ch]">
                La formación diferenciada se desarrolla en talleres y laboratorios del liceo, con un plan de estudio
                organizado en módulos. Al egresar y aprobar la práctica profesional, el estudiante obtiene el título de
                técnico de nivel medio.
              </p>
            </>
          )}
        </section>

        <section
          aria-labelledby="titulo"
          className="flex flex-col p-7 chamfer chamfer-lg sm:p-10 lg:col-span-5"
          style={{ ...campo, background: fondo, color: tinta }}
        >
          <Award aria-hidden className="size-10" />
          <h2 id="titulo" className="mt-8 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
            Título que otorga
          </h2>
          <p className="mt-5 text-lead font-extrabold leading-tight tracking-[-0.02em]">{especialidad.titulo}</p>
          <p className="mt-auto pt-8 text-small font-semibold">
            {especialidad.tituloNota ?? "Lo otorga el Ministerio de Educación al aprobar la práctica profesional."}
          </p>
        </section>
      </Container>

      {/* Áreas de aprendizaje, campo laboral, módulos y perfil de egreso */}
      {especialidad.areaFormativa.estado === "validado" ? (
        // Con áreas de aprendizaje: áreas | campo laboral, y debajo módulos | perfil de egreso.
        <Container className="mt-6 grid gap-6 lg:grid-cols-2">
          {seccionAreas}
          {seccionCampo}
          {seccionModulos}
          {seccionPerfil}
        </Container>
      ) : (
        <Container className="mt-6 grid gap-6 lg:grid-cols-2">
          {seccionModulos}
          <div className="grid gap-6">
            {seccionCampo}
            {seccionPerfil}
          </div>
        </Container>
      )}

      {/* Infraestructura y equipamiento */}
      <section aria-labelledby="infraestructura" className="mt-[var(--section-gap)] bg-ink py-20 text-bg on-dark sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="infraestructura" className="text-head lg:col-span-6">
              Infraestructura y equipamiento
            </h2>
            <p className="max-w-[52ch] text-[#e4dfe2] lg:col-span-6">
              {especialidad.infraestructuraTexto ??
                "El liceo cuenta con cinco talleres de especialidad y ocho laboratorios, además de internado, gimnasio y centro de recursos para el aprendizaje, según su Proyecto Educativo Institucional."}
            </p>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {especialidad.espacios.map((espacio, i) => {
              const IconoEspacio = i === 0 ? Hammer : espacio.nombre.startsWith("Taller") ? Lightbulb : FlaskConical;
              return (
                <li key={espacio.nombre} className="bg-[#2a2629] p-7 chamfer chamfer-lg sm:p-8">
                  <Icono color={color}>
                    <IconoEspacio className={iconoClase} />
                  </Icono>
                  <h3 className="mt-7 text-lead leading-tight tracking-[-0.02em]">{espacio.nombre}</h3>
                  <p className="mt-3 text-[#e4dfe2]">{espacio.detalle}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Logros */}
      {especialidad.logros.length > 0 ? (
        <Container as="section" aria-labelledby="logros" className="mt-[var(--section-gap)] grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Icono color={color}>
              <Trophy className={iconoClase} />
            </Icono>
            <h2 id="logros" className="mt-8 text-head">
              Logros y experiencias
            </h2>
            <p className="mt-5 max-w-[34ch] text-muted">
              Competencias, pasantías y salidas técnicas registradas en el Proyecto Educativo Institucional.
            </p>
          </div>
          <ol className="space-y-3 lg:col-span-8">
            {especialidad.logros.map((logro) => (
              <li key={logro.texto} className="grid gap-2 bg-surface px-6 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8 sm:px-8">
                <span className="tabular text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-extrabold leading-none tracking-[-0.03em]">
                  {logro.anio}
                </span>
                <span className="max-w-[60ch]">{logro.texto}</span>
              </li>
            ))}
          </ol>
        </Container>
      ) : null}

      {/* Lo que falta publicar */}
      <Container className="mt-[var(--section-gap)] grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="competencias" className="flex gap-5">
          <Icono color={color}>
            <ClipboardCheck className={iconoClase} />
          </Icono>
          <div>
            <h2 id="competencias" className="text-lead leading-tight tracking-[-0.02em]">
              Competencias
            </h2>
            <div className="mt-4">
              <ListaContenido contenido={especialidad.competencias} color={color} />
            </div>
          </div>
        </section>
        <section aria-labelledby="actividades" className="flex gap-5">
          <Icono color={color}>
            <Hammer className={iconoClase} />
          </Icono>
          <div>
            <h2 id="actividades" className="text-lead leading-tight tracking-[-0.02em]">
              Actividades prácticas
            </h2>
            <div className="mt-4">
              <ListaContenido contenido={especialidad.actividadesPracticas} color={color} />
            </div>
          </div>
        </section>
      </Container>

      {especialidad.galeria.length > 0 ? (
        <Container as="section" aria-labelledby="galeria" className="mt-[var(--section-gap)]">
          <h2 id="galeria" className="text-head">
            Galería
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {especialidad.galeria.map((img, i) => (
              <Foto
                key={img.src}
                imagen={img}
                className={i === 0 ? "sm:col-span-2" : ""}
                aspecto={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
                sizes={i === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
              />
            ))}
          </div>
        </Container>
      ) : null}

      <section aria-labelledby="enlaces" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="enlaces" className="text-head lg:col-span-5">
            Para seguir
          </h2>
          <ul className="space-y-2 lg:col-span-7">
            {enlaces.map((e) => (
              <li key={e.href}>
                <EnlaceFila enlace={e} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container as="nav" aria-label="Otras especialidades" className="mt-[calc(var(--section-gap)/2)]">
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            { e: anterior, rotulo: "Anterior", Flecha: ArrowLeft },
            { e: siguiente, rotulo: "Siguiente", Flecha: ArrowRight },
          ].map(({ e, rotulo, Flecha }) => (
            <li key={rotulo}>
              <Link
                href={`/especialidades/${e.slug}`}
                rel={rotulo === "Anterior" ? "prev" : "next"}
                className={`group flex h-full items-center gap-5 bg-surface p-6 text-ink no-underline transition-colors duration-200 hover:bg-surface-strong sm:p-8 ${
                  rotulo === "Siguiente" ? "sm:flex-row-reverse sm:text-right" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="flex size-14 flex-none items-center justify-center chamfer"
                  style={{ background: `var(--${e.color})`, color: `var(--${e.color}-ink)` }}
                >
                  <Emblema emblema={e.emblema} className="size-8" />
                </span>
                <span className="min-w-0">
                  <span
                    className={`flex items-center gap-2 text-small font-semibold text-muted ${
                      rotulo === "Siguiente" ? "sm:justify-end" : ""
                    }`}
                  >
                    {rotulo === "Anterior" ? <Flecha aria-hidden className="size-4" /> : null}
                    {rotulo}
                    {rotulo === "Siguiente" ? <Flecha aria-hidden className="flecha size-4" /> : null}
                  </span>
                  <span className="mt-1 block text-lead font-extrabold leading-tight tracking-[-0.02em]">
                    {e.nombreCorto}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
