"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useRef } from "react";
import type { Imagen } from "@/lib/types";

/**
 * Fotografía grande que se abre a pantalla completa al hacer clic.
 *
 * Usa <dialog> nativo: Escape lo cierra, el foco queda dentro mientras está
 * abierto y vuelve al botón al cerrar. Un clic fuera de la foto también cierra.
 * Se sirve con calidad 90 para que la foto ampliada no pierda detalle.
 */
export function FotoAmpliable({
  imagen,
  aspecto = "aspect-[2/1]",
  prioridad = false,
  className = "",
}: {
  imagen: Imagen;
  aspecto?: string;
  prioridad?: boolean;
  className?: string;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => dialogo.current?.showModal()}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-surface chamfer chamfer-lg ${aspecto}`}
      >
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          sizes="(min-width: 1440px) 1376px, 100vw"
          quality={90}
          preload={prioridad}
          className="zoom-img object-cover"
        />
        <span className="btn btn-ink pointer-events-none absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
          <Maximize2 aria-hidden className="size-4" />
          Ver en grande
        </span>
      </button>

      <dialog
        ref={dialogo}
        aria-label={imagen.alt}
        onClick={(e) => e.target === e.currentTarget && dialogo.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        <div className="relative flex h-dvh w-dvw items-center justify-center p-4 sm:p-8" onClick={() => dialogo.current?.close()}>
          <Image
            src={imagen.src}
            alt={imagen.alt}
            width={imagen.ancho}
            height={imagen.alto}
            sizes="100vw"
            quality={90}
            className="max-h-full w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => dialogo.current?.close()}
            className="btn btn-light absolute right-4 top-4 sm:right-8 sm:top-8"
            autoFocus
          >
            <X aria-hidden className="size-4" />
            Cerrar
          </button>
        </div>
      </dialog>
    </figure>
  );
}
