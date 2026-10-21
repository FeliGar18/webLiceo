import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { EtiquetaProvisional } from "@/components/ui/Pendiente";
import { institucion } from "@/content/institucion";

/** Un dato en una sola línea: icono, rótulo y valor. */
function Dato({ icono: Icono, titulo, children }: { icono: LucideIcon; titulo: string; children: ReactNode }) {
  return (
    <div className="flex flex-none snap-start items-center gap-2.5 whitespace-nowrap text-small lg:min-w-0 lg:flex-1">
      <span
        aria-hidden
        className="flex size-7 flex-none items-center justify-center bg-bg text-accent chamfer [--chamfer:0.35rem]"
      >
        <Icono className="size-4" strokeWidth={1.75} />
      </span>
      <span className="font-semibold">{titulo}</span>
      <span className="flex min-w-0 items-center gap-2 text-muted">{children}</span>
    </div>
  );
}

/**
 * Datos de contacto sobre el video de la portada: correo, dirección y teléfono,
 * en una franja delgada de una sola línea. En pantallas angostas se desliza.
 */
export function FranjaContacto() {
  const correo = institucion.correos.find((c) => c.etiqueta === "Secretaría") ?? institucion.correos[0];
  const telefono = institucion.telefonos[0];

  return (
    <section aria-label="Datos de contacto" data-sin-rv className="bg-surface">
      <Container>
        {/* `relative`: el texto sr-only (absoluto) del enlace queda recortado por la fila. */}
        <div className="relative -mx-[var(--gutter)] flex snap-x gap-8 overflow-x-auto px-[var(--gutter)] py-1.5 [scrollbar-width:none] lg:mx-0 lg:gap-10 lg:overflow-visible lg:px-0">
          <Dato icono={Mail} titulo="Correo">
            <a
              href={`mailto:${correo.valor}`}
              className="flex min-h-11 items-center font-semibold text-accent underline-offset-2 hover:underline"
            >
              {correo.valor}
            </a>
          </Dato>
          <Dato icono={MapPin} titulo="Dirección">
            <a
              href={institucion.mapaUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${institucion.direccion.valor}, ${institucion.region}`}
              className="flex min-h-11 min-w-0 items-center text-muted underline-offset-2 hover:text-ink hover:underline"
            >
              <span className="truncate">Sector San Javier km 7, Ruta T-74, {institucion.comuna}</span>
              <span className="sr-only"> (abre Google Maps en una pestaña nueva)</span>
            </a>
          </Dato>
          <Dato icono={Phone} titulo="Teléfono">
            <a
              href={`tel:${telefono.valor.replace(/\s+/g, "")}`}
              className="flex min-h-11 items-center font-semibold text-accent tabular underline-offset-2 hover:underline"
            >
              {telefono.valor}
            </a>
            {telefono.estado === "por-confirmar" ? <EtiquetaProvisional>Por confirmar</EtiquetaProvisional> : null}
          </Dato>
        </div>
      </Container>
    </section>
  );
}
