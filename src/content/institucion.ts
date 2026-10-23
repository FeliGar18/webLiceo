import { z } from "zod";
import type { DatoFuente, Enlace } from "@/lib/types";
import datosContacto from "./datos/contacto.json";

/**
 * Datos institucionales centralizados.
 *
 * Fuentes:
 * - PEI: Proyecto Educativo Institucional 2025-2026, publicado en el Sistema de
 *   Admisión Escolar (Mineduc).
 * - RIE: Reglamento Interno 2026, publicado en el Sistema de Admisión Escolar.
 *
 * Antes de publicar, el liceo debe confirmar todo dato marcado "por-confirmar".
 */

export const FUENTE_PEI =
  "Proyecto Educativo Institucional 2025-2026 (Sistema de Admisión Escolar, Mineduc)";
export const FUENTE_RIE = "Reglamento Interno 2026 (Sistema de Admisión Escolar, Mineduc)";

export const URL_PEI = "https://cdnsae.mineduc.cl/documentos/22140/ProyectoEducativo22140.pdf";
export const URL_RIE = "https://cdnsae.mineduc.cl/documentos/22140/ReglamentodeConvivencia22140.pdf";
export const URL_SAE = "https://www.sistemadeadmisionescolar.cl";

const datoSchema = z.object({
  valor: z.string().trim().min(1),
  estado: z.enum(["verificado", "por-confirmar"]),
  fuente: z.string().nullish().transform((v) => v ?? ""),
});

/** Datos de contacto editables desde el panel (src/content/datos/contacto.json). */
const contacto = z
  .object({
    direccion: datoSchema,
    direccionCorta: z.string().trim().min(1),
    telefonos: z.array(datoSchema).min(1, "Debe haber al menos un teléfono"),
    correos: z.array(datoSchema.extend({ etiqueta: z.string().trim().min(1) })).min(1, "Debe haber al menos un correo"),
    redes: z.array(z.object({ etiqueta: z.string().trim().min(1), href: z.string().url() })),
    horarioAtencion: z.string().nullish().transform((v) => v ?? ""),
    /** Enlace del botón «Acceso FIS» del pie (vacío = botón sin enlace todavía). */
    accesoFis: z.string().nullish().transform((v) => v?.trim() ?? ""),
  })
  .parse(datosContacto);

/** 40°18'47.0"S 73°00'01.3"W, entregadas por el liceo. */
const COORDENADAS = { latitud: -40.313056, longitud: -73.000361 } as const;

export const institucion = {
  nombreOficial: "Liceo Bicentenario Industrial Ingeniero Ricardo Fenner Ruedi",
  nombreCorto: "Liceo Industrial Fenner",
  tipo: "Establecimiento de educación media técnico-profesional",
  comuna: "La Unión",
  region: "Región de Los Ríos",
  pais: "Chile",

  rbd: { valor: "22140-6", estado: "verificado", fuente: FUENTE_PEI } satisfies DatoFuente,
  dependencia: {
    valor: "Particular subvencionado, en administración delegada (DL 3166/1980)",
    estado: "verificado",
    fuente: FUENTE_PEI,
  } satisfies DatoFuente,
  niveles: { valor: "1° a 4° año medio", estado: "verificado", fuente: FUENTE_RIE } satisfies DatoFuente,
  regimen: {
    valor: "Régimen interno (internado) y externo",
    estado: "verificado",
    fuente: FUENTE_RIE,
  } satisfies DatoFuente,
  liceoBicentenario: {
    valor: "Seleccionado en la generación 2019 del programa Liceos Bicentenario",
    estado: "verificado",
    fuente: "Listado de Liceos Bicentenario vigentes (Mineduc, enero 2025)",
  } satisfies DatoFuente,

  sostenedor: {
    nombre: "Corporación Educacional de la Sociedad Nacional de Agricultura F.G. (SNA Educa)",
    nombreCorto: "SNA Educa",
    sitio: "https://www.snaeduca.cl",
    correo: "snaeduca@snaeduca.cl",
    telefono: "+56 2 2585 3343",
    fuente: FUENTE_PEI,
  },

  /** Dirección, teléfonos, correos, redes y horario: se editan en el panel (/admin). */
  direccion: contacto.direccion satisfies DatoFuente,
  /** Versión breve de la dirección para espacios angostos (franja de contacto). */
  direccionCorta: contacto.direccionCorta,
  /** Ubicación exacta del liceo (entregada por el liceo). */
  coordenadas: COORDENADAS,
  /**
   * Ficha del liceo en Google Maps (pin con su nombre), centrada en las
   * coordenadas. No comparte datos del visitante hasta que hace clic.
   */
  /**
   * Ruta en Google Maps desde donde está el visitante hasta el liceo: sin
   * origen, Google usa la ubicación actual (con el permiso del visitante).
   */
  comoLlegarUrl: `https://www.google.com/maps/dir/?api=1&destination=${COORDENADAS.latitud},${COORDENADAS.longitud}`,
  mapaUrl: `https://www.google.com/maps/place/Liceo+Bicentenario+Industrial+Ingeniero+Ricardo+Fenner+Ruedi/@${COORDENADAS.latitud},${COORDENADAS.longitud},17z/data=!4m6!3m5!1s0x96166a223fc5b313:0xadca52d070d89c84!8m2!3d-40.3129249!4d-73.0004272!16s%2Fg%2F11b6gbrtlg`,

  telefonos: contacto.telefonos satisfies DatoFuente[],
  correos: contacto.correos satisfies (DatoFuente & { etiqueta: string })[],
  redes: contacto.redes.map((r) => ({ ...r, externo: true })) satisfies Enlace[],
  /** Horario de atención (vacío mientras el liceo no lo publique). */
  horarioAtencion: contacto.horarioAtencion.trim() || null,
  /** Dirección del acceso FIS (botón dorado del pie). */
  accesoFis: contacto.accesoFis || null,
} as const;

