/**
 * Tipos compartidos del contenido del sitio.
 *
 * Regla del proyecto: ningún dato oficial se inventa. Todo contenido que aún no
 * fue validado por el liceo se modela como `Pendiente`, y la interfaz lo muestra
 * marcado como tal en vez de rellenarlo.
 */

/** Grado de verificación de un dato institucional. */
export type Verificacion =
  /** Publicado en un documento oficial del liceo o del Mineduc. */
  | "verificado"
  /** Aparece en una fuente oficial pero hay versiones contradictorias. */
  | "por-confirmar";

export type DatoFuente<T = string> = {
  valor: T;
  estado: Verificacion;
  /** Documento o página donde aparece el dato, para poder auditarlo. */
  fuente: string;
};

/**
 * Un bloque de contenido que puede estar validado o pendiente de validación
 * por el equipo del liceo.
 */
export type Contenido<T> =
  | { estado: "validado"; valor: T }
  | { estado: "pendiente"; nota: string };

export type Imagen = {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
  /**
   * `true` si es una fotografía provisional de banco abierto (no del liceo).
   * La interfaz la acredita y nunca la presenta como propia.
   */
  provisional: boolean;
};

export type Enlace = {
  etiqueta: string;
  href: string;
  /** Enlaces a otros sitios se abren con rel="noopener noreferrer". */
  externo?: boolean;
};

/** Emblema de la insignia que identifica a cada especialidad. */
export type Emblema = "casa" | "rayo" | "engranaje" | "grua" | "llave";

export type Especialidad = {
  slug: string;
  /** Nombre oficial según el Proyecto Educativo Institucional. */
  nombre: string;
  /** Nombre corto para pestañas y menús. */
  nombreCorto: string;
  emblema: Emblema;
  /** Nombre de la variable CSS de color (sin `--`), p. ej. "esp-edificacion". */
  color: string;
  imagen: Imagen;
  /** Sector económico de la especialidad en el currículum técnico-profesional. */
  sector: string;
  /** Descripción breve editable. Se marca como provisional mientras `validado` sea `false`. */
  resumen: { texto: string; validado: boolean };
  areaFormativa: Contenido<string[]>;
  competencias: Contenido<string[]>;
  perfilEgreso: Contenido<string[]>;
  actividadesPracticas: Contenido<string[]>;
  campoLaboral: Contenido<string[]>;
  galeria: Imagen[];
  enlaces: Enlace[];
  /** Título que se obtiene al egresar y aprobar la práctica profesional. */
  titulo: string;
  /** Plan de estudio de la formación diferenciada, transcrito del PEI. */
  plan: { resolucion: string; modulos: string[]; fuente: string };
  /** Talleres y laboratorios del liceo ligados a la especialidad (PEI). */
  espacios: { nombre: string; detalle: string }[];
  /** Logros y experiencias de la especialidad que constan en el PEI. */
  logros: { anio: string; texto: string }[];
};

export type CategoriaNoticia = "Institucional" | "Especialidades" | "Comunidad" | "Admisión";

export type Noticia = {
  slug: string;
  titulo: string;
  /** Fecha ISO (AAAA-MM-DD). */
  fecha: string;
  categoria: CategoriaNoticia;
  bajada: string;
  cuerpo: string[];
  imagen?: Imagen;
  /**
   * `true` mientras sea un texto de ejemplo para mostrar el diseño.
   * Se marca visiblemente y se excluye de los datos estructurados.
   */
  ejemplo: boolean;
};

export type CategoriaDocumento =
  | "Proyecto Educativo"
  | "Reglamentos"
  | "Admisión"
  | "Seguridad escolar"
  | "Otros";

export type Documento = {
  id: string;
  titulo: string;
  categoria: CategoriaDocumento;
  descripcion: string;
  /** URL pública del archivo (PDF oficial o almacenamiento del liceo). */
  url: string;
  formato: "PDF" | "DOCX" | "Enlace";
  /** Año o período de vigencia declarado en el documento. */
  vigencia?: string;
  /** Fuente de publicación, p. ej. "Sistema de Admisión Escolar (Mineduc)". */
  publicadoEn: string;
};

export type Proyecto = {
  slug: string;
  titulo: string;
  tipo: "Proyecto" | "Actividad" | "Hito";
  /** Año o fecha aproximada, solo si consta en una fuente oficial. */
  periodo?: string;
  descripcion: string;
  fuente?: string;
  imagen?: Imagen;
  ejemplo: boolean;
};

export type ItemNavegacion = {
  etiqueta: string;
  href: string;
  descripcion?: string;
  hijos?: ItemNavegacion[];
};
