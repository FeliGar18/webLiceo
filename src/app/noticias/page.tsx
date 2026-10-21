import { Container } from "@/components/ui/Container";
import { Encabezado } from "@/components/ui/Encabezado";
import { ListadoNoticias, type ItemNoticia } from "@/components/noticias/ListadoNoticias";
import { formatearFecha } from "@/lib/fechas";
import { noticiasOrdenadas } from "@/content/noticias";
import { crearMetadata } from "@/lib/seo";

export const metadata = crearMetadata({
  titulo: "Noticias",
  descripcion:
    "Noticias del Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi de La Unión: vida institucional, especialidades, comunidad y admisión.",
  ruta: "/noticias",
});

export default function NoticiasPage() {
  const items: ItemNoticia[] = noticiasOrdenadas().map((n) => ({
    slug: n.slug,
    titulo: n.titulo,
    fechaIso: n.fecha,
    fechaTexto: formatearFecha(n.fecha),
    categoria: n.categoria,
    bajada: n.bajada,
    ejemplo: n.ejemplo,
    imagen: n.imagen,
  }));

  return (
    <>
      <Encabezado
        titulo="Noticias"
        bajada="Lo que pasa en el liceo: vida institucional, trabajo de las especialidades, comunidad y avisos de admisión."
        migas={[{ etiqueta: "Noticias", href: "/noticias" }]}
      />
      <Container className="pt-4">
        <ListadoNoticias items={items} />
      </Container>
    </>
  );
}