/** Documento del liceo con sus logros, entregado en octubre de 2026. */
export const FUENTE_TRAYECTORIA = "Logros y trayectoria de la unidad educativa hasta 2026 (documento del liceo)";
/** Reseña histórica extensa del liceo, entregada en octubre de 2026 (escrita hacia 2021). */
export const FUENTE_RESENA = "Reseña histórica del Liceo Bicentenario Industrial Ing. Ricardo Fenner Ruedi (documento del liceo)";

/** Cómo nació el liceo, en párrafos (FUENTE_RESENA). */
export const origenes = [
  "El liceo nace para responder a un trabajo cada vez más especializado. Un grupo de empresarios de La Unión, encabezados por Werner Grob Stolzenbach y Guillermo Gantz Mann, buscó ofrecer a los estudiantes de 8° básico una alternativa de Educación Media en el área industrial, una idea que en vida había expresado el ingeniero Ricardo Fenner Ruedi.",
  "En 1994 el Liceo Rector Abdón Andrade Coloma realizó el diagnóstico de las necesidades de formación industrial de la comuna, y con sus resultados se elaboraron los planes de estudio de las dos primeras especialidades: Instalaciones Eléctricas y Construcción de Estructuras Metálicas. Ese mismo año, Irma Paegelow Luppy, esposa de Ricardo Fenner, creó la fundación que lleva su nombre para impulsar el proyecto.",
  "En una reunión con las familias de los primeros 90 estudiantes, autoridades comunales y directivos de la zona se acordó que el liceo fuera particular subvencionado y administrado por CODESSER. La Fundación Ricardo Fenner Ruedi hizo un aporte decisivo para construir sus dependencias.",
];

/** El campus hoy (FUENTE_RESENA). */
export const campus = {
  cifras: [
    { valor: "30", etiqueta: "salas de clases" },
    { valor: "8", etiqueta: "laboratorios" },
    { valor: "5", etiqueta: "talleres de especialidad" },
    { valor: "6", etiqueta: "pabellones de internado" },
  ],
  laboratorios: ["Ciencias", "Inglés", "Autotrónica", "Neumática", "Dibujo", "Electrónica", "Simulador de Soldadura", "Enlaces", "Centro de Innovación"],
  otros: [
    "Dos comedores",
    "Gimnasio y multicanchas",
    "Salón multiuso y auditorio",
    "Centro de Recursos para el Aprendizaje (CRA)",
    "Pabellón administrativo",
  ],
  terreno: "10,96 hectáreas",
};

