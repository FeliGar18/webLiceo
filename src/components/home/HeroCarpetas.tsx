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

/**
 * Carpeta de especialidades: una fila de pestañas y una sola carpeta abierta.
 * Las pestañas en reposo son oscuras y solo llevan el emblema en su color; la
 * elegida toma el color de su especialidad y lo continúa en el canto superior
 * de la carpeta. Así el color marca la elección en vez de llenar la pantalla.
 * Las pestañas son botones de alternancia (aria-pressed) y el contenido de la
 * carpeta se anuncia como una región con nombre.
 */
export function HeroCarpetas({ especialidades }: { especialidades: Especialidad[] }) {
  const [activa, setActiva] = useState(0);
  const baseId = useId();
  const esp = especialidades[activa];

  return (
    <div className="mx-auto w-full max-w-[90rem] px-[var(--gutter)] pb-16 pt-2 sm:pb-24">
      <h2 className="sr-only">Nuestras cinco especialidades</h2>

      <div
        role="group"
        aria-label="Elegir especialidad"
        className="relative -mx-[var(--gutter)] flex gap-1.5 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:gap-2 sm:px-0"
      >
        {especialidades.map((e, i) => {
          const alFrente = i === activa;
          return (
            <button
              key={e.slug}
              type="button"
              id={`${baseId}-tab-${i}`}
              aria-pressed={alFrente}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActiva(i)}
              className={`intro-carpeta tab-shape flex h-11 flex-none items-center gap-2 px-5 text-[0.9375rem] font-semibold transition-colors duration-200 sm:h-12 sm:px-6 sm:text-[1.0625rem] ${
                alFrente ? "" : "bg-[#2a2629] text-[#e4dfe2] hover:bg-[#3a3538]"
              }`}
              style={{
                ["--i" as string]: i,
                ["--chamfer" as string]: "0.9rem",
                ...(alFrente ? { background: `var(--${e.color})`, color: `var(--${e.color}-ink)` } : {}),
              }}
            >
              {/* En reposo, el emblema conserva el color de su especialidad. */}
              <span className="flex" style={alFrente ? undefined : { color: `var(--${e.color})` }}>
                <Emblema emblema={e.emblema} className="size-4 sm:size-5" />
              </span>
              {ETIQUETA_PESTANA[e.slug] ?? e.nombreCorto}
            </button>
          );
        })}
      </div>

      <div
        role="region"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${activa}`}
        aria-live="polite"
        className="intro-carpeta relative overflow-hidden bg-[#2a2629] chamfer chamfer-lg"
        style={{ ["--i" as string]: especialidades.length }}
      >
        {/* Canto de la carpeta, del color de la pestaña elegida. */}
        <div
          aria-hidden
          className="h-1.5 transition-colors duration-300 sm:h-2"
          style={{ background: `var(--${esp.color})` }}
        />
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
          <div key={esp.slug} className="flex flex-col lg:col-span-6">
            <p className="panel-in flex items-center gap-3 text-small font-semibold text-[#cfc8cc]">
              <span className="flex" style={{ color: `var(--${esp.color})` }}>
                <Emblema emblema={esp.emblema} className="size-5" />
              </span>
              Sector {esp.sector}
            </p>
            <h3
              className="panel-in mt-4 max-w-[18ch] text-[clamp(1.875rem,1.2rem+2.4vw,3.25rem)] leading-[1.02] tracking-[-0.035em]"
              style={{ ["--i" as string]: 1 }}
            >
              {esp.nombre}
            </h3>
            <p
              className="panel-in mt-5 max-w-[46ch] text-lead leading-snug text-[#e4dfe2]"
              style={{ ["--i" as string]: 2 }}
            >
              {esp.resumen.texto}
            </p>
            <div
              className="panel-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ ["--i" as string]: 3 }}
            >
              <Link
                href={`/especialidades/${esp.slug}`}
                className="btn"
                style={{ background: `var(--${esp.color})`, color: `var(--${esp.color}-ink)` }}
              >
                Conocer la especialidad
                <ArrowRight aria-hidden className="flecha size-4" />
              </Link>
              <Link
                href="/especialidades"
                className="inline-flex min-h-11 items-center font-semibold text-bg underline underline-offset-4"
              >
                Ver las cinco especialidades
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden chamfer chamfer-lg lg:col-span-6">
            <Image
              key={esp.imagen.src}
              src={esp.imagen.src}
              alt={esp.imagen.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="panel-in object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
