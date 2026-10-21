// Copia Sveltia CMS (devDependency fijada en package.json) a public/admin/cms/
// para servir el panel desde el propio sitio, sin depender de un CDN.
// Se ejecuta solo antes de `npm run dev` y `npm run build` (predev/prebuild).
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const origen = join(raiz, "node_modules", "@sveltia", "cms", "dist");
const destino = join(raiz, "public", "admin", "cms");

if (!existsSync(origen)) {
  console.error("[panel] Falta @sveltia/cms en node_modules: ejecute `npm install`.");
  process.exit(1);
}

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
// Solo el script y sus fragmentos; los mapas de código (.map) no se publican.
cpSync(origen, destino, {
  recursive: true,
  filter: (ruta) => !ruta.endsWith(".map") && !ruta.endsWith(".mjs"),
});
console.log("[panel] Sveltia CMS copiado a public/admin/cms/");
