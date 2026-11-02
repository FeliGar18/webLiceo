import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { aliados } from "@/content/aliados";

/**
 * Franja de logos de las instituciones con convenios o alianzas, en movimiento
 * continuo (misma animación que la marquesina de especialidades: lineal, se
 * pausa con el puntero y se detiene con movimiento reducido). Sin botón de
 * pausa, a pedido del liceo.
 * Cada logo va en una placa blanca del mismo tamaño para que se lean parejos.
 * La primera copia es la accesible; la segunda solo completa el bucle.
 */
export function LogosAliados() {
  const fila = (oculta: boolean) => (
    <ul aria-hidden={oculta || undefined} className="flex flex-none items-center gap-4 pr-4 sm:gap-6 sm:pr-6">
      {aliados.map((a) => (
        <li
          key={a.logo}
          className="flex h-28 w-52 flex-none flex-col items-center justify-center gap-1.5 bg-white px-5 py-3 chamfer [--chamfer:0.75rem] sm:h-36 sm:w-72"
        >
          <Image
            src={a.logo}
            alt={oculta ? "" : a.nombre}
            width={a.ancho}
            height={a.alto}
            sizes="(min-width: 640px) 256px, 184px"
            className="min-h-0 w-auto max-w-full flex-1 object-contain"
          />
          {a.pais ? (
            <span aria-hidden className="text-small font-semibold leading-none text-[#4a4448]">
              {a.pais}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="aliados" data-sin-rv className="marquesina-zona relative pt-[calc(var(--section-gap)/2)]">
      <Container className="grid gap-4 sm:grid-cols-12 sm:items-end">
        <h2 id="aliados" className="text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] tracking-[-0.03em] sm:col-span-7">
          Convenios y alianzas
        </h2>
        <p className="max-w-[48ch] text-muted sm:col-span-5 sm:justify-self-end">
          Instituciones de educación superior y organizaciones con las que el liceo trabaja para que sus estudiantes
          sigan aprendiendo.{" "}
          <Link href="/quienes-somos/proyecto-educativo#despues" className="inline-flex items-center gap-1 font-semibold text-accent">
            Ver convenios
            <ArrowRight aria-hidden className="flecha size-4" />
          </Link>
        </p>
      </Container>
      <div className="mt-8 overflow-hidden">
        <div className="marquesina">
          {fila(false)}
          {fila(true)}
        </div>
      </div>
    </section>
  );
}