/** Quienes han dirigido el liceo (FUENTE_RESENA y comunidad educativa). */
export const liderazgo: { nombre: string; periodo: string; texto: string; foto?: "luisAlvarez" | "ernestoUslar" }[] = [
  {
    nombre: "Luis Adrián Álvarez Igor",
    periodo: "Hasta febrero de 2020",
    foto: "luisAlvarez",
    texto:
      "Con su visión y liderazgo, el liceo se convirtió en un referente nacional de la educación técnico-profesional. Su vocación y dedicación dieron forma al «Espíritu Fenner»: trabajar por la formación de excelencia de los estudiantes y también por su bienestar.",
  },
  {
    nombre: "Ernesto Alfredo Uslar Goverts",
    periodo: "Director actual",
    foto: "ernestoUslar",
    texto:
      "Asumió durante la pandemia, con el desafío de que ningún estudiante quedara atrás, en las regiones de Los Ríos y Los Lagos. Ha impulsado el mejoramiento de las dependencias, la implementación tecnológica de laboratorios y talleres y la vinculación con redes externas.",
  },
];

/**
 * Hitos de la historia del liceo. Fuentes: reseña histórica del PEI 2025-2026,
 * la reseña histórica extensa del liceo (FUENTE_RESENA) y el documento de
 * logros y trayectoria (FUENTE_TRAYECTORIA).
 */
export const hitos: { anio: string; texto: string }[] = [
  {
    anio: "1994",
    texto:
      "El Liceo Rector Abdón Andrade Coloma realiza el diagnóstico de las necesidades de formación industrial de La Unión. El 19 de diciembre se constituye en Santiago la Fundación Ricardo Fenner Ruedi.",
  },
  {
    anio: "1995",
    texto:
      "El 30 de agosto se presenta al Ministerio de Educación el proyecto de creación del liceo. Las familias de los primeros 90 estudiantes acuerdan que sea particular subvencionado y administrado por CODESSER.",
  },
  {
    anio: "1996",
    texto:
      "Comienzan las clases en dependencias del Liceo Agrícola San Javier, con dos cursos de 45 estudiantes, en Instalaciones Eléctricas y Construcción de Estructuras Metálicas. El 11 de abril la Seremi de Educación autoriza su funcionamiento (Rex. N° 824). Se compran 10,96 hectáreas de terreno y comienza la construcción.",
  },
  {
    anio: "1997",
    texto:
      "En julio, el liceo se traslada a su campus propio, con dos pabellones de clases, talleres, comedor y dos pabellones de internado.",
  },
  { anio: "2001", texto: "Es reconocido como Liceo de Especial Singularidad." },
  {
    anio: "2005–2010",
    texto:
      "Las especialidades de Construcciones Metálicas, Mecánica Automotriz, Electricidad e Instalaciones Sanitarias aprueban los procesos de acreditación de Chile Califica, que mejoraron los estándares docentes y el equipamiento.",
  },
  {
    anio: "2012",
    texto:
      "Tres estudiantes y cuatro docentes compiten en WorldSkills Americas, en São Paulo: 4° lugar en Electricidad, detrás de Estados Unidos, Canadá y Brasil. El liceo obtiene la Certificación Medioambiental de Excelencia y un reconocimiento de la Secreduc y la Deproveduc del Ranco por su aporte a la calidad y equidad en la educación.",
  },
  {
    anio: "2013",
    texto:
      "Recibe el Premio Regional a la Gestión Medioambiental y es incluido en el libro «Claves en Educación Técnico Profesional: 10 modelos a replicar», de Libertad y Desarrollo.",
  },
  {
    anio: "2014",
    texto:
      "En WorldSkills Americas, en Bogotá, un estudiante del liceo es reconocido como el mejor técnico de la delegación chilena. Participa en el 2° APEC Youth Skills Camp, en China.",
  },
  {
    anio: "2015",
    texto:
      "Se incorpora a la Jornada Escolar Completa. Compite en WorldSkills Mundial, en Brasil, en Electricidad, junto a 60 países, y recibe un reconocimiento de la Secreduc por su compromiso con la Expo TP.",
  },
  {
    anio: "2016",
    texto:
      "6° lugar latinoamericano y 1° nacional en la categoría Energía de los Premios Latinoamérica Verde, con el proyecto Sistema Solar para Agua Caliente Sanitaria. Recibe el reconocimiento SUPÉRATE (INACAP y revista Qué Pasa) y un reconocimiento por su contribución a la educación técnico-profesional en la Provincia del Ranco.",
  },
  {
    anio: "2016–2018",
    texto:
      "Nivel de Desempeño Alto de la Agencia de Calidad de la Educación y podio sistemático en WorldSkills Chile en Electricidad, Construcciones Metálicas e Instalaciones Sanitarias.",
  },
  {
    anio: "2018",
    texto:
      "Abre el Internado de Damas, con 34 cupos. Primer lugar nacional en Robótica y en las Olimpiadas Nacionales de Mecatrónica FESTO. En diciembre, su postulación al programa Liceos Bicentenario obtiene el puntaje más alto del país.",
  },
  {
    anio: "2019",
    texto:
      "Se integra a los Liceos Bicentenario de Excelencia del Ministerio de Educación, con un proyecto centrado en la innovación y la tecnología.",
  },
  {
    anio: "2020–2021",
    texto:
      "Durante la pandemia, el liceo trabaja para que ningún estudiante quede atrás en su aprendizaje, llegando a estudiantes de las regiones de Los Ríos y Los Lagos. Se implementa el Taller Multisectorial de Innovación y Tecnología, parte del programa Liceos Bicentenario.",
  },
  {
    anio: "2024",
    texto:
      "En la VIII Olimpiada Técnica Nacional WorldSkills, medallas de oro en Instalaciones Eléctricas y Robótica Móvil, plata en Control Industrial y medallas de excelencia en Soldadura y Tecnología Mecánica. 1° lugar en la II Competencia Nacional de Robótica de la Red SNA Educa y 1° lugar regional en Go¡ Innova.",
  },
];

