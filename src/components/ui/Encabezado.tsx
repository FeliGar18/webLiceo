import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";

export type Miga = { etiqueta: string; href: string };

/**
 * Apertura de las páginas internas: migas de pan, título de dos líneas como
 * máximo y una bajada. A la derecha puede llevar una figura o un dato.
 */
export function Encabezado({
  titulo,
  bajada,
  migas = [],
  aparte,
  colorFondo,
  colorTinta,
}: {
  titulo: string;
  bajada?: ReactNode;
  migas?: Miga[];
  aparte?: ReactNode;
  /** Color de campo (variable CSS) para abrir la página con un bloque de color. */
  colorFondo?: string;
  colorTinta?: string;
}) {
  return (
    <div
      className={colorFondo ? "pb-16 pt-10 sm:pb-24" : "pb-10 pt-10 sm:pb-16"}
      style={colorFondo ? { background: colorFondo, color: colorTinta } : undefined}
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {migas.length > 0 ? (
            <nav aria-label="Migas de pan" className="intro-fade mb-8" style={{ ["--i" as string]: -3 }}>
              <ol className="flex flex-wrap items-center gap-x-2 text-small font-semibold">
                <li>
                  <Link href="/" className="opacity-90 hover:opacity-100" style={{ color: "inherit" }}>
                    Inicio
                  </Link>
                </li>
                {migas.map((m) => (
                  <li key={m.href} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    <Link href={m.href} style={{ color: "inherit" }}>
                      {m.etiqueta}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <h1 className="text-[clamp(2.5rem,1.4rem+4.6vw,5.75rem)]">
            <span className="intro-line">
              <span>{titulo}</span>
            </span>
          </h1>
          {bajada ? (
            <div className="intro-fade mt-6 max-w-[52ch] text-lead leading-snug" style={{ ["--i" as string]: -1 }}>
              {bajada}
            </div>
          ) : null}
        </div>
        {aparte ? (
          <div className="intro-insignia lg:col-span-5">{aparte}</div>
        ) : null}
      </Container>
    </div>
  );
}

/** Encabezado de sección dentro de una página. */
export function TituloSeccion({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`text-head ${className}`}>
      {children}
    </h2>
  );
}
