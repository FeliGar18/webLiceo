import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IndiceEspecialidades } from "@/components/especialidades/IndiceEspecialidades";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { especialidades } from "@/content/especialidades";
import { URL_PEI } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Especialidades",
  descripcion:
    "Especialidades técnico-profesionales del Liceo Industrial Ricardo Fenner Ruedi: Edificación, Electricidad, Mecánica Automotriz, Construcciones Metálicas e Instalaciones Sanitarias.",
  ruta: "/especialidades",
});

const sectores = Array.from(new Set(especialidades.map((e) => e.sector)));

function enumerar(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

export default function EspecialidadesPage() {
  const hayProvisionales = especialidades.some((e) => e.imagen.provisional);

  return (
    <>
      <Encabezado
        titulo="Especialidades"
        migas={[{ etiqueta: "Especialidades", href: "/especialidades" }]}
        bajada={
          <p>
            {especialidades.length} especialidades técnico-profesionales de los sectores {enumerar(sectores)}. Elija
            una para ver su detalle.
          </p>
        }
      />

      <Container>
        <IndiceEspecialidades
          filas={especialidades.map((e) => ({
            slug: e.slug,
            nombre: e.nombre,
            nombreCorto: e.nombreCorto,
            emblema: e.emblema,
            color: e.color,
            sector: e.sector,
            imagen: e.imagen,
            resumen: e.resumen,
          }))}
        />
        {hayProvisionales ? (
          <p className="mt-8 text-small text-muted">
            Las fotografías son referenciales y no corresponden al liceo.{" "}
            <Link href="/creditos" className="font-semibold text-ink">
              Ver créditos
            </Link>
            .
          </p>
        ) : null}
      </Container>

      <section aria-labelledby="planes" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <TituloSeccion id="planes">Planes de estudio y admisión</TituloSeccion>
            <p className="reveal mt-6 max-w-[56ch]">
              Los planes de estudio de cada especialidad están en el Proyecto Educativo Institucional. La postulación
              se hace a través del Sistema de Admisión Escolar.
            </p>
          </div>
          <div className="reveal reveal-2 flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/admision" className="btn btn-primary">
              Cómo postular
            </Link>
            <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Planes de estudio (PEI)
              <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5" />
              <span className="sr-only">(PDF, abre en una pestaña nueva)</span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
