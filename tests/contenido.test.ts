import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { documentos } from "@/content/documentos";
import { especialidades } from "@/content/especialidades";
import { accionPrincipal, navegacionPie, navegacionPrincipal } from "@/content/navegacion";
import { noticias } from "@/content/noticias";
import type { ItemNavegacion } from "@/lib/types";

const raiz = process.cwd();

function duplicados(valores: string[]): string[] {
  return valores.filter((v, i) => valores.indexOf(v) !== i);
}

function aplanar(items: ItemNavegacion[]): ItemNavegacion[] {
  return items.flatMap((i) => [i, ...aplanar(i.hijos ?? [])]);
}

/** `true` si existe la página de la ruta, estática o como segmento dinámico `[slug]`. */
function existeRuta(ruta: string): boolean {
  const limpia = ruta.split(/[?#]/)[0].replace(/\/$/, "");
  const partes = limpia.split("/").filter(Boolean);
  if (existsSync(join(raiz, "src", "app", ...partes, "page.tsx"))) return true;
  if (partes.length === 0) return false;
  return existsSync(join(raiz, "src", "app", ...partes.slice(0, -1), "[slug]", "page.tsx"));
}

describe("especialidades", () => {
  it("tienen slugs únicos", () => {
    expect(duplicados(especialidades.map((e) => e.slug))).toEqual([]);
  });

  it.each(especialidades.map((e) => [e.slug, e.imagen.src]))("%s tiene su imagen en public/ (%s)", (_slug, src) => {
    expect(src.startsWith("/")).toBe(true);
    expect(existsSync(join(raiz, "public", src))).toBe(true);
  });
});

describe("noticias", () => {
  it("tienen slugs únicos", () => {
    expect(duplicados(noticias.map((n) => n.slug))).toEqual([]);
  });

  it("tienen fecha ISO válida", () => {
    for (const n of noticias) {
      expect(n.fecha, n.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(n.fecha)), n.slug).toBe(false);
    }
  });
});

describe("navegación", () => {
  const internos = [
    ...aplanar(navegacionPrincipal),
    ...navegacionPie.flatMap((g) => aplanar(g.enlaces)),
    accionPrincipal,
  ]
    .map((i) => i.href)
    .filter((href) => href.startsWith("/"));

  it.each(Array.from(new Set(internos)))("la ruta %s existe en src/app", (href) => {
    expect(existeRuta(href)).toBe(true);
  });
});

describe("documentos", () => {
  it("tienen identificadores únicos", () => {
    expect(duplicados(documentos.map((d) => d.id))).toEqual([]);
  });

  // Externos por https, o archivos propios del sitio en /archivos/ que existan en public.
  it.each(documentos.map((d) => [d.id, d.url]))("%s usa una URL https o un archivo propio (%s)", (_id, url) => {
    if (url.startsWith("/archivos/")) {
      expect(existsSync(join(raiz, "public", url))).toBe(true);
    } else {
      expect(new URL(url).protocol).toBe("https:");
    }
  });
});
