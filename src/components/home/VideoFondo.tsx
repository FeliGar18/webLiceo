"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { VideoFondo as Datos } from "@/content/portada";

/**
 * Video decorativo de fondo, silencioso y en bucle.
 *
 * - No se reproduce solo si el visitante pidió reducir el movimiento o activó
 *   el ahorro de datos: queda el póster.
 * - Se pausa cuando sale de la pantalla (ahorra batería y CPU).
 * - Botón visible para pausarlo o reanudarlo (WCAG 2.2.2).
 * - Es decorativo: oculto para lectores de pantalla; el botón sí es accesible.
 */
export function VideoFondo({ datos }: { datos: Datos }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(true);
  const pausadoPorUsuario = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducido || conexion?.saveData) {
      pausadoPorUsuario.current = true;
      return;
    }

    const reproducir = () => {
      video.play().then(
        () => setPausado(false),
        () => setPausado(true),
      );
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (pausadoPorUsuario.current) return;
        if (entrada.isIntersecting) reproducir();
        else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observador.observe(video);
    return () => observador.disconnect();
  }, []);

  function alternar() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      pausadoPorUsuario.current = false;
      video.play().then(
        () => setPausado(false),
        () => setPausado(true),
      );
    } else {
      pausadoPorUsuario.current = true;
      video.pause();
      setPausado(true);
    }
  }

  return (
    <>
      <video
        ref={ref}
        aria-hidden
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="metadata"
        poster={datos.poster}
        width={datos.ancho}
        height={datos.alto}
        className="video-fondo absolute inset-0 size-full object-cover"
      >
        <source src={datos.webm} type="video/webm" />
        {datos.mp4 ? <source src={datos.mp4} type="video/mp4" /> : null}
      </video>
      <button
        type="button"
        onClick={alternar}
        className="btn absolute right-[var(--gutter)] top-4 z-10 min-h-11 bg-[rgb(29_26_28/0.7)] px-3 text-small text-bg hover:bg-[rgb(29_26_28/0.9)]"
      >
        {pausado ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
        {pausado ? "Reproducir video" : "Pausar video"}
      </button>
    </>
  );
}
