import type { Emblema as TipoEmblema } from "@/lib/types";

/**
 * Pictogramas de los cinco emblemas de la insignia, redibujados como formas
 * planas simples para usarlos a tamaño de icono. No reemplazan ni alteran el
 * logotipo oficial: este se usa siempre desde su archivo original.
 */
const trazos: Record<TipoEmblema, React.ReactNode> = {
  casa: <path d="M4 22V11l8-7 8 7v11h-5.5v-6.5h-5V22z" />,
  rayo: <path d="M13.5 2 5 13.5h5.5L9 22l9.5-12.5H13z" />,
  engranaje: (
    <path
      fillRule="evenodd"
      d="M10.2 2h3.6l.5 2.6 1.9.8 2.2-1.5 2.5 2.5-1.5 2.2.8 1.9 2.6.5v3.6l-2.6.5-.8 1.9 1.5 2.2-2.5 2.5-2.2-1.5-1.9.8-.5 2.6h-3.6l-.5-2.6-1.9-.8-2.2 1.5-2.5-2.5 1.5-2.2-.8-1.9L1.2 13.8v-3.6l2.6-.5.8-1.9-1.5-2.2 2.5-2.5 2.2 1.5 1.9-.8zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
    />
  ),
  grua: <path d="M5 22V6H3V3h18v3H9.5v2.5L19 14h-3.2L9.5 10.4V22zm2-16v3l1.2-1.5V6z" />,
  llave: <path d="M3 6h9V4h4v2h3a2 2 0 0 1 2 2v6h-4v-4h-5v2H3zm14 11c0-1.2 1-2.8 2-4 1 1.2 2 2.8 2 4a2 2 0 1 1-4 0" />,
};

export function Emblema({
  emblema,
  className,
  titulo,
}: {
  emblema: TipoEmblema;
  className?: string;
  /** Si se omite, el icono es decorativo y queda oculto a lectores de pantalla. */
  titulo?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role={titulo ? "img" : undefined}
      aria-hidden={titulo ? undefined : true}
      aria-label={titulo}
      focusable="false"
    >
      {trazos[emblema]}
    </svg>
  );
}
