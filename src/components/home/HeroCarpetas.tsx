"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { Emblema } from "@/components/ui/Emblema";
import type { Especialidad } from "@/lib/types";

/** Nombres breves para las pestañas (los nombres oficiales van en el panel). */
const ETIQUETA_PESTANA: Record<string, string> = {
  edificacion: "Edificación",
  electricidad: "Electricidad",
  "mecanica-automotriz": "Mecánica",
  "construcciones-metalicas": "Metálicas",
  "instalaciones-sanitarias": "Sanitarias",
};

/** Posición horizontal de la pestaña de cada carpeta. */
const POSICION_PESTANA = [
  "left-[2%]",
  "left-[22%] sm:left-[21%]",
  "left-[44%] sm:left-[40%]",
  "left-[8%] sm:left-[59%]",
  "left-[38%] sm:left-[77%]",
];

/**
 * Cinco carpetas apiladas, una por especialidad, con la pestaña del color de su
 * emblema en la insignia. Elegir una pestaña trae esa carpeta al frente.
 * Las pestañas son botones de alternancia (aria-pressed) y el contenido de la
 * carpeta del frente se anuncia como una región con nombre.
 */
export function HeroCarpetas({ especialidades }: { especialidades: Especialidad[] }) {
  const [activa, setActiva] = useState(0);
  const baseId = useId();

  // Orden visual: las no elegidas atrás en su orden natural, la elegida al frente.
  const orden = [...especialidades.keys()].filter((i) => i !== activa).concat(activa);

  return (
    <div className="relative mx-auto w-full [--off:3.5rem] sm:w-[92%] sm:[--off:4rem]">
      <h2 className="sr-only">Nuestras cinco especialidades</h2>
      <div className="grid pt-11 sm:pt-12">
        {orden.map((i, slot) => {
          const e = especialidades[i];
          const alFrente = i === activa;
          return (
            <div
              key={e.slug}
              className="intro-carpeta relative col-start-1 row-start-1 transition-transform duration-[420ms] ease-[var(--ease-in-out)] motion-reduce:transition-none"
              style={{
                ["--i" as string]: i,
                transform: `translateY(calc(${slot} * var(--off)))`,
                zIndex: slot + 1,
                background: `var(--${e.color})`,
                color: `var(--${e.color}-ink)`,
                marginBottom: `calc(${slot} * var(--off))`,
              }}
            >
              <div
                className={`tab-shape absolute bottom-full h-11 sm:h-12 ${POSICION_PESTANA[i]}`}
                style={{ background: `var(--${e.color})`, ["--chamfer" as string]: "0.9rem" }}
              >
                <button
                  type="button"
                  id={`${baseId}-tab-${i}`}
                  aria-pressed={alFrente}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => setActiva(i)}
                  className="flex h-full items-center gap-2 px-5 text-[0.9375rem] font-semibold sm:px-6 sm:text-[1.0625rem]"
                  style={{ color: `var(--${e.color}-ink)` }}
                >
                  <Emblema emblema={e.emblema} className="size-4 sm:size-5" />
                  {ETIQUETA_PESTANA[e.slug] ?? e.nombreCorto}
                </button>
              </div>
              {alFrente ? <Panel esp={e} id={`${baseId}-panel`} tabId={`${baseId}-tab-${i}`} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Panel({ esp, id, tabId }: { esp: Especialidad; id: string; tabId: string }) {
  return (
    <div
      role="region"
      id={id}
      aria-labelledby={tabId}
      aria-live="polite"
      className="grid gap-8 px-5 pb-12 pt-7 sm:px-8 sm:pt-9 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-14"
    >
      <div key={esp.slug} className="flex flex-col lg:col-span-7">
        <p className="panel-in flex items-center gap-3 text-small font-semibold">
          <Emblema emblema={esp.emblema} className="size-5" />
          Sector {esp.sector}
        </p>
        <h3 className="panel-in mt-3 text-[clamp(1.875rem,1.1rem+2.6vw,3.5rem)]" style={{ ["--i" as string]: 1 }}>{esp.nombre}</h3>
        <p className="panel-in mt-4 max-w-[48ch] text-body leading-normal" style={{ ["--i" as string]: 2 }}>{esp.resumen.texto}</p>
        <div className="panel-in mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8" style={{ ["--i" as string]: 3 }}>
          <Link href={`/especialidades/${esp.slug}`} className="btn btn-ink">
            Conocer la especialidad
            <ArrowRight aria-hidden className="flecha size-4" />
          </Link>
          <Link href="/especialidades" className="inline-flex min-h-11 items-center font-semibold underline" style={{ color: "inherit" }}>
            Ver las cinco especialidades
          </Link>
        </div>
      </div>
      <div className="relative hidden aspect-[4/3] lg:col-span-5 lg:block">
        <Image
          key={esp.imagen.src}
          src={esp.imagen.src}
          alt={esp.imagen.alt}
          fill
          sizes="(min-width: 1024px) 34vw, 1px"
          className="panel-in chamfer object-cover"
        />
      </div>
    </div>
  );
}
