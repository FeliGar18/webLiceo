import { afterEach, describe, expect, it, vi } from "vitest";
import { interpretarRespuesta, motivoError, obtenerPublicacionesFacebook, tituloYResumen } from "@/lib/facebook";

describe("interpretarRespuesta (Graph API de Facebook)", () => {
  it("convierte las publicaciones y normaliza la fecha a ISO 8601", () => {
    const resultado = interpretarRespuesta({
      data: [
        {
          id: "123_456",
          message: "  Ceremonia de titulación 2026  ",
          created_time: "2026-10-18T15:30:00+0000",
          permalink_url: "https://www.facebook.com/indufenner/posts/456",
          full_picture: "https://scontent.xx.fbcdn.net/v/foto.jpg?oh=abc",
        },
      ],
      paging: { cursors: {} },
    });

    expect(resultado).toEqual([
      {
        id: "123_456",
        texto: "Ceremonia de titulación 2026",
        fecha: "2026-10-18T15:30:00+00:00",
        enlace: "https://www.facebook.com/indufenner/posts/456",
        imagen: "https://scontent.xx.fbcdn.net/v/foto.jpg?oh=abc",
      },
    ]);
    expect(Number.isNaN(new Date(resultado[0].fecha).getTime())).toBe(false);
  });

  it("acepta publicaciones solo con foto o solo con texto", () => {
    const resultado = interpretarRespuesta({
      data: [
        { id: "1", created_time: "2026-10-01T10:00:00+0000", permalink_url: "https://facebook.com/1", full_picture: "https://a.fbcdn.net/x.jpg" },
        { id: "2", message: "Aviso", created_time: "2026-10-02T10:00:00+0000", permalink_url: "https://facebook.com/2" },
      ],
    });
    expect(resultado.map((p) => [p.id, p.texto, p.imagen])).toEqual([
      ["1", "", "https://a.fbcdn.net/x.jpg"],
      ["2", "Aviso", null],
    ]);
  });

  it("descarta publicaciones vacías o sin enlace", () => {
    const resultado = interpretarRespuesta({
      data: [
        { id: "1", message: "   ", created_time: "2026-10-01T10:00:00+0000", permalink_url: "https://facebook.com/1" },
        { id: "2", message: "Sin enlace", created_time: "2026-10-01T10:00:00+0000" },
      ],
    });
    expect(resultado).toEqual([]);
  });

  it("rechaza una respuesta con otro formato", () => {
    expect(() => interpretarRespuesta({ error: { message: "Invalid OAuth access token" } })).toThrow();
  });
});

describe("obtenerPublicacionesFacebook", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("sin token devuelve una lista vacía (la portada usa las noticias del sitio) y no llama a la API", async () => {
    vi.stubEnv("FACEBOOK_PAGE_ID", "");
    vi.stubEnv("FACEBOOK_PAGE_TOKEN", "");
    const espia = vi.spyOn(globalThis, "fetch");
    await expect(obtenerPublicacionesFacebook()).resolves.toEqual([]);
    expect(espia).not.toHaveBeenCalled();
    espia.mockRestore();
  });
});

describe("motivoError", () => {
  it("resume el error de Meta sin datos sensibles", () => {
    const json = { error: { message: "(#100) Pages Public Content Access", type: "OAuthException", code: 100 } };
    expect(motivoError(400, json)).toBe(
      "Graph API respondió 400: OAuthException · código 100 · (#100) Pages Public Content Access",
    );
  });

  it("deja solo el estado si la respuesta no trae detalle", () => {
    expect(motivoError(502, null)).toBe("Graph API respondió 502");
  });
});

describe("tituloYResumen", () => {
  it("usa la primera línea como título y el resto como resumen", () => {
    expect(tituloYResumen("Titulación 2026\nFelicitamos a nuestros egresados.\nGracias a las familias.")).toEqual({
      titulo: "Titulación 2026",
      resumen: "Felicitamos a nuestros egresados. Gracias a las familias.",
    });
  });

  it("recorta una primera línea larga en una palabra y pasa el resto al resumen", () => {
    const { titulo, resumen } = tituloYResumen("uno dos tres cuatro", 9);
    expect(titulo).toBe("uno dos…");
    expect(resumen).toBe("tres cuatro");
  });

  it("sin texto (solo foto) usa un título genérico", () => {
    expect(tituloYResumen("")).toEqual({ titulo: "Publicación del liceo", resumen: "" });
  });
});
