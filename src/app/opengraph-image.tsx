import { ImageResponse } from "next/og";
import { institucion } from "@/content/institucion";

/* Imagen para compartir en redes. Sin fuentes remotas: usa la fuente integrada de next/og. */
export const alt = `${institucion.nombreOficial}, ${institucion.comuna}, ${institucion.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORES_ESPECIALIDAD = ["#8a4a2b", "#f2cf1d", "#1d7a36", "#93ada9", "#2142b8"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#94150f",
          color: "#ffffff",
          padding: "72px 80px 0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {institucion.nombreOficial}
          </div>
          <div style={{ marginTop: 32, fontSize: 34 }}>La Unión · Región de Los Ríos</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {COLORES_ESPECIALIDAD.map((c) => (
            <div key={c} style={{ flex: 1, height: 96, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
