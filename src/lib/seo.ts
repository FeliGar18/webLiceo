import type { Metadata } from "next";
import { institucion, siteUrl } from "@/content/institucion";

/** Metadatos por página, con URL canónica y Open Graph coherentes. */
export function crearMetadata({
  titulo,
  descripcion,
  ruta,
  imagen,
}: {
  titulo: string;
  descripcion: string;
  /** Ruta absoluta dentro del sitio, p. ej. "/admision". */
  ruta: string;
  /** Ruta pública de una imagen para compartir; si falta se usa la general. */
  imagen?: string;
}): Metadata {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_CL",
      siteName: institucion.nombreOficial,
      title: titulo,
      description: descripcion,
      url: ruta,
      ...(imagen ? { images: [{ url: imagen }] } : {}),
    },
  };
}

/** Datos estructurados schema.org del establecimiento (solo datos verificados). */
export function jsonLdInstitucion() {
  return {
    "@context": "https://schema.org",
    "@type": "HighSchool",
    name: institucion.nombreOficial,
    url: siteUrl(),
    logo: `${siteUrl()}/brand/logo-liceo.png`,
    email: institucion.correos[0].valor,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector San Javier km 7, Ruta T-74",
      addressLocality: institucion.comuna,
      addressRegion: institucion.region,
      addressCountry: "CL",
    },
    parentOrganization: {
      "@type": "Organization",
      name: institucion.sostenedor.nombre,
      url: institucion.sostenedor.sitio,
    },
    sameAs: institucion.redes.map((r) => r.href),
  };
}

/** Serializa JSON-LD de forma segura para incrustarlo en un <script>. */
export function serializarJsonLd(datos: unknown): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
