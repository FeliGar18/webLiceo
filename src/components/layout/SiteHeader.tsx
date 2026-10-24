"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { accionPrincipal, navegacionPrincipal } from "@/content/navegacion";
import { logoBicentenario, logoLiceo, logoSostenedor } from "@/content/marca";
import type { ItemNavegacion } from "@/lib/types";

function estaActivo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Ancho del logo Liceos Bicentenario (h-9, 1366×364) más su línea y separaciones, en rem. */
const ANCHO_BICENTENARIO_REM = 2.25 * (1366 / 364) + 2 + 0.0625;

function Marca({ marcaRef, conBicentenario }: { marcaRef: React.Ref<HTMLAnchorElement>; conBicentenario: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3 xl:gap-4">
      {/* Sostenedor y liceo, separados por una línea fina (pedido expreso). Solo desde 1280 px: antes no cabe junto al menú. */}
      {logoSostenedor ? (
        <>
          <Image
            src={logoSostenedor.src}
            alt="SNA Educa"
            width={logoSostenedor.ancho}
            height={logoSostenedor.alto}
            className="hidden h-[3.75rem] w-auto flex-none xl:block"
            preload
          />
          <span aria-hidden className="hidden h-12 w-px flex-none bg-surface-strong xl:block" />
        </>
      ) : null}
      <Link ref={marcaRef} href="/" className="flex min-h-12 flex-none items-center gap-3 text-ink no-underline">
        {logoLiceo ? (
          <Image
            src={logoLiceo.src}
            alt=""
            width={logoLiceo.ancho}
            height={logoLiceo.alto}
            className="h-12 w-auto"
            preload
          />
        ) : null}
        <span className="flex flex-col leading-[1.05]">
          <span className="whitespace-nowrap text-[0.9375rem] font-extrabold tracking-[-0.02em]">Liceo Bicentenario Industrial</span>
          <span className="whitespace-nowrap text-small font-semibold text-muted">Ing. Ricardo Fenner Ruedi · La Unión</span>
          {/* El nombre accesible empieza con el texto visible (WCAG 2.5.3). */}
          <span className="sr-only">, ir al inicio</span>
        </span>
      </Link>
      {/*
        Programa Liceos Bicentenario, tras otra línea fina. Solo cuando cabe junto al
        menú: el encabezado mide el espacio libre (el ancho del texto cambia entre
        navegadores y con el tamaño de letra del usuario).
      */}
      {logoBicentenario && conBicentenario ? (
        <>
          <span aria-hidden className="h-12 w-px flex-none bg-surface-strong" />
          <Image
            src={logoBicentenario.src}
            alt={logoBicentenario.alt}
            width={logoBicentenario.ancho}
            height={logoBicentenario.alto}
            className="h-9 w-auto flex-none"
            unoptimized
          />
        </>
      ) : null}
    </div>
  );
}

