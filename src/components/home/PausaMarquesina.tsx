"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

/** Botón para detener la franja en movimiento (WCAG 2.2.2, pausar, detener, ocultar). */
export function PausaMarquesina() {
  const [pausada, setPausada] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={pausada}
      onClick={(e) => {
        setPausada((p) => !p);
        e.currentTarget.closest(".marquesina-zona")?.toggleAttribute("data-pausada");
      }}
      className="btn btn-light absolute bottom-3 right-[var(--gutter)] z-10 min-h-11 px-3 text-small"
    >
      {pausada ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      {pausada ? "Reanudar" : "Pausar"}
      <span className="sr-only"> el movimiento de la franja</span>
    </button>
  );
}
