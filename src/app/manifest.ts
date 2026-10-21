import type { MetadataRoute } from "next";
import { institucion } from "@/content/institucion";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: institucion.nombreOficial,
    short_name: "Liceo Fenner",
    description: `Liceo técnico-profesional de ${institucion.comuna}, ${institucion.region}.`,
    lang: "es-CL",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#f3f2ee",
    theme_color: "#94150f",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
