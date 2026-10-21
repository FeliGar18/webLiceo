import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { Pendiente } from "@/components/ui/Pendiente";
import { institucion } from "@/content/institucion";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Política de privacidad",
  descripcion:
    "Cómo el sitio del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi trata los datos personales, conforme a la Ley N° 19.628.",
  ruta: "/privacidad",
});

/** Fecha de la última revisión de este texto. Actualícela al modificarlo. */
const ULTIMA_ACTUALIZACION = "octubre de 2026";

const CORREO_DIRECCION =
  institucion.correos.find((c) => c.etiqueta === "Dirección")?.valor ?? "i.launion.direccion@snaeduca.cl";

const indice = [
  { id: "responsable", titulo: "Quién es responsable" },
  { id: "datos", titulo: "Qué datos recoge el sitio" },
  { id: "uso", titulo: "Para qué se usan" },
  { id: "terceros", titulo: "Con quién se comparten" },
  { id: "conservacion", titulo: "Cuánto tiempo se conservan" },
  { id: "enlaces", titulo: "Enlaces a otros sitios" },
  { id: "menores", titulo: "Menores de edad e imágenes" },
  { id: "derechos", titulo: "Sus derechos" },
  { id: "cambios", titulo: "Cambios a esta política" },
];

export default function PrivacidadPage() {
  return (
    <>
      <Encabezado
        titulo="Política de privacidad"
        migas={[{ etiqueta: "Privacidad", href: "/privacidad" }]}
        bajada="Qué datos personales trata este sitio, para qué, y cómo puede ejercer sus derechos."
      />

      <Container className="grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-small text-muted">Última actualización: {ULTIMA_ACTUALIZACION}</p>
            <nav aria-label="Contenido de la política" className="mt-6 hidden lg:block">
              <ul className="space-y-1">
                {indice.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="inline-flex min-h-9 items-center font-semibold text-ink no-underline hover:underline">
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <Pendiente>
            Texto pendiente de revisión por el asesor legal del sostenedor antes de su publicación definitiva.
          </Pendiente>

          <div className="prose-liceo mt-10 [&>h2:first-child]:mt-0">
            <p>
              Este sitio pertenece al {institucion.nombreOficial}. Trata los datos personales de acuerdo con la Ley N°
              19.628 sobre protección de la vida privada. La Ley N° 21.719, que reforma esa normativa, entra en vigencia de
              forma diferida; esta política se ajustará a ella cuando corresponda.
            </p>
            <p>
              El liceo atiende a estudiantes menores de edad. Por eso este sitio recoge la menor cantidad de datos posible.
            </p>

            <h2 id="responsable">Quién es responsable</h2>
            <p>
              Responsables del tratamiento son el liceo y su sostenedor, la {institucion.sostenedor.nombre}. Para cualquier
              consulta sobre sus datos, escriba a la dirección del liceo:{" "}
              <a href={`mailto:${CORREO_DIRECCION}`} className="break-all">
                {CORREO_DIRECCION}
              </a>
              .
            </p>

            <h2 id="datos">Qué datos recoge el sitio</h2>
            <p>Solo los que usted escribe en el formulario de contacto:</p>
            <ul>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>Nombre.</span>
              </li>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>Correo electrónico.</span>
              </li>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>Teléfono, si decide indicarlo (es opcional).</span>
              </li>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>Asunto y mensaje.</span>
              </li>
            </ul>
            <p>
              El sitio no usa cookies de seguimiento ni herramientas de analítica, y no crea perfiles de los visitantes.
              Como todo servicio en internet, el proveedor de alojamiento puede registrar datos técnicos de las visitas,
              como la dirección IP, para la seguridad y el funcionamiento del sitio.
            </p>

            <h2 id="uso">Para qué se usan</h2>
            <p>
              Los datos del formulario se usan únicamente para responder su consulta. No se usan para publicidad ni se
              agregan a listas de difusión.
            </p>

            <h2 id="terceros">Con quién se comparten</h2>
            <p>
              Al enviar el formulario, su mensaje se remite por correo electrónico al liceo a través de Resend, un
              proveedor de envío de correos que actúa por encargo del liceo y puede procesar los datos fuera de Chile. El
              liceo no vende ni cede sus datos a terceros.
            </p>

            <h2 id="conservacion">Cuánto tiempo se conservan</h2>
            <p>
              El sitio no guarda una base de datos de mensajes. Su consulta queda en el correo electrónico del liceo
              durante el tiempo necesario para atenderla.
            </p>

            <h2 id="enlaces">Enlaces a otros sitios</h2>
            <p>
              El sitio enlaza a servicios de terceros, como Google Maps, Facebook, Instagram y el Sistema de Admisión
              Escolar del Mineduc. Esos servicios no reciben datos suyos hasta que usted hace clic en el enlace. Desde ese
              momento se rigen por sus propias políticas de privacidad.
            </p>
            <p>
              Cuando la página de inicio muestra publicaciones del liceo en Facebook, el sitio las obtiene desde su propio
              servidor: su navegador no se conecta con Facebook para verlas.
            </p>

            <h2 id="menores">Menores de edad e imágenes</h2>
            <p>
              Si eres menor de 14 años y quieres escribir al liceo, hazlo junto a tu apoderado o pídele que escriba por ti.
            </p>
            <p>
              El liceo publica imágenes en que se pueda identificar a estudiantes solo con la autorización de su apoderado.
              Si encuentra una imagen que debería retirarse, escriba a{" "}
              <a href={`mailto:${CORREO_DIRECCION}`} className="break-all">
                {CORREO_DIRECCION}
              </a>{" "}
              y será revisada.
            </p>

            <h2 id="derechos">Sus derechos</h2>
            <p>Conforme a la ley, usted puede ejercer los derechos de:</p>
            <ul>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>
                  <strong>Acceso:</strong> saber qué datos suyos tiene el liceo.
                </span>
              </li>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>
                  <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
                </span>
              </li>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>
                  <strong>Cancelación:</strong> pedir que se eliminen.
                </span>
              </li>
              <li>
                <span aria-hidden className="bullet text-accent" />
                <span>
                  <strong>Oposición:</strong> oponerse a un uso determinado.
                </span>
              </li>
            </ul>
            <p>
              Para ejercerlos, escriba a{" "}
              <a href={`mailto:${CORREO_DIRECCION}`} className="break-all">
                {CORREO_DIRECCION}
              </a>{" "}
              indicando su nombre y su solicitud. Si escribe en nombre de un estudiante, indique que es su apoderado.
            </p>

            <h2 id="cambios">Cambios a esta política</h2>
            <p>
              Si el sitio cambia la forma en que trata los datos, esta página se actualizará y cambiará su fecha de
              actualización. También puede escribirnos desde la página de <Link href="/contacto">contacto</Link>.
            </p>
            <p className="text-small text-muted">Última actualización: {ULTIMA_ACTUALIZACION}.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
