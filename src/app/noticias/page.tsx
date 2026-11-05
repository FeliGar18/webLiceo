import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { CATEGORIA_FACEBOOK, ListadoNoticias, type ItemNoticia } from "@/components/noticias/ListadoNoticias";
import { formatearFecha, formatearInstante } from "@/lib/fechas";
import { noticiasOrdenadas } from "@/content/noticias";
import { obtenerPublicacionesFacebook, tituloYResumen } from "@/lib/facebook";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Noticias",
  descripcion:
    "Noticias del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi de La Unión: vida institucional, especialidades, comunidad y admisión.",
  ruta: "/noticias",
});

/**
 * Historial de noticias: las del sitio (src/content/noticias.ts) y, si está
 * configurada, las publicaciones de la página de Facebook del liceo
 * (src/lib/facebook.ts), de la más reciente a la más antigua.
 */
export default async function NoticiasPage() {
  const publicaciones = await obtenerPublicacionesFacebook();

  const delFacebook: ItemNoticia[] = publicaciones.map((p) => {
    const { titulo, resumen } = tituloYResumen(p.texto);
    return {
      clave: p.id,
      titulo,
      fechaIso: p.fecha,
      fechaTexto: formatearInstante(p.fecha),
      categoria: CATEGORIA_FACEBOOK,
      bajada: resumen,
      ejemplo: false,
      href: p.enlace,
      externo: true,
      fotoExterna: p.imagen ?? undefined,
    };
  });

  // Con publicaciones reales de Facebook, las noticias de ejemplo ya no se muestran.
  const delSitio: ItemNoticia[] = noticiasOrdenadas()
    .filter((n) => !(n.ejemplo && delFacebook.length > 0))
    .map((n) => ({
      clave: n.slug,
      titulo: n.titulo,
      fechaIso: n.fecha,
      fechaTexto: formatearFecha(n.fecha),
      categoria: n.categoria,
      bajada: n.bajada,
      ejemplo: n.ejemplo,
      href: `/noticias/${n.slug}`,
      externo: false,
      imagen: n.imagen,
    }));

  const items = [...delSitio, ...delFacebook].sort((a, b) => Date.parse(b.fechaIso) - Date.parse(a.fechaIso));

  return (
    <>
      <Encabezado
        titulo="Noticias"
        bajada="Lo que pasa en el liceo: vida institucional, especialidades, comunidad, admisión y lo publicado en su página de Facebook."
        migas={[{ etiqueta: "Noticias", href: "/noticias" }]}
      />
      <Container className="pt-4">
        <ListadoNoticias items={items} />
      </Container>
    </>
  );
}