/** Desafíos de la dirección a corto y mediano plazo (FUENTE_TRAYECTORIA). */
export const desafios = [
  "Mantener la excelencia académica.",
  "Consolidar el proyecto Liceo Bicentenario.",
  "Mejorar la infraestructura del establecimiento.",
  "Innovación y tecnología para el desarrollo de las habilidades del siglo XXI.",
  "Ampliar la cobertura del internado femenino.",
  "Ampliar la vinculación con redes externas para fortalecer el desarrollo integral de los estudiantes.",
  // El documento dice "PTU"; desde 2023 la prueba de admisión es la PAES.
  "Mejorar el logro de aprendizajes en las evaluaciones estandarizadas SIMCE y PAES.",
];

/** Matrícula del liceo al comienzo y en 2021 (FUENTE_TRAYECTORIA). */
export const crecimiento = {
  desde: { anio: "1996", estudiantes: 90, cursos: 2, internos: 90, especialidades: 2 },
  // Matrícula 2025 según el PEI 2025-2026 (antes, 2021 según FUENTE_TRAYECTORIA: 900, 23 y 443).
  hasta: { anio: "2025", estudiantes: 895, cursos: 23, internos: 453, especialidades: 5 },
};

/** Estudiantes y docentes que han representado al liceo en el extranjero (FUENTE_TRAYECTORIA). */
export const enElMundo = {
  docentes: 21,
  paisesPasantias: [
    "Estados Unidos",
    "Brasil",
    "Colombia",
    "Inglaterra",
    "Suiza",
    "Alemania",
    "España",
    "Francia",
    "Corea",
    "País Vasco",
  ],
  estudiantes: 11,
  viajes: [
    { anio: "2012", texto: "WorldSkills Americas, Brasil" },
    { anio: "2014", texto: "2° APEC Youth Skills Camp, China" },
    { anio: "2014", texto: "WorldSkills Americas, Colombia" },
    { anio: "2015", texto: "Pasantía en Snow College, Utah, Estados Unidos" },
    { anio: "2016", texto: "Design for Change, China" },
    { anio: "2017", texto: "Ciencias, Estados Unidos" },
  ],
};

/** Reseña del ingeniero que da nombre al liceo (PEI y página de historia en snaeduca.cl). */
export const resenaNombre =
  "Ricardo Fenner Ruedi fue ingeniero de la empresa Minas San Pedro de Catamutún, en La Unión, y en vida expresó la idea de crear un liceo industrial en la comuna. Su viuda constituyó la Fundación Ricardo Fenner Ruedi, que hizo un aporte decisivo para construir el establecimiento.";

