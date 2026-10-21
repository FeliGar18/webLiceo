import { describe, expect, it } from "vitest";
import { componerCuerpo } from "@/lib/contacto/correo";
import { envioDemasiadoRapido, LIMITES, TIEMPO_MINIMO_MS, validarContacto } from "@/lib/contacto/schema";

const valido = {
  nombre: "  María   José Pérez ",
  correo: "  Maria.Perez@Ejemplo.CL ",
  telefono: "",
  perfil: "Postulante o apoderado/a",
  asunto: "Consulta por\nadmisión 2027",
  mensaje: "Hola, quisiera saber cuándo son las visitas al liceo.",
  consentimiento: "si",
  sitio_web: "",
};

function errores(entrada: Record<string, unknown>) {
  const r = validarContacto(entrada);
  if (r.ok || r.trampa) throw new Error("se esperaban errores de campo");
  return r.errores;
}

describe("validarContacto", () => {
  it("acepta un envío válido y normaliza los textos", () => {
    const r = validarContacto(valido);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.datos.nombre).toBe("María José Pérez");
    expect(r.datos.correo).toBe("maria.perez@ejemplo.cl");
    expect(r.datos.asunto).toBe("Consulta por admisión 2027");
    expect(r.datos.telefono).toBeUndefined();
  });

  it.each(["+56 9 1234 5678", "912345678", "(64) 257 0409", "+56642570409", "56-9-8765-4321"])(
    "acepta el teléfono chileno %s",
    (telefono) => {
      expect(validarContacto({ ...valido, telefono }).ok).toBe(true);
    },
  );

  it.each(["123", "abcdefghij", "+1 555 123 4567", "9123456789012"])("rechaza el teléfono %s", (telefono) => {
    expect(errores({ ...valido, telefono }).telefono).toMatch(/teléfono/i);
  });

  it("acepta la ausencia del teléfono (campo opcional)", () => {
    const sinTelefono: Record<string, unknown> = { ...valido };
    delete sinTelefono.telefono;
    expect(validarContacto(sinTelefono).ok).toBe(true);
  });

  it("exige los campos obligatorios con mensajes en español", () => {
    const e = errores({});
    expect(e.nombre).toBe("Escriba su nombre.");
    expect(e.correo).toBe("Escriba su correo electrónico.");
    expect(e.perfil).toBe("Elija una opción.");
    expect(e.asunto).toBe("Escriba el asunto.");
    expect(e.mensaje).toBe("Escriba su mensaje.");
    expect(e.consentimiento).toMatch(/política de privacidad/);
    expect(e.telefono).toBeUndefined();
  });

  it("rechaza un correo inválido", () => {
    expect(errores({ ...valido, correo: "maria@" }).correo).toMatch(/correo válido/);
    expect(errores({ ...valido, correo: "no es correo" }).correo).toMatch(/correo válido/);
  });

  it("rechaza un perfil que no está en la lista", () => {
    expect(errores({ ...valido, perfil: "Administrador" }).perfil).toBe("Elija una opción.");
  });

  it("exige el consentimiento", () => {
    expect(errores({ ...valido, consentimiento: undefined }).consentimiento).toBeDefined();
    expect(errores({ ...valido, consentimiento: "on" }).consentimiento).toBeDefined();
  });

  it("aplica los límites de longitud", () => {
    const max = LIMITES.mensaje.max;
    expect(validarContacto({ ...valido, mensaje: "a".repeat(max) }).ok).toBe(true);
    expect(errores({ ...valido, mensaje: "a".repeat(max + 1) }).mensaje).toMatch(/hasta/);
    expect(errores({ ...valido, mensaje: "corto" }).mensaje).toMatch(/al menos/);
    expect(errores({ ...valido, nombre: "x".repeat(LIMITES.nombre.max + 1) }).nombre).toMatch(/hasta/);
    expect(errores({ ...valido, nombre: "x" }).nombre).toMatch(/al menos/);
    expect(errores({ ...valido, asunto: "y".repeat(LIMITES.asunto.max + 1) }).asunto).toMatch(/hasta/);
    expect(errores({ ...valido, correo: `${"a".repeat(250)}@b.cl` }).correo).toMatch(/largo/);
  });

  it("cuenta la longitud después de recortar espacios", () => {
    expect(errores({ ...valido, nombre: "   " }).nombre).toBe("Escriba su nombre.");
  });

  it("elimina caracteres de control del mensaje y normaliza saltos de línea", () => {
    const r = validarContacto({ ...valido, mensaje: "Hola\r\nmundo\u0000 con texto suficiente" });
    expect(r.ok && r.datos.mensaje).toBe("Hola\nmundo con texto suficiente");
  });

  it("trata como vacío lo que no es texto", () => {
    expect(errores({ ...valido, nombre: 123 }).nombre).toBe("Escriba su nombre.");
  });

  it("marca como trampa un honeypot completado, sin detallar errores", () => {
    expect(validarContacto({ ...valido, sitio_web: "https://spam.example" })).toEqual({ ok: false, trampa: true });
    expect(validarContacto({ sitio_web: "x" })).toEqual({ ok: false, trampa: true });
  });
});

describe("envioDemasiadoRapido", () => {
  it("rechaza envíos de menos de 3 segundos o sin medición", () => {
    expect(envioDemasiadoRapido(String(TIEMPO_MINIMO_MS - 1))).toBe(true);
    expect(envioDemasiadoRapido("0")).toBe(true);
    expect(envioDemasiadoRapido("")).toBe(true);
    expect(envioDemasiadoRapido(undefined)).toBe(true);
    expect(envioDemasiadoRapido("-5000")).toBe(true);
    expect(envioDemasiadoRapido("abc")).toBe(true);
  });

  it("acepta envíos de 3 segundos o más", () => {
    expect(envioDemasiadoRapido(String(TIEMPO_MINIMO_MS))).toBe(false);
    expect(envioDemasiadoRapido("600000")).toBe(false);
  });
});

describe("componerCuerpo", () => {
  it("arma un texto plano con todos los campos", () => {
    const r = validarContacto({ ...valido, mensaje: "<b>negrita</b> y un mensaje de prueba" });
    if (!r.ok) throw new Error("debería ser válido");
    const cuerpo = componerCuerpo(r.datos);
    expect(cuerpo).toContain("Nombre: María José Pérez");
    expect(cuerpo).toContain("Correo: maria.perez@ejemplo.cl");
    expect(cuerpo).toContain("Teléfono: (no indicado)");
    expect(cuerpo).toContain("Perfil: Postulante o apoderado/a");
    // Texto plano: el marcado se conserva literal, nunca se interpreta.
    expect(cuerpo).toContain("<b>negrita</b>");
  });
});
