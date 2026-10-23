import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { Container } from "@/components/ui/Container";
import { Encabezado, TituloSeccion } from "@/components/ui/Encabezado";
import { EtiquetaProvisional, Pendiente } from "@/components/ui/Pendiente";
import { institucion } from "@/content/institucion";
import { LIMITES, PERFILES } from "@/lib/contacto/schema";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Contacto y ubicación",
  descripcion: `Dirección, correos y formulario de contacto del ${institucion.nombreOficial}, en ${institucion.comuna}, ${institucion.region}.`,
  ruta: "/contacto",
});

const secretaria = institucion.correos[0].valor;

/*
 * Perforación del cupón: cuadritos del color de fondo sobre el granate.
 * Vertical en escritorio, horizontal en móvil. Patrón SVG, sin degradados.
 */
function Perforacion() {
  return (
    <>
      <svg aria-hidden focusable="false" className="block h-2 w-full lg:hidden">
        <defs>
          <pattern id="perforacion-h" width="16" height="8" patternUnits="userSpaceOnUse">
            <rect x="4" width="8" height="8" fill="var(--bg)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#perforacion-h)" />
      </svg>
      <svg aria-hidden focusable="false" className="hidden h-full w-2 lg:block">
        <defs>
          <pattern id="perforacion-v" width="8" height="16" patternUnits="userSpaceOnUse">
            <rect y="4" width="8" height="8" fill="var(--bg)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#perforacion-v)" />
      </svg>
    </>
  );
}

export default function ContactoPage() {
  const telefono = institucion.telefonos[0];

  return (
    <>
      <Encabezado
        titulo="Contacto y ubicación"
        migas={[{ etiqueta: "Contacto", href: "/contacto" }]}
        bajada={
          <p>
            Escriba a secretaría para consultas de admisión, documentos o visitas. El liceo está en el sector
            San Javier, a las afueras de {institucion.comuna}.
          </p>
        }
      />

      {/* Datos de contacto y ubicación */}
      <section aria-labelledby="datos" className="pb-[var(--section-gap)]">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <TituloSeccion id="datos" className="sr-only">
              Datos de contacto
            </TituloSeccion>
            <dl className="grid gap-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="flex items-center gap-2 font-semibold">
                  <Mail aria-hidden className="size-5 text-accent" />
                  Correo
                </dt>
                <dd className="mt-3 grid gap-3">
                  {institucion.correos.map((c) => (
                    <p key={c.valor}>
                      <span className="block text-small text-muted">{c.etiqueta}</span>
                      <a
                        href={`mailto:${c.valor}`}
                        className="inline-flex min-h-11 items-center break-all text-lead font-semibold text-accent underline"
                      >
                        {c.valor}
                      </a>
                    </p>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 font-semibold">
                  <Phone aria-hidden className="size-5 text-accent" />
                  Teléfono
                </dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${telefono.valor.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-11 items-center text-lead font-semibold text-accent underline tabular"
                  >
                    {telefono.valor}
                  </a>
                  {telefono.estado === "por-confirmar" ? (
                    <span className="mt-1 block">
                      <EtiquetaProvisional>Por confirmar</EtiquetaProvisional>
                    </span>
                  ) : null}
                </dd>
              </div>

              <div>
                <dt className="font-semibold">Horario de atención</dt>
                <dd className="mt-3">
                  {institucion.horarioAtencion ? (
                    <p>{institucion.horarioAtencion}</p>
                  ) : (
                    <Pendiente>El liceo publicará pronto su horario de atención.</Pendiente>
                  )}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="font-semibold">Redes sociales</dt>
                <dd className="mt-3 flex flex-wrap gap-3">
                  {institucion.redes.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-surface text-ink hover:bg-surface-strong"
                    >
                      {r.etiqueta}
                      <ExternalLink aria-hidden className="size-4" />
                      <span className="sr-only">(se abre en otra pestaña)</span>
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="chamfer chamfer-lg bg-surface p-8 sm:p-10">
              <h2 className="flex items-start gap-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
                <MapPin aria-hidden className="mt-1 size-8 flex-none text-accent" />
                Cómo llegar
              </h2>
              <address className="mt-6 text-lead not-italic leading-snug">{institucion.direccion.valor}</address>
              <p className="mt-2 text-muted">
                {institucion.comuna}, {institucion.region}
              </p>
              <a
                href={institucion.comoLlegarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8"
              >
                Cómo llegar
                <ExternalLink aria-hidden className="size-4" />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
              <p className="mt-4 text-small text-muted">
                El mapa no se carga en este sitio: Google solo recibe datos si usted abre el enlace.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Formulario: un cupón granate con muescas achaflanadas y perforación. */}
      <section aria-labelledby="escribanos" className="pb-[var(--section-gap)]">
        <Container>
          <div className="on-dark flex flex-col text-accent-ink lg:flex-row">
            <div
              className={
                "bg-accent px-6 py-10 sm:px-10 lg:w-[34%] lg:flex-none lg:py-14 " +
                "[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_var(--chamfer)),calc(100%_-_var(--chamfer))_100%,var(--chamfer)_100%,0_calc(100%_-_var(--chamfer)))] " +
                "lg:[clip-path:polygon(0_0,calc(100%_-_var(--chamfer))_0,100%_var(--chamfer),100%_calc(100%_-_var(--chamfer)),calc(100%_-_var(--chamfer))_100%,0_100%)]"
              }
            >
              <h2 id="escribanos" className="text-head">
                Escríbanos
              </h2>
              <p className="mt-6 max-w-[40ch]">
                Su mensaje llega al correo de secretaría. Responderemos a la dirección que indique.
              </p>
              <p className="mt-4 max-w-[40ch] text-small">
                No incluya datos sensibles, como diagnósticos de salud o RUN de estudiantes. Para trámites
                formales, acuda al liceo.
              </p>
            </div>

            <div
              className={
                "bg-accent [clip-path:inset(0_var(--chamfer))] lg:[clip-path:inset(var(--chamfer)_0)] " +
                "flex items-stretch"
              }
            >
              <Perforacion />
            </div>

            <div
              className={
                "flex-1 bg-accent px-6 py-10 sm:px-10 lg:py-14 " +
                "[clip-path:polygon(var(--chamfer)_0,calc(100%_-_var(--chamfer))_0,100%_var(--chamfer),100%_100%,0_100%,0_var(--chamfer))] " +
                "lg:[clip-path:polygon(var(--chamfer)_0,100%_0,100%_100%,var(--chamfer)_100%,0_calc(100%_-_var(--chamfer)),0_var(--chamfer))]"
              }
            >
              <FormularioContacto
                perfiles={PERFILES}
                limites={LIMITES}
                correoSecretaria={secretaria}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
