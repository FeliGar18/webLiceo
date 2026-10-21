import { z } from "zod";
import datos from "./datos/cifras.json";

/**
 * Cifras de la portada (debajo del video).
 *
 * Se editan desde el panel de administración (/admin), que guarda
 * src/content/datos/cifras.json. Solo datos entregados por el liceo: si
 * `cifra` queda vacía, la portada muestra "Cifra por confirmar" en vez de
 * inventar un número. `texto` es opcional.
 */
export type Cifra = {
  cifra: string | null;
  titulo: string;
  texto?: string;
};

const opcional = z.string().nullish().transform((v) => v?.trim() ?? "");

const cifrasSchema = z.object({
  cifras: z.array(
    z.object({
      cifra: opcional,
      titulo: z.string().trim().min(1),
      texto: opcional,
    }),
  ),
});

export const cifras: Cifra[] = cifrasSchema.parse(datos).cifras.map((c) => ({
  cifra: c.cifra || null,
  titulo: c.titulo,
  texto: c.texto || undefined,
}));
