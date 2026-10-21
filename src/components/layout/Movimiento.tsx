"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Entradas al hacer scroll en todo el sitio.
 *
 * Toma los elementos de contenido (títulos, párrafos, ítems de lista, botones,
 * fotos…) que todavía están bajo el borde de la pantalla, los deja listos para
 * entrar (`.rv`) y, cuando aparecen, los hace subir y aparecer con un
 * escalonamiento según el orden en que entran (ver motion.css).
 *
 * Reglas:
 * - Lo que ya se ve al cargar no se oculta nunca (sin parpadeos).
 * - Sin JavaScript no se oculta nada.
 * - Las zonas con su propia coreografía llevan `data-sin-rv` y se respetan.
 * - Al terminar, se quitan las clases para que botones y enlaces recuperen
 *   sus transiciones propias.
 */
const TEXTO =
  "h2, h3, h4, p, li, dl > div, table, form, details, blockquote, figcaption, address, .btn, [data-rv]";
const FOTO = ".reveal-img";
const FRANJA = "[data-rv-franja]";
const PASO_MS = 75;
const MAX_ESCALON = 6;

export function Movimiento() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const zonas = document.querySelectorAll<HTMLElement>("main, footer");
    const elegidos = new Set<HTMLElement>();
    for (const zona of zonas) {
      zona.querySelectorAll<HTMLElement>(`${TEXTO}, ${FOTO}, ${FRANJA}`).forEach((el) => elegidos.add(el));
    }

    const limite = window.innerHeight * 0.95;
    const pendientes: HTMLElement[] = [];

    for (const el of elegidos) {
      if (el.dataset.rvHecho) continue;
      el.dataset.rvHecho = "1";
      if (el.closest("[data-sin-rv]")) continue;
      // Si un ancestro ya entra animado, este entra con él.
      const padre = el.parentElement?.closest<HTMLElement>(`${TEXTO}, ${FOTO}, ${FRANJA}`);
      if (padre && elegidos.has(padre) && !padre.closest("[data-sin-rv]")) continue;
      const rect = el.getBoundingClientRect();
      // Ocultos (rutas en segundo plano) o ya visibles: no se tocan.
      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.top < limite) continue;

      el.classList.add(el.matches(FOTO) ? "rv-img" : el.matches(FRANJA) ? "rv-franja" : "rv");
      pendientes.push(el);
    }

    if (pendientes.length === 0) return;

    const temporizadores: number[] = [];
    const observador = new IntersectionObserver(
      (entradas) => {
        const llegan = entradas
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });

        llegan.forEach((el, i) => {
          observador.unobserve(el);
          const retraso = Math.min(i, MAX_ESCALON) * PASO_MS;
          el.style.setProperty("--rv-delay", `${retraso}ms`);
          el.classList.add("is-in");
          temporizadores.push(
            window.setTimeout(() => {
              el.classList.remove("rv", "rv-img", "rv-franja", "is-in");
              el.style.removeProperty("--rv-delay");
            }, retraso + 1300),
          );
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    pendientes.forEach((el) => observador.observe(el));
    return () => {
      observador.disconnect();
      temporizadores.forEach((t) => window.clearTimeout(t));
      // Al salir de la página, lo que no alcanzó a entrar queda visible.
      pendientes.forEach((el) => {
        el.classList.remove("rv", "rv-img", "rv-franja", "is-in");
        el.style.removeProperty("--rv-delay");
      });
    };
  }, [pathname]);

  return null;
}
