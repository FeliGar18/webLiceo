import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCarpetas } from "@/components/home/HeroCarpetas";
import { Marquesina } from "@/components/home/Marquesina";
import { VideoFondo } from "@/components/home/VideoFondo";
import {
  Accesos,
  BandaAdmision,
  ListaEspecialidades,
  Presentacion,
  Proyectos,
  Recursos,
  UltimasNoticias,
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
              </span>
              <span className="intro-line" style={{ ["--i" as string]: 1 }}>
                <span>Industrial</span>
              </span>
            </h1>
            <p className="intro-fade mt-8 max-w-[44ch] text-lead leading-snug text-[#ece8ea]" style={{ ["--i" as string]: 0 }}>
              Ingeniero Ricardo Fenner Ruedi. Educación media técnico-profesional en San Javier, La Unión, Región de
              Los Ríos, desde 1996.
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

      <Presentacion />
      <ListaEspecialidades />
      <Marquesina />
      <BandaAdmision />
      <UltimasNoticias />
      <Proyectos />
      <Accesos />
      <Recursos />
      <Ubicacion />
    </>
  );
}
