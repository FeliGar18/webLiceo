import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cifras } from "@/components/home/Cifras";
import { FranjaContacto } from "@/components/home/FranjaContacto";
import { HeroCarpetas } from "@/components/home/HeroCarpetas";
import { Marquesina } from "@/components/home/Marquesina";
import { NoticiasPortada } from "@/components/home/NoticiasPortada";
import { VideoFondo } from "@/components/home/VideoFondo";
import {
  Accesos,
  BandaAdmision,
  ListaEspecialidades,
  Proyectos,
  Recursos,
  Ubicacion,
} from "@/components/home/Secciones";
import { Container } from "@/components/ui/Container";
import { especialidades } from "@/content/especialidades";
import { institucion } from "@/content/institucion";
import { logoLiceo } from "@/content/marca";
import { videoPortada } from "@/content/portada";
import { crearMetadata } from "@/lib/seo";

export const metadata = {
  ...crearMetadata({
    titulo: institucion.nombreOficial,
    descripcion:
      "Liceo técnico-profesional de La Unión, Región de Los Ríos: Edificación, Electricidad, Mecánica Automotriz, Construcciones Metálicas e Instalaciones Sanitarias. Admisión por el SAE.",
    ruta: "/",
  }),
  title: { absolute: institucion.nombreOficial },
};

export default function Inicio() {
  return (
    <>
      <FranjaContacto />
      <section aria-labelledby="titulo-inicio" data-sin-rv className="overflow-hidden bg-ink text-bg on-dark">
        <div className="relative isolate">
          {videoPortada ? (
            <>
              <VideoFondo datos={videoPortada} />
              {/* Velo neutro para que el texto conserve el contraste sobre el video. */}
              <div aria-hidden className="absolute inset-0 bg-ink/75" />
            </>
          ) : null}
        <Container className="relative grid gap-10 pb-16 pt-20 sm:pt-24 lg:grid-cols-12 lg:items-end lg:pb-24">
          <div className="lg:col-span-9">
            <h1
              id="titulo-inicio"
              className="text-[clamp(2.05rem,0.4rem+7.4vw,7.25rem)] leading-[0.92] tracking-[-0.05em]"
            >
              <span className="intro-line" style={{ ["--i" as string]: 0 }}>
                <span>Liceo Bicentenario</span>
              </span>{" "}
              <span className="intro-line" style={{ ["--i" as string]: 1 }}>
                <span>Industrial</span>
              </span>{" "}
              {/* Nombre completo del liceo: tercera línea del título, a menor escala. */}
              <span
                className="intro-line mt-4 text-[clamp(1.375rem,0.75rem+2.7vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-[#ece8ea] sm:mt-5"
                style={{ ["--i" as string]: 2 }}
              >
                <span>Ingeniero Ricardo Fenner Ruedi</span>
              </span>
            </h1>
            <p className="intro-fade mt-7 max-w-[44ch] text-lead leading-snug text-[#ece8ea]" style={{ ["--i" as string]: 0 }}>
              Educación media técnico-profesional en La Unión, Región de Los Ríos, desde 1996.
            </p>
            <Link href="/admision" className="intro-fade btn btn-primary mt-8" style={{ ["--i" as string]: 1 }}>
              Cómo postular
              <ArrowRight aria-hidden className="flecha size-4" />
            </Link>
          </div>
          {logoLiceo ? (
            <div className="intro-insignia hidden justify-end lg:col-span-3 lg:flex">
              <Image
                src={logoLiceo.src}
                alt={logoLiceo.alt}
                width={logoLiceo.ancho}
                height={logoLiceo.alto}
                className="h-auto w-full max-w-[13rem]"
                preload
              />
            </div>
          ) : null}
        </Container>
        </div>
        <HeroCarpetas especialidades={especialidades} />
      </section>

      <Cifras />
      <NoticiasPortada />
      <ListaEspecialidades />
      <Marquesina />
      <BandaAdmision />
      <Proyectos />
      <Accesos />
      <Recursos />
      <Ubicacion />
    </>
  );
}
