import Link from "next/link";
import { Emblema } from "@/components/ui/Emblema";
import { especialidades } from "@/content/especialidades";
import { PausaMarquesina } from "./PausaMarquesina";

/**
 * Franja con los nombres de las cinco especialidades en movimiento continuo
 * (lineal, se pausa al pasar el puntero y se detiene con movimiento reducido).
 * La primera copia es la accesible; la segunda solo completa el bucle.
 */
export function Marquesina() {
  const fila = (oculta: boolean) => (
    <ul aria-hidden={oculta || undefined} className="flex flex-none items-center">
      {especialidades.map((e) => (
        <li key={e.slug} className="flex items-center">
          <Link
            href={`/especialidades/${e.slug}`}
            tabIndex={oculta ? -1 : undefined}
            className="flex items-center gap-[0.35em] px-[0.6em] py-2 text-ink no-underline transition-colors duration-200 hover:text-accent"
          >
            <span
              className="flex size-[0.9em] items-center justify-center chamfer [--chamfer:0.18em]"
              style={{ background: `var(--${e.color})`, color: `var(--${e.color}-ink)` }}
            >
              <Emblema emblema={e.emblema} className="size-[0.55em]" />
            </span>
            {e.nombreCorto}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Especialidades del liceo" data-sin-rv className="marquesina-zona relative mt-[var(--section-gap)] overflow-hidden bg-surface pb-16 pt-6 sm:pb-16 sm:pt-8">
      <div className="marquesina text-[clamp(2rem,1rem+4.5vw,5rem)] font-extrabold leading-none tracking-[-0.04em]">
        {fila(false)}
        {fila(true)}
      </div>
      <PausaMarquesina />
    </section>
  );
}
