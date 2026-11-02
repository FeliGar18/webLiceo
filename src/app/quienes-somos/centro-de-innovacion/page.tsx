import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { FUENTE_RESENA, campus, hitos } from "@/content/institucion";
import { logoCentroInnovacion } from "@/content/marca";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Centro de Innovación",
  descripcion:
    "Centro de Innovación del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi: el espacio del liceo dedicado a la innovación y la tecnología.",
  ruta: "/quienes-somos/centro-de-innovacion",
});

/** Hitos de la reseña que hablan de innovación y tecnología (FUENTE_RESENA). */
const hitosInnovacion = hitos.filter((h) => ["2019", "2020–2021", "2024"].includes(h.anio));

const otrosLaboratorios = campus.laboratorios.filter((l) => l !== "Centro de Innovación");

export default function CentroInnovacionPage() {
  return (
    <>
      <Encabezado
        titulo="Centro de Innovación"
        migas={[
          { etiqueta: "Quiénes somos", href: "/quienes-somos" },
          { etiqueta: "Centro de Innovación", href: "/quienes-somos/centro-de-innovacion" },
        ]}
        colorFondo="var(--ink)"
        colorTinta="var(--bg)"
        bajada={
          <p>
            El espacio del liceo dedicado a la innovación y la tecnología, el eje del proyecto con el que ingresó a los
            Liceos Bicentenario.
          </p>
        }
        aparte={
          logoCentroInnovacion ? (
            <Image
              src={logoCentroInnovacion.src}
              alt={logoCentroInnovacion.alt}
              width={logoCentroInnovacion.ancho}
              height={logoCentroInnovacion.alto}
              sizes="(min-width: 1024px) 22rem, 16rem"
              className="h-auto w-64 lg:ml-auto lg:w-[22rem]"
            />
          ) : null
        }
      />

      <Container as="section" aria-labelledby="que-es" className="mt-[calc(var(--section-gap)/2)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <TituloSeccion id="que-es" className="lg:col-span-5">
            Qué es
          </TituloSeccion>
          <div className="prose-liceo reveal space-y-6 lg:col-span-7">
            <p>
              Es uno de los laboratorios del campus, junto a {otrosLaboratorios.slice(0, -1).join(", ")} y{" "}
              {otrosLaboratorios.at(-1)}. Entre 2020 y 2021 el liceo implementó el Taller Multisectorial de
              Innovación y Tecnología, parte del programa Liceos Bicentenario.
            </p>
            <Pendiente>
              Pendiente de entrega por el liceo: qué se hace en el centro, su equipamiento, quiénes lo usan y fotografías
              del espacio.
            </Pendiente>
          </div>
        </div>
      </Container>

      <Container as="section" aria-labelledby="trayectoria" className="mt-[var(--section-gap)]">
        <div className="grid gap-8 bg-surface p-[clamp(1.5rem,1rem+3vw,4rem)] lg:grid-cols-12">
          <TituloSeccion id="trayectoria" className="lg:col-span-5">
            Innovación en la historia del liceo
          </TituloSeccion>
          <ol className="space-y-8 lg:col-span-7">
            {hitosInnovacion.map((h) => (
              <li key={h.anio} className="reveal grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="text-lead font-extrabold tabular tracking-[-0.02em] text-accent">{h.anio}</p>
                <p className="max-w-[60ch]">{h.texto}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 text-small text-muted">Fuente: {FUENTE_RESENA}.</p>
      </Container>

      <Container as="section" aria-labelledby="mas" className="mt-[var(--section-gap)]">
        <TituloSeccion id="mas">Ver también</TituloSeccion>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/proyectos" className="btn btn-primary">
            Proyectos y actividades
            <ArrowRight aria-hidden className="flecha size-5" />
          </Link>
          <Link href="/quienes-somos/historia" className="btn btn-light">
            Historia del liceo
          </Link>
        </div>
      </Container>
    </>
  );
}
