import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cifras } from "@/content/cifras";
import { grupos } from "@/content/comunidad";
import { institucion } from "@/content/institucion";
import { noticias } from "@/content/noticias";

const raiz = process.cwd();
const config = readFileSync(join(raiz, "public", "admin", "config.yml"), "utf8");

describe("panel de administración (public/admin/config.yml)", () => {
  it("apunta a archivos y carpetas de datos que existen", () => {
    const rutas = [...config.matchAll(/^\s*(?:folder|file):\s*(\S+)/gm)].map((m) => m[1]);
    expect(rutas.length).toBeGreaterThan(0);
    for (const ruta of rutas) {
      expect(existsSync(join(raiz, ruta)), `no existe ${ruta}`).toBe(true);
    }
  });

  it("usa el repositorio y la rama del sitio", () => {
    expect(config).toMatch(/repo:\s*FeliGar18\/webLiceo/);
    expect(config).toMatch(/branch:\s*main/);
  });

  it("ofrece las mismas categorías de noticias que acepta el sitio", () => {
    const opciones = config.match(/options:\s*\[(Institucional[^\]]*)\]/)?.[1].split(",").map((s) => s.trim());
    expect(opciones).toEqual(["Institucional", "Especialidades", "Comunidad", "Admisión"]);
  });
});

describe("contenido editable (src/content/datos)", () => {
  it("carga una noticia por cada archivo JSON, con párrafos separados", () => {
    const archivos = readdirSync(join(raiz, "src", "content", "datos", "noticias")).filter((a) => a.endsWith(".json"));
    expect(noticias).toHaveLength(archivos.length);
    for (const n of noticias) {
      expect(n.cuerpo.every((p) => p.length > 0 && !p.includes("\n"))).toBe(true);
    }
  });

  it("carga cifras, contacto y comunidad", () => {
    expect(cifras.length).toBeGreaterThan(0);
    expect(institucion.correos.length).toBeGreaterThan(0);
    expect(institucion.telefonos.length).toBeGreaterThan(0);
    expect(grupos.length).toBeGreaterThan(0);
  });

  it("genera anclas únicas para los grupos de la comunidad", () => {
    const ids = grupos.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true);
  });

  it("las fotos de la comunidad existen en public/", () => {
    const faltantes = grupos
      .flatMap((g) => g.integrantes)
      .map((p) => p.foto?.src)
      .filter((src): src is string => Boolean(src) && !existsSync(join(raiz, "public", src!)));
    expect(faltantes).toEqual([]);
  });
});
