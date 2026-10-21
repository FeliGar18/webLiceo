"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { Foto } from "@/components/ui/Foto";
import { EtiquetaProvisional } from "@/components/ui/Pendiente";
import type { CategoriaNoticia, Imagen } from "@/lib/types";
import { categoriasNoticia } from "./categorias";

export type ItemNoticia = {
  slug: string;
  titulo: string;
  fechaIso: string;
  /** Fecha ya formateada en el servidor (evita diferencias al hidratar). */
  fechaTexto: string;
  categoria: CategoriaNoticia;
  bajada: string;
  ejemplo: boolean;
  imagen?: Imagen;
};

type Filtro = CategoriaNoticia | "Todas";

function contarNoticias(n: number) {
  return n === 1 ? "1 noticia" : `${n} noticias`;
}

function Meta({ item, className = "" }: { item: ItemNoticia; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-small ${className}`}>
      <time dateTime={item.fechaIso} className="tabular font-semibold">
        {item.fechaTexto}
      </time>
      <span className="inline-flex items-center gap-2 text-muted">
        <span aria-hidden className="bullet text-accent" />
        {item.categoria}
      </span>
      {item.ejemplo ? <EtiquetaProvisional>Texto de ejemplo</EtiquetaProvisional> : null}
    </p>
  );
}

function Destacada({ item }: { item: ItemNoticia }) {
  return (
    <article className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
      <div
        className={`chamfer chamfer-lg bg-surface p-6 sm:p-10 lg:p-14 ${item.imagen ? "lg:col-span-7" : "lg:col-span-12"}`}
      >
        <Meta item={item} />
        <h2 className="mt-6 max-w-[22ch] text-head">
          <Link
            href={`/noticias/${item.slug}`}
            className="text-ink no-underline after:absolute after:inset-0 hover:underline"
          >
            {item.titulo}
          </Link>
        </h2>
        <p className="mt-6 max-w-[56ch] text-lead leading-snug">{item.bajada}</p>
        <p aria-hidden className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">
          Leer noticia
          <ArrowRight aria-hidden className="flecha size-5" />
        </p>
      </div>
      {item.imagen ? (
        <Foto imagen={item.imagen} className="lg:col-span-5" sizes="(min-width: 1024px) 40vw, 100vw" />
      ) : null}
    </article>
  );
}

export function ListadoNoticias({ items }: { items: ItemNoticia[] }) {
  const [filtro, setFiltro] = useState<Filtro>("Todas");
  const idTituloResto = useId();


  const opciones: { valor: Filtro; cantidad: number }[] = [
    { valor: "Todas", cantidad: items.length },
    ...categoriasNoticia.map((c) => ({ valor: c, cantidad: items.filter((i) => i.categoria === c).length })),
  ];

  const visibles = filtro === "Todas" ? items : items.filter((i) => i.categoria === filtro);
  const [primera, ...resto] = visibles;

  return (
    <div>
      <div role="group" aria-label="Filtrar noticias por categoría" className="flex flex-wrap gap-2">
        {opciones.map((o) => {
          const activo = filtro === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              aria-pressed={activo}
              onClick={() => setFiltro(o.valor)}
              className={`btn min-h-11 px-4 py-2 ${activo ? "btn-ink" : "bg-surface text-ink hover:bg-surface-strong"}`}
            >
              {o.valor}
              <span className={`tabular text-small ${activo ? "" : "text-muted"}`}>{o.cantidad}</span>
            </button>
          );
        })}
      </div>

      <p role="status" className="mt-4 text-small text-muted">
        {filtro === "Todas"
          ? `${contarNoticias(visibles.length)} en total`
          : `${contarNoticias(visibles.length)} en ${filtro}`}
      </p>

      {primera ? (
        <div className="mt-10">
          <Destacada item={primera} />
        </div>
      ) : (
        <section aria-labelledby={`${idTituloResto}-vacio`} className="chamfer mt-10 bg-surface p-6 sm:p-10">
          <h2 id={`${idTituloResto}-vacio`} className="max-w-[24ch] text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">
            {filtro === "Todas"
              ? "Aún no hay noticias publicadas"
              : `Aún no hay noticias de ${filtro}`}
          </h2>
          <p className="mt-4 max-w-[52ch]">
            Cuando el liceo publique una noticia en esta categoría, aparecerá aquí. Mientras tanto, puede revisar
            las demás.
          </p>
          {filtro !== "Todas" ? (
            <button type="button" className="btn btn-ink mt-6" onClick={() => setFiltro("Todas")}>
              Ver todas las noticias
            </button>
          ) : null}
        </section>
      )}

      {resto.length > 0 ? (
        <section aria-labelledby={idTituloResto} className="mt-[var(--section-gap)]">
          <h2 id={idTituloResto} className="text-head">
            Noticias anteriores
          </h2>
          <ol className="mt-12 space-y-12 sm:space-y-14">
            {resto.map((item) => (
              <li key={item.slug} className="relative grid gap-3 md:grid-cols-12 md:gap-8">
                <Meta item={item} className="md:col-span-4 lg:col-span-3 md:flex-col md:items-start" />
                <div className="md:col-span-8 lg:col-span-9">
                  <h3 className="max-w-[30ch] text-lead leading-tight tracking-[-0.025em]">
                    <Link
                      href={`/noticias/${item.slug}`}
                      className="text-ink no-underline after:absolute after:inset-0 hover:underline"
                    >
                      {item.titulo}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[60ch]">{item.bajada}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
