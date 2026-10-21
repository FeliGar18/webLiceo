import { CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EtiquetaProvisional } from "@/components/ui/Pendiente";
import { cifras } from "@/content/cifras";

/**
 * El liceo en cifras, justo debajo del video de la portada.
 * Sin tarjetas: cifras grandes con un check en el color de la insignia,
 * separadas solo por espacio (DESIGN.md).
 */
export function Cifras() {
  return (
    <section aria-labelledby="cifras" className="pt-14 sm:pt-20">
      <Container>
        <h2 id="cifras" className="sr-only">
          El liceo en cifras
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {cifras.map((c) => (
            <li key={c.titulo} className="flex items-start gap-3 sm:gap-4">
              <CircleCheck aria-hidden className="mt-1 size-9 flex-none text-accent sm:size-11" strokeWidth={1.75} />
              <div className="min-w-0">
                {/* Número grande y rótulo debajo: así "profesionales" cabe en 4 columnas. */}
                <p className="leading-none">
                  {c.cifra ? (
                    <span className="block text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] font-extrabold tracking-[-0.04em] tabular">
                      {c.cifra}
                    </span>
                  ) : null}
                  <span
                    className={`block text-lead font-semibold tracking-[-0.02em] first-letter:uppercase ${c.cifra ? "mt-1" : ""}`}
                  >
                    {c.titulo}
                  </span>
                </p>
                {c.cifra ? null : (
                  <p className="mt-2">
                    <EtiquetaProvisional>Cifra por confirmar</EtiquetaProvisional>
                  </p>
                )}
                {c.texto ? <p className="mt-2 max-w-[26ch] text-muted leading-snug">{c.texto}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