function Desplegable({
  item,
  abierto,
  onToggle,
  onCerrar,
  activo,
}: {
  item: ItemNavegacion;
  abierto: boolean;
  onToggle: () => void;
  onCerrar: () => void;
  activo: boolean;
}) {
  const panelId = useId();
  return (
    <li className="relative">
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={panelId}
        onClick={onToggle}
        className={`link-linea flex min-h-11 items-center gap-1 whitespace-nowrap px-2 text-[0.9375rem] font-semibold ${activo ? "text-accent" : "text-ink"}`}
      >
        {item.etiqueta}
        <ChevronDown
          aria-hidden
          className={`size-4 transition-transform duration-200 ease-[var(--ease-out)] ${abierto ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        hidden={!abierto}
        className="menu-panel absolute left-0 top-full z-50 mt-2 w-80 bg-bg p-2 shadow-[0_18px_40px_-12px_rgb(29_26_28/0.35)]"
      >
        <ul>
          {item.hijos?.map((hijo, i) => (
            <li key={hijo.href} style={{ ["--i" as string]: i }}>
              <Link
                href={hijo.href}
                onClick={onCerrar}
                className="block px-3 py-2.5 no-underline hover:bg-surface focus-visible:bg-surface"
              >
                <span className="block font-semibold text-ink">{hijo.etiqueta}</span>
                {hijo.descripcion ? <span className="block text-small text-muted">{hijo.descripcion}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState<string | null>(null);
  const [menuMovil, setMenuMovil] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const filaRef = useRef<HTMLDivElement>(null);
  const marcaRef = useRef<HTMLAnchorElement>(null);
  const [cabeBicentenario, setCabeBicentenario] = useState(false);

  useEffect(() => {
    const fila = filaRef.current;
    if (!fila || !logoBicentenario) return;
    // El menú está alineado a la derecha: su borde izquierdo no depende de si el logo se ve.
    const medir = () => {
      const nav = navRef.current;
      const marca = marcaRef.current;
      if (!nav || !marca || getComputedStyle(nav).display === "none") return setCabeBicentenario(false);
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const estilo = getComputedStyle(fila);
      const bordeMenu = fila.getBoundingClientRect().right - parseFloat(estilo.paddingRight) - nav.offsetWidth;
      const libre = bordeMenu - parseFloat(estilo.columnGap) - marca.getBoundingClientRect().right;
      setCabeBicentenario(libre >= ANCHO_BICENTENARIO_REM * rem);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(fila);
    document.fonts?.ready.then(medir);
    return () => observador.disconnect();
  }, []);
  const botonMovilRef = useRef<HTMLButtonElement>(null);
  const cerrar = useCallback(() => {
    setAbierto(null);
    setMenuMovil(false);
  }, []);

  // Con Cache Components la ruta anterior queda montada: cerrar al navegar
  // (ajuste de estado durante el render, el patrón recomendado por React).
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (pathname !== rutaPrevia) {
    setRutaPrevia(pathname);
    setAbierto(null);
    setMenuMovil(false);
  }

  useEffect(() => {
    if (!abierto && !menuMovil) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const eraMovil = menuMovil;
        cerrar();
        if (eraMovil) botonMovilRef.current?.focus();
      }
    };
    const alClic = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setAbierto(null);
    };
    document.addEventListener("keydown", alTeclear);
    document.addEventListener("click", alClic);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("click", alClic);
    };
  }, [abierto, menuMovil, cerrar]);

  useEffect(() => {
    document.documentElement.style.overflow = menuMovil ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuMovil]);

  return (
    <header className="header-flotante sticky top-0 z-40 bg-bg" style={{ viewTransitionName: "site-header" }}>
      <a
        href="#contenido"
        className="btn btn-ink absolute left-[var(--gutter)] top-2 z-50 -translate-y-24 focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <div ref={filaRef} className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-6 px-[var(--gutter)] py-2.5">
        <Marca marcaRef={marcaRef} conBicentenario={cabeBicentenario} />

        <nav ref={navRef} aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {navegacionPrincipal.map((item) =>
              item.hijos ? (
                <Desplegable
                  key={item.href}
                  item={item}
                  abierto={abierto === item.href}
                  activo={estaActivo(pathname, item.href)}
                  onToggle={() => setAbierto((a) => (a === item.href ? null : item.href))}
                  onCerrar={cerrar}
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={estaActivo(pathname, item.href) ? "page" : undefined}
                    className={`link-linea flex min-h-11 items-center whitespace-nowrap px-2 text-[0.9375rem] font-semibold no-underline aria-[current=page]:text-accent ${
                      estaActivo(pathname, item.href) ? "" : "text-ink"
                    }`}
                  >
                    {item.etiqueta}
                  </Link>
                </li>
              ),
            )}
            <li className="ml-2">
              <Link href={accionPrincipal.href} className="btn btn-primary">
                {accionPrincipal.etiqueta}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={botonMovilRef}
          type="button"
          className="flex size-12 items-center justify-center lg:hidden"
          aria-expanded={menuMovil}
          aria-controls="menu-movil"
          onClick={() => setMenuMovil((v) => !v)}
        >
          {menuMovil ? <X aria-hidden className="size-7" /> : <Menu aria-hidden className="size-7" />}
          <span className="sr-only">{menuMovil ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      <nav
        id="menu-movil"
        aria-label="Principal"
        hidden={!menuMovil}
        className="menu-movil fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto overscroll-contain bg-bg px-[var(--gutter)] pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 lg:hidden"
      >
        <ul className="flex flex-col gap-6">
          {navegacionPrincipal.map((item, i) => (
            <li key={item.href} style={{ ["--i" as string]: i }}>
              <Link
                href={item.href}
                onClick={cerrar}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-1 text-[1.75rem] font-extrabold tracking-[-0.03em] text-ink no-underline aria-[current=page]:text-accent"
              >
                {item.etiqueta}
              </Link>
              {item.hijos ? (
                <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {item.hijos
                    .filter((h) => h.href !== item.href)
                    .map((hijo) => (
                      <li key={hijo.href}>
                        <Link
                          href={hijo.href}
                          onClick={cerrar}
                          aria-current={pathname === hijo.href ? "page" : undefined}
                          className="flex min-h-11 items-center font-semibold text-muted no-underline aria-[current=page]:text-accent"
                        >
                          {hijo.etiqueta}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li style={{ ["--i" as string]: navegacionPrincipal.length }}>
            <Link href={accionPrincipal.href} onClick={cerrar} className="btn btn-primary w-full">
              {accionPrincipal.etiqueta}
            </Link>
          </li>
        </ul>
      </nav>
      <div aria-hidden className="progreso-lectura pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-accent" />
    </header>
  );
}
