import Image from "next/image";
import type { Imagen } from "@/lib/types";

/**
 * Fotografía con el recorte achaflanado del sitio.
 * Las imágenes provisionales llevan una leyenda que lo indica; su crédito
 * completo aparece en /creditos.
 *
 * Movimiento: el marco se descubre de abajo hacia arriba al entrar en pantalla
 * (`reveal-img`) y la imagen se desplaza levemente con el scroll (`parallax`),
 * en una capa distinta de la del zoom al pasar el puntero (`zoom-img`) para que
 * las dos transformaciones no se pisen. La foto principal (`prioridad`) no se
 * oculta al cargar: debe verse de inmediato.
 */
export function Foto({
  imagen,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  prioridad = false,
  leyenda,
  forma = "chamfer",
  aspecto = "aspect-[4/3]",
  movimiento = true,
  calidad,
}: {
  imagen: Imagen;
  className?: string;
  sizes?: string;
  prioridad?: boolean;
  leyenda?: string;
  forma?: "chamfer" | "chamfer chamfer-lg" | "none";
  aspecto?: string;
  movimiento?: boolean;
  /** Calidad de compresión (75 por defecto; 90 para fotos de baja resolución). */
  calidad?: 75 | 90;
}) {
  const texto = leyenda ?? (imagen.provisional ? "Imagen referencial, no corresponde al liceo." : undefined);
  const animar = movimiento && !prioridad;
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden bg-surface ${aspecto} ${forma === "none" ? "" : forma} ${
          animar ? "reveal-img" : ""
        }`}
      >
        <div className={`absolute inset-0 ${movimiento ? "parallax" : ""}`}>
          <Image
            src={imagen.src}
            alt={imagen.alt}
            fill
            sizes={sizes}
            quality={calidad}
            preload={prioridad}
            loading={prioridad ? "eager" : "lazy"}
            className="zoom-img object-cover"
          />
        </div>
      </div>
      {texto ? <figcaption className="mt-2 text-small text-muted">{texto}</figcaption> : null}
    </figure>
  );
}
