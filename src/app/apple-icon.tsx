import { ImageResponse } from "next/og";

/*
 * Icono del sitio: cuadrado granate con una "F" blanca gruesa dibujada con
 * bloques (sin fuentes). No reproduce ni altera la insignia oficial, que a
 * tamaño de favicon sería ilegible.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

function LetraF({ lado }: { lado: number }) {
  const u = lado / 100;
  const bloque = (left: number, top: number, width: number, height: number) => (
    <div
      style={{
        position: "absolute",
        left: left * u,
        top: top * u,
        width: width * u,
        height: height * u,
        background: "#ffffff",
      }}
    />
  );
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#94150f" }}>
      {bloque(30, 20, 17, 60)}
      {bloque(30, 20, 44, 15)}
      {bloque(30, 44, 34, 14)}
    </div>
  );
}

export default function AppleIcon() {
  return new ImageResponse(<LetraF lado={size.width} />, { ...size });
}
