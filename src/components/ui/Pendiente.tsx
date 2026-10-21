import { Clock } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Marca visible de contenido pendiente de validación por el liceo.
 * Se usa en lugar de inventar información oficial.
 */
export function Pendiente({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex max-w-[60ch] items-start gap-3 bg-surface px-4 py-3 text-small font-semibold text-muted ${className}`}
    >
      <Clock aria-hidden className="mt-0.5 size-4 flex-none" />
      <span>{children}</span>
    </p>
  );
}

/** Etiqueta breve para textos o datos provisionales. */
export function EtiquetaProvisional({ children = "Texto provisional" }: { children?: ReactNode }) {
  return (
    <span className="inline-block bg-surface-strong px-2 py-0.5 text-small font-semibold text-ink">{children}</span>
  );
}
