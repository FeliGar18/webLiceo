"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { accionPrincipal, navegacionPrincipal } from "@/content/navegacion";
import { logoLiceo } from "@/content/marca";
import type { ItemNavegacion } from "@/lib/types";

function estaActivo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function Marca() {
  return (
    <Link href="/" className="flex min-h-12 items-center gap-3 text-ink no-underline" aria-label="Inicio, Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi">
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
        <span className="text-[0.9375rem] font-extrabold tracking-[-0.02em]">Liceo Bicentenario Industrial</span>
        <span className="text-small font-semibold text-muted">Ing. Ricardo Fenner Ruedi · La Unión</span>
      </span>
    </Link>
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
        className={`link-linea flex min-h-11 items-center gap-1 px-3 font-semibold ${activo ? "text-accent" : "text-ink"}`}
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
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-6 px-[var(--gutter)] py-2.5">
        <Marca />

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
                    className={`link-linea flex min-h-11 items-center px-3 font-semibold no-underline aria-[current=page]:text-accent ${
                      estaActivo(pathname, item.href) ? "" : "text-ink"
                    }`}
                  >
                    {item.etiqueta}
                  </Link>
                </li>
              ),
            )}
            <li className="ml-3">
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
