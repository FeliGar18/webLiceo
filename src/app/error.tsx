"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

/*
 * Error inesperado dentro de una página. Al visitante no se le muestra el
 * mensaje ni la pila del error (en producción Next.js ya los reemplaza por un
 * identificador `digest`, que sí se registra para cruzarlo con los logs).
 */
export default function ErrorPagina({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;
    console.error("[sitio] Error al mostrar la página", digest ? `(digest ${digest})` : "");
  }, [error]);

  return (
    <Container className="py-[var(--section-gap)]">
      <h1 className="max-w-[18ch] text-[clamp(2.5rem,1.4rem+4.6vw,5.75rem)]">Algo falló al cargar esta página</h1>
      <p className="mt-6 max-w-[52ch] text-lead leading-snug">
        Fue un problema nuestro, no suyo. Inténtelo de nuevo; si el error continúa, vuelva más tarde.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button type="button" onClick={() => retry()} className="btn btn-primary">
          Reintentar
        </button>
        <Link href="/" className="btn bg-surface text-ink hover:bg-surface-strong">
          Ir al inicio
        </Link>
      </div>
    </Container>
  );
}
