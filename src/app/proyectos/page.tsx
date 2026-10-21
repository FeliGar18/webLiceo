import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { Foto } from "@/components/ui/Foto";
import { EtiquetaProvisional, Pendiente } from "@/components/ui/Pendiente";
import { proyectos } from "@/content/proyectos";
import { crearMetadata } from "@/lib/seo";
import type { Proyecto } from "@/lib/types";

export const metadata = crearMetadata({
  titulo: "Proyectos y actividades",
  descripcion:
    "Hitos, proyectos y actividades del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi, con su fuente oficial.",
  ruta: "/proyectos",
});

/**
 * Mosaico escalonado en cuatro columnas (escritorio): cada ciclo de tres filas
 * ubica seis tiles de distinto ancho y deja celdas vacías a propósito.
 * La celda vacía de la primera fila (columna 3) la ocupa el título.
 */
const ciclo = [
  { col: "1 / span 2", fila: 1, ancho: true },
  { col: "4 / span 1", fila: 1, ancho: false },
  { col: "2 / span 1", fila: 2, ancho: false },
  { col: "3 / span 1", fila: 2, ancho: false },
  { col: "3 / span 2", fila: 3, ancho: true },
  { col: "1 / span 1", fila: 3, ancho: false },
];

const campos = [
  "bg-accent text-accent-ink on-dark",
  "bg-ink text-bg on-dark",
  "bg-surface-strong text-ink",
];

function posicion(i: number) {
  const base = ciclo[i % ciclo.length];
  const fila = base.fila + Math.floor(i / ciclo.length) * 3;
  return { ...base, fila };
}

function Tile({ proyecto: p, indice }: { proyecto: Proyecto; indice: number }) {
  const { col, fila, ancho } = posicion(indice);
  const campo = campos[indice % campos.length];
  // En móvil, los tiles angostos se alternan a izquierda y derecha.
  const lado = indice % 2 === 0 ? "justify-self-start" : "justify-self-end";
  const estilo = { "--col": col, "--fila": String(fila) } as CSSProperties;

  return (
    <article
      style={estilo}
      className={`reveal chamfer chamfer-lg flex flex-col overflow-hidden ${campo} ${
        ancho ? "w-full" : `w-[88%] sm:w-[70%] ${lado}`
      } lg:w-full lg:[grid-column:var(--col)] lg:[grid-row:var(--fila)] ${ancho ? "lg:min-h-[24rem]" : "lg:min-h-[30rem]"}`}
    >
      {p.imagen ? <Foto imagen={p.imagen} forma="none" aspecto="aspect-[3/2]" sizes="(min-width: 1024px) 40vw, 90vw" /> : null}
      <div className="flex flex-1 flex-col justify-between gap-10 p-6 sm:p-8">
        {p.periodo ? (
          <p
            className={`tabular font-extrabold leading-[0.95] tracking-[-0.04em] ${
              ancho ? "text-[clamp(2.75rem,1.6rem+3.6vw,5rem)]" : "text-[clamp(2.25rem,1.6rem+1.8vw,3.25rem)]"
            }`}
          >
            {p.periodo}
          </p>
        ) : null}
        <div>
          {p.ejemplo ? (
            <p className="mb-3">
              <EtiquetaProvisional>Texto de ejemplo</EtiquetaProvisional>
            </p>
          ) : null}
          <h3 className="max-w-[24ch] text-lead leading-tight tracking-[-0.02em]">{p.titulo}</h3>
          <p className="mt-3 max-w-[46ch]">{p.descripcion}</p>
          {p.fuente ? <p className="mt-5 max-w-[46ch] text-small opacity-90">Fuente: {p.fuente}.</p> : null}
        </div>
      </div>
    </article>
  );
}

export default function ProyectosPage() {
  return (
    <>
      <Encabezado
        titulo="Proyectos y actividades"
        migas={[{ etiqueta: "Proyectos", href: "/proyectos" }]}
        bajada="Hitos del liceo que constan en sus documentos oficiales, y el espacio para sus proyectos actuales."
      />

      <section aria-labelledby="hitos">
        <Container>
          {proyectos.length === 0 ? (
            <>
              <h2 id="hitos" className="text-head">
                Hitos del liceo
              </h2>
              <Pendiente className="mt-8">Aún no hay hitos publicados.</Pendiente>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <div className="mb-6 lg:col-start-3 lg:row-start-1 lg:mb-0 lg:self-end lg:pb-2">
                <h2 id="hitos" className="text-head">
                  Hitos del liceo
                </h2>
                <p className="mt-4 max-w-[34ch] text-muted">
                  Cada hito cita el documento oficial donde consta.
                </p>
              </div>
              {proyectos.map((p, i) => (
                <Tile key={p.slug} proyecto={p} indice={i} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section aria-labelledby="proyectos-actuales" className="mt-[var(--section-gap)]">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="proyectos-actuales" className="max-w-[16ch] text-head">
              Proyectos actuales de innovación
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[52ch] text-lead leading-snug">
              Este espacio está reservado para los proyectos que el liceo desarrolla hoy en sus especialidades.
            </p>
            <Pendiente className="mt-8">
              El liceo cargará aquí sus proyectos en curso, con su período, la especialidad que lo impulsa y una fuente
              que lo respalde.
            </Pendiente>
          </div>
        </Container>
      </section>
    </>
  );
}
