import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { documentos } from "@/content/documentos";
import { URL_PEI } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Proyecto educativo",
  descripcion:
    "Proyecto Educativo Institucional 2025-2026 del Liceo Industrial Ricardo Fenner Ruedi: qué es, dónde descargarlo y qué contiene.",
  ruta: "/quienes-somos/proyecto-educativo",
});

const pei = documentos.find((d) => d.url === URL_PEI);

const apartados = [
  { id: "vision", titulo: "Visión" },
  { id: "mision", titulo: "Misión" },
  { id: "sellos", titulo: "Sellos educativos" },
  { id: "perfil", titulo: "Perfil del estudiante" },
];

function Descarga() {
  return (
    <div className="chamfer on-dark bg-accent p-6 text-accent-ink sm:p-8">
      <FileText aria-hidden className="size-10" />
      <p className="mt-6 text-lead font-extrabold leading-tight tracking-[-0.02em]">
        {pei?.titulo ?? "Proyecto Educativo Institucional"}
      </p>
      <p className="mt-2 text-small">
        {pei?.formato ?? "PDF"}
        {pei?.vigencia ? ` · Vigencia ${pei.vigencia}` : null}
        {pei?.publicadoEn ? ` · Publicado en el ${pei.publicadoEn}` : null}
      </p>
      <a href={URL_PEI} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-8">
        Descargar el PEI
        <ArrowUpRight aria-hidden className="flecha flecha-diagonal size-5" />
        <span className="sr-only">(PDF, abre en una pestaña nueva)</span>
      </a>
    </div>
  );
}

export default function ProyectoEducativoPage() {
  return (
    <>
      <Encabezado
        titulo="Proyecto educativo"
        migas={[
          { etiqueta: "Quiénes somos", href: "/quienes-somos" },
          { etiqueta: "Proyecto educativo", href: "/quienes-somos/proyecto-educativo" },
        ]}
        bajada={<p>El documento que define quiénes somos, qué buscamos y cómo enseñamos.</p>}
        aparte={<Descarga />}
      />

      <Container as="section" aria-labelledby="que-es" className="mt-[calc(var(--section-gap)/2)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <TituloSeccion id="que-es" className="lg:col-span-5">
            Qué es el PEI
          </TituloSeccion>
          <div className="prose-liceo reveal lg:col-span-7">
            <p>
              El Proyecto Educativo Institucional (PEI) es el documento que orienta la vida del liceo. Declara su
              identidad, sus propósitos y la forma en que organiza la enseñanza.
            </p>
            <p>
              El PEI vigente está publicado en el Sistema de Admisión Escolar del Ministerio de Educación. Así,
              cada familia puede conocerlo antes de postular.
            </p>
            {pei ? <p>El PEI del liceo incluye: {pei.descripcion.charAt(0).toLowerCase() + pei.descripcion.slice(1)}</p> : null}
            <p>
              Las normas de convivencia están en el Reglamento Interno, disponible en{" "}
              <Link href="/documentos">Documentos</Link>.
            </p>
          </div>
        </div>
      </Container>

      <section aria-labelledby="identidad" className="mt-[var(--section-gap)] bg-surface py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <TituloSeccion id="identidad" className="lg:col-span-7">
              Visión, misión y sellos
            </TituloSeccion>
            <p className="max-w-[48ch] lg:col-span-5 lg:self-end">
              Estos apartados se publicarán con el texto exacto del PEI. Mientras tanto, puede leerlos en el
              documento oficial.
            </p>
          </div>
          <div className="mt-12 space-y-10 sm:mt-16">
            {apartados.map((a, i) => (
              <section
                key={a.id}
                aria-labelledby={a.id}
                className={`grid gap-4 sm:grid-cols-12 sm:items-baseline ${i < 2 ? "reveal" : ""}`}
              >
                <h3
                  id={a.id}
                  className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] tracking-[-0.03em] sm:col-span-5"
                >
                  {a.titulo}
                </h3>
                <Pendiente className="bg-surface-strong! sm:col-span-7">
                  Pendiente: el liceo transcribirá este apartado desde el PEI 2025-2026.
                </Pendiente>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