export function siteUrl(): string {
  // En Vercel, VERCEL_PROJECT_PRODUCTION_URL apunta al dominio de producción
  // incluso en previews, así las URL canónicas nunca quedan en *.vercel.app.
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

/** Metodologías activas que aplica el liceo (FUENTE_PEI, logros 2024). */
export const metodologias = ["Aprendizaje Basado en Proyectos", "Aprendizaje Basado en Retos", "STEM", "COIL"];

/** Convenios de articulación con la educación superior y alianzas (FUENTE_PEI, análisis externo). */
export const articulacion = {
  losRios: ["Universidad Austral", "INACAP", "Universidad San Sebastián", "Santo Tomás"],
  losLagos: ["Universidad de Los Lagos", "IPROSEC", "AIEP", "DUOC", "IPG"],
  alianzas: ["WorldSkills Chile", "WorldSkills Americas", "SENA (Colombia)", "SENAI (Brasil)", "COIL", "PREPA UDEM", "Centro Paula Souza (Brasil)"],
};

/** PEI de la red SNA Educa, sostenedor del liceo (documento entregado por el liceo, octubre de 2026). */
export const FUENTE_PEI_SNA = "Proyecto Educativo Institucional SNA Educa 2025";
/** Reglamento de Evaluación y Promoción de SNA Educa (documento entregado por el liceo, octubre de 2026). */
export const FUENTE_REGLAMENTO_EVALUACION = "Reglamento de Evaluación y Promoción SNA Educa 2025";

/**
 * Definiciones estratégicas de la red SNA Educa, que el liceo comparte
 * (FUENTE_PEI_SNA, 3.1 a 3.5.1). El PEI propio del liceo publicado en el SAE
 * viene cortado y no trae su visión ni su misión.
 */
export const identidadSna = {
  vision:
    "Ser una institución reconocida como referente nacional en la prestación de servicios educacionales de calidad, inspirada en valores Humanista-Cristiano, destinada a potenciar el desarrollo sustentable del país, con énfasis en el sector rural.",
  mision:
    "Otorgar formación valórica y profesional de excelencia a jóvenes de sectores preferentemente rurales, brindándoles la oportunidad de convertirse en personas íntegras, comprometidas con su entorno, para desempeñarse exitosamente y contribuir, desde una perspectiva personal y profesional, al desarrollo de su familia y comunidad.",
  valores: [
    { nombre: "Honestidad", texto: "Forma de vida comprometida con la verdad, caracterizada por la congruencia entre lo que se piensa, se dice y se hace." },
    { nombre: "Responsabilidad", texto: "Responder ante sí mismo y ante los demás por los propios actos u omisiones, intencionados o no." },
    { nombre: "Solidaridad", texto: "Disposición a acoger, comprender y asumir desinteresadamente las necesidades de los demás." },
    { nombre: "Respeto", texto: "Comprender y aceptar la dignidad de las personas, reconociendo derechos y deberes y cultivando una actitud dialogante." },
    { nombre: "Perseverancia", texto: "Persistir en las acciones positivas, para el bien propio o ajeno, a pesar de los obstáculos." },
    { nombre: "Lealtad", texto: "Aceptar vínculos y mantener la adhesión a ellos con empatía y esfuerzo." },
    { nombre: "Orden", texto: "Conducirse de manera metódica, respetando las normas en la organización y ejecución de las tareas." },
  ],
  perfilEgresado: {
    intro:
      "Los estudiantes que terminan su formación en los liceos de la red se caracterizan por tener criterio propio, aprender por sí solos, pensar con independencia, crear proyectos y negocios, actuar por principios y hacerse responsables de su aprendizaje. Egresan como personas:",
    rasgos: [
      "Íntegras, con una sólida formación valórica y claros principios morales y ético-profesionales.",
      "En permanente búsqueda de la verdad, libres y responsables, con iniciativa y creatividad, conscientes de estar en crecimiento continuo y con voluntad de perfeccionarse.",
      "Capaces de renovar y crear cultura, centradas en los valores cristianos y que aprecian la familia como lugar privilegiado de las relaciones personales.",
      "Respetuosas y responsables con los bienes de la naturaleza, capaces de crear nuevas formas de trabajo y de contribuir al desarrollo sustentable con sentido de colaboración y compromiso comunitario.",
      "Con espíritu emprendedor en lo personal, social y económico, capaces de desarrollar sus sueños y proyectos.",
      "Con competencias esenciales para desarrollarse personal y profesionalmente en un mundo globalizado.",
      "Comprometidas con el aprendizaje permanente y la actualización profesional.",
    ],
  },
};
