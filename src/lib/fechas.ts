const formato = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Santiago",
});

/**
 * Formatea una fecha ISO (AAAA-MM-DD) en español de Chile.
 * Usa el mediodía para evitar corrimientos de día por zona horaria y no
 * depende de la hora actual, por lo que es seguro en el prerenderizado.
 */
export function formatearFecha(iso: string): string {
  return formato.format(new Date(`${iso}T12:00:00-03:00`));
}
