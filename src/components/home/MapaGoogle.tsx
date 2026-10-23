import { Navigation } from "lucide-react";

/**
 * Mapa de Google Maps con la ubicación del liceo, incrustado directamente.
 *
 * Todo el mapa es un enlace: al hacer clic abre Google Maps en una pestaña
 * nueva con la ruta desde donde está el visitante hasta el liceo.
 *
 * Se carga de forma diferida (al acercarse a la sección). Al cargarse, el
 * navegador conecta con Google, que puede usar cookies propias: así lo indica
 * la política de privacidad.
 */
export function MapaGoogle({
  latitud,
  longitud,
  comoLlegarUrl,
  className = "",
}: {
  latitud: number;
  longitud: number;
  comoLlegarUrl: string;
  className?: string;
}) {
  const src = `https://www.google.com/maps?q=${latitud},${longitud}&z=19&hl=es&output=embed`;

  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-surface chamfer chamfer-lg ${className}`}>
      <iframe
        src={src}
        title="Mapa de Google Maps con la ubicación del liceo"
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        tabIndex={-1}
      />
      {/* Capa sobre el mapa: cualquier clic abre la ruta en Google Maps. */}
      <a
        href={comoLlegarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 flex items-end justify-start p-4 sm:p-5"
      >
        <span className="btn btn-ink pointer-events-none">
          <Navigation aria-hidden className="size-4" />
          Cómo llegar desde donde estás
        </span>
        <span className="sr-only">(abre Google Maps en una pestaña nueva)</span>
      </a>
    </div>
  );
}
