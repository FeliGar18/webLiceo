import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Movimiento } from "@/components/layout/Movimiento";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { institucion, siteUrl } from "@/content/institucion";
import { jsonLdInstitucion, serializarJsonLd } from "@/lib/seo";
import "./globals.css";
import "./motion.css";

/*
 * Schibsted Grotesk (SIL Open Font License, ver fuentes/OFL.txt), alojada en
 * el propio proyecto: el build no descarga nada de Google Fonts, cuya descarga
 * fallaba a veces en Vercel. Es una fuente variable: un archivo cubre los pesos
 * 400 a 800, con el subconjunto latino (incluye tildes, ñ, ¿, ¡ y «»).
 */
const schibsted = localFont({
  src: "./fuentes/SchibstedGrotesk-latin.woff2",
  variable: "--font-schibsted",
  weight: "400 800",
  display: "swap",
});

const descripcion =
  "Liceo técnico-profesional de La Unión, Región de Los Ríos. Especialidades de Edificación, Electricidad, Mecánica Automotriz, Construcciones Metálicas e Instalaciones Sanitarias.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: institucion.nombreOficial,
    template: `%s · ${institucion.nombreCorto}`,
  },
  description: descripcion,
  applicationName: institucion.nombreCorto,
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: institucion.nombreOficial,
    title: institucion.nombreOficial,
    description: descripcion,
    url: "/",
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f2ee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" data-scroll-behavior="smooth" className={`${schibsted.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLdInstitucion()) }}
        />
        <SiteHeader />
        {/* Al navegar, el contenido de <main> cambia y se anima como "pagina"
            (ver motion.css). El encabezado queda fijo como referencia. */}
        <ViewTransition update="pagina" default="none">
          <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
        </ViewTransition>
        <Movimiento />
        <SiteFooter />
      </body>
    </html>
  );
}
