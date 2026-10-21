"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Entradas al hacer scroll en todo el sitio.
 *
 * Toma los elementos de contenido (títulos, párrafos, ítems de lista, botones,
 * fotos…) que todavía están bajo el borde de la pantalla, los deja ocultos y,
 * cuando aparecen, los hace subir y aparecer con un escalonamiento según el
 * orden en que entran.
 *
 * Se anima con la Web Animations API (`element.animate`) y no con clases ni
 * atributos: este efecto puede correr antes de que React hidrate el contenido
 * de la página (Cache Components), y tocar el HTML provocaría un error de
 * hidratación. Las animaciones no cambian el DOM.
 *
 * Reglas:
 * - Lo que ya se ve al cargar no se oculta nunca (sin parpadeos).
 * - Sin JavaScript no se oculta nada.
 * - Las zonas con su propia coreografía llevan `data-sin-rv` y se respetan.
 * - Al terminar, las animaciones se descartan para que botones y enlaces
 *   recuperen sus transiciones propias.
 */
const TEXTO =
  "h2, h3, h4, p, li, dl > div, table, form, details, blockquote, figcaption, address, .btn, [data-rv]";
const FOTO = ".reveal-img";
const FRANJA = "[data-rv-franja]";
const PASO_MS = 75;
const MAX_ESCALON = 6;
const PASO_FRANJA_MS = 70;

/** Elementos ya evaluados (sobrevive a la navegación: las rutas previas siguen montadas). */
const hechos = new WeakSet<Element>();

type Entrada = {
  /** Cuadros que dejan oculto cada objetivo (estado inicial). */
  ocultos: { objetivo: Element; cuadro: Keyframe }[];
  /** Arranca la entrada con el retraso del escalonamiento. */
  entrar: (retraso: number) => Animation[];
};

function crearEntrada(el: HTMLElement, reducido: boolean, easeOut: string, easeInOut: string): Entrada | null {
  // Fotografías: el marco se descubre de abajo hacia arriba.
  if (el.matches(FOTO)) {
    if (reducido) return null;
    const oculto = { clipPath: "inset(100% 0 0 0)" };
    return {
      ocultos: [{ objetivo: el, cuadro: oculto }],
      entrar: (retraso) => [
        el.animate([oculto, { clipPath: "inset(0 0 0 0)" }], {
          duration: 1100,
          easing: easeInOut,
          delay: retraso,
          fill: "backwards",
        }),
      ],
    };
  }
  // Franja de colores del pie: cada tramo crece desde la izquierda.
  if (el.matches(FRANJA)) {
    if (reducido) return null;
    const tramos = [...el.querySelectorAll<HTMLElement>(".franja-pie")];
    const oculto = { transform: "scaleX(0)" };
    return {
      ocultos: tramos.map((t) => ({ objetivo: t, cuadro: oculto })),
      entrar: () =>
        tramos.map((t, i) =>
          t.animate([oculto, { transform: "none" }], {
            duration: 800,
            easing: easeOut,
            delay: i * PASO_FRANJA_MS,
            fill: "backwards",
          }),
        ),
    };
  }
  // Texto y demás: sube y aparece (con movimiento reducido, solo el fundido).
  if (reducido) {
    return {
      ocultos: [{ objetivo: el, cuadro: { opacity: 0 } }],
      entrar: (retraso) => [
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: "ease", delay: retraso, fill: "backwards" }),
      ],
    };
  }
  return {
    ocultos: [{ objetivo: el, cuadro: { opacity: 0, transform: "translateY(2rem)" } }],
    entrar: (retraso) => [
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, easing: easeOut, delay: retraso, fill: "backwards" }),
      el.animate([{ transform: "translateY(2rem)" }, { transform: "none" }], {
        duration: 900,
        easing: easeOut,
        delay: retraso,
        fill: "backwards",
      }),
    ],
  };
}

export function Movimiento() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return;

    const raiz = getComputedStyle(document.documentElement);
    const easeOut = raiz.getPropertyValue("--ease-out").trim() || "ease-out";
    const easeInOut = raiz.getPropertyValue("--ease-in-out").trim() || "ease-in-out";
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const zonas = document.querySelectorAll<HTMLElement>("main, footer");
    const elegidos = new Set<HTMLElement>();
    for (const zona of zonas) {
      zona.querySelectorAll<HTMLElement>(`${TEXTO}, ${FOTO}, ${FRANJA}`).forEach((el) => elegidos.add(el));
    }

    const limite = window.innerHeight * 0.95;
    const entradas = new Map<Element, Entrada>();
    /** Animaciones que mantienen ocultos los elementos, por elemento. */
    const retenidas = new Map<Element, Animation[]>();
    /** Todas las animaciones vivas (retenciones y entradas en curso). */
    const activas = new Set<Animation>();
    /** Marcados en esta pasada que aún no entran (se desmarcan al limpiar). */
    const marcados = new Set<Element>();

    for (const el of elegidos) {
      if (hechos.has(el)) continue;
      hechos.add(el);
      marcados.add(el);
      if (el.closest("[data-sin-rv]")) continue;
      // Si un ancestro ya entra animado, este entra con él.
      const padre = el.parentElement?.closest<HTMLElement>(`${TEXTO}, ${FOTO}, ${FRANJA}`);
      if (padre && elegidos.has(padre) && !padre.closest("[data-sin-rv]")) continue;
      const rect = el.getBoundingClientRect();
      // Ocultos (rutas en segundo plano) o ya visibles: no se tocan.
      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.top < limite) continue;

      const entrada = crearEntrada(el, reducido, easeOut, easeInOut);
      if (!entrada) continue;
      entradas.set(el, entrada);
      retenidas.set(
        el,
        entrada.ocultos.map(({ objetivo, cuadro }) => {
          const a = objetivo.animate([cuadro], { duration: 0, fill: "forwards" });
          activas.add(a);
          return a;
        }),
      );
    }

    // Al limpiar, lo que no alcanzó a entrar vuelve a evaluarse en la próxima
    // pasada (React en desarrollo monta el efecto dos veces seguidas).
    const desmarcar = () => marcados.forEach((el) => hechos.delete(el));

    if (entradas.size === 0) return desmarcar;

    const observador = new IntersectionObserver(
      (registros) => {
        const llegan = registros
          .filter((e) => e.isIntersecting)
          .map((e) => e.target)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });

        llegan.forEach((el, i) => {
          observador.unobserve(el);
          marcados.delete(el);
          const entrada = entradas.get(el);
          if (!entrada) return;
          for (const a of retenidas.get(el) ?? []) {
            a.cancel();
            activas.delete(a);
          }
          for (const a of entrada.entrar(Math.min(i, MAX_ESCALON) * PASO_MS)) {
            activas.add(a);
            const soltar = () => activas.delete(a);
            a.finished.then(soltar, soltar);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    entradas.forEach((_, el) => observador.observe(el));
    return () => {
      observador.disconnect();
      // Al salir de la página, lo que no alcanzó a entrar queda visible.
      activas.forEach((a) => a.cancel());
      desmarcar();
    };
  }, [pathname]);

  return null;
}
