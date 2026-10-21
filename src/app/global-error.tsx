"use client";

/*
 * Último recurso: reemplaza al layout raíz cuando este falla, por lo que no
 * tiene los estilos globales. Estilos mínimos en línea y sin detalles del error.
 */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="es-CL">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "#f3f2ee",
          color: "#1d1a1c",
          fontFamily: "system-ui, sans-serif",
          padding: "1.5rem",
        }}
      >
        <title>Error · Liceo Industrial Fenner</title>
        <main style={{ maxWidth: "36rem" }}>
          <h1 style={{ fontSize: "2.25rem", lineHeight: 1.05, margin: 0 }}>El sitio no pudo cargarse</h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.5, marginTop: "1rem" }}>
            Inténtelo de nuevo en unos momentos.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              minHeight: "3rem",
              padding: "0.75rem 1.4rem",
              border: 0,
              background: "#94150f",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
