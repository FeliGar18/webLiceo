"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Emblema } from "@/components/ui/Emblema";
import { EtiquetaProvisional } from "@/components/ui/Pendiente";
import type { Especialidad } from "@/lib/types";

type Fila = Pick<
  Especialidad,
  "slug" | "nombre" | "nombreCorto" | "emblema" | "color" | "sector" | "imagen" | "resumen"
>;

/**
 * Índice de especialidades con vista previa.
 *
 * Con puntero fino y pantalla ancha, la fotografía de la fila activa aparece en
 * un marco fijo a la derecha (fundido de 240ms, solo opacidad). En pantallas
 * táctiles o estrechas cada fila muestra su fotografía en línea. Sin JavaScript
 * el índice queda completo: cada fila es un enlace y el marco muestra la primera.
 */
export function IndiceEspecialidades({ filas }: { filas: Fila[] }) {
  const [activa, setActiva] = useState(0);
  const actual = filas[activa] ?? filas[0];

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {filas.map((e, i) => (
          <li key={e.slug}>
            <Link
              href={`/especialidades/${e.slug}`}
              onPointerEnter={() => setActiva(i)}
              onFocus={() => setActiva(i)}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-6 py-7 text-ink no-underline hover:bg-surface focus-visible:bg-surface sm:gap-x-8 sm:px-4 sm:py-9"
            >
              <span
                aria-hidden
                className="chamfer flex size-14 items-center justify-center sm:size-20"
                style={{ background: `var(--${e.color})`, color: `var(--${e.color}-ink)` }}
              >
                <Emblema emblema={e.emblema} className="size-8 sm:size-11" />
              </span>
              <div className="min-w-0">
                <p className="text-small font-semibold text-muted">Sector {e.sector}</p>
                <h2 className="mt-2 flex items-start gap-3 text-[clamp(1.875rem,1.2rem+2.6vw,3.5rem)]">
                  <span className="min-w-0">{e.nombreCorto}</span>
                  <ArrowRight
                    aria-hidden
                    className="flecha mt-[0.12em] hidden size-[0.7em] flex-none transition-transform sm:block duration-200 ease-[var(--ease-out)] group-hover:translate-x-1.5"
                  />
                </h2>
                {e.nombre !== e.nombreCorto ? (
                  <p className="mt-2 font-semibold">Nombre oficial: {e.nombre}</p>
                ) : null}
                <p className="mt-4 max-w-[54ch] text-body">
                  {e.resumen.texto}
                  {e.resumen.validado ? null : (
                    <span className="ml-2 align-middle">
                      <EtiquetaProvisional />
                    </span>
                  )}
                </p>
              </div>

              {/* Fotografía en línea: en pantallas táctiles o estrechas. */}
              <div className="col-span-2 lg:[@media(hover:hover)_and_(pointer:fine)]:hidden">
                <div className="chamfer relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={e.imagen.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Marco fijo con la vista previa: solo con puntero fino y pantalla ancha. */}
      <div aria-hidden className="hidden lg:col-span-5 lg:[@media(hover:hover)_and_(pointer:fine)]:block">
        <div className="sticky top-28">
          <div className="chamfer chamfer-lg relative aspect-[4/5] overflow-hidden bg-surface">
            {filas.map((e, i) => (
              <Image
                key={e.slug}
                src={e.imagen.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 1px"
                className={`object-cover transition-opacity duration-[240ms] ease-[var(--ease-out)] ${
                  i === activa ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          {actual ? (
            <p className="mt-3 flex items-center gap-3 text-small font-semibold">
              <span className="bullet" style={{ color: `var(--${actual.color})` }} />
              {actual.nombreCorto}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
