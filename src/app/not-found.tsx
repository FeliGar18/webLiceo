import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

const ENLACES = [
  { etiqueta: "Especialidades", href: "/especialidades", texto: "Las cinco especialidades técnico-profesionales." },
  { etiqueta: "Admisión", href: "/admision", texto: "Cómo postular al liceo." },
  { etiqueta: "Documentos", href: "/documentos", texto: "Proyecto educativo y reglamentos." },
  { etiqueta: "Contacto", href: "/contacto", texto: "Correos, dirección y formulario." },
];

export default function NotFound() {
  return (
    <Container className="grid gap-12 py-[var(--section-gap)] lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h1 className="text-[clamp(2.5rem,1.4rem+4.6vw,5.75rem)]">No encontramos esta página</h1>
        <p className="mt-6 max-w-[48ch] text-lead leading-snug">
          Puede que la dirección esté mal escrita o que la página se haya movido.
        </p>
        <Link href="/" className="btn btn-primary mt-10">
          Volver al inicio
        </Link>
      </div>
      <nav aria-labelledby="nf-enlaces" className="chamfer chamfer-lg bg-surface p-8 sm:p-10 lg:col-span-5 lg:col-start-8">
        <h2 id="nf-enlaces" className="text-lead">
          Quizás buscaba
        </h2>
        <ul className="mt-6 grid gap-5">
          {ENLACES.map((e) => (
            <li key={e.href} className="flex items-baseline gap-3">
              <span aria-hidden className="bullet text-accent" />
              <span>
                <Link href={e.href} className="font-semibold text-accent underline">
                  {e.etiqueta}
                </Link>
                <span className="block text-muted">{e.texto}</span>
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
