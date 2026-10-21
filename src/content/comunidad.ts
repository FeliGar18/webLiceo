import type { Imagen } from "@/lib/types";
import { imagenPropia } from "./imagenes";
import { FUENTE_PEI, institucion } from "./institucion";

/**
 * Comunidad educativa: cargos y estamentos según la dotación declarada en el
 * PEI 2025-2026 ("Dotación del personal").
 *
 * No se publican nombres, fotografías ni correos personales sin autorización
 * de cada persona. Para completar una tarjeta, agregue `nombre`, `foto`
 * (con imagenPropia en ./imagenes) y, si corresponde, un `correo`
 * institucional. Mientras falten, la tarjeta lo indica.
 */

export type Integrante = {
  cargo: string;
  /** Se omite cuando el cargo basta (p. ej. asistentes de la educación). */
  area?: string;
  nombre?: string;
  foto?: Imagen;
  /** Solo correos institucionales verificados (nunca personales). */
  correo?: string;
  /** Número de personas en ese cargo, cuando es más de una (PEI). */
  cantidad?: number;
};

export type IconoGrupo = "directivo" | "administracion" | "docentes" | "pie" | "asistentes";

export type GrupoComunidad = {
  id: string;
  titulo: string;
  icono: IconoGrupo;
  descripcion: string;
  /** Resumen de dotación, p. ej. "54 docentes". */
  dotacion: string;
  /** Muestra al primer integrante solo, en una fila sobre el resto (p. ej. la dirección). */
  destacarPrimero?: boolean;
  integrantes: Integrante[];
};

const correo = (etiqueta: string) => institucion.correos.find((c) => c.etiqueta === etiqueta)?.valor;

/**
 * Funcionario con foto entregada por el liceo (carpeta "Fotos funcionarios",
 * archivos "NOMBRE - FUNCION"). Fotos recortadas a 4:5 en public/images/comunidad/.
 */
const funcionario = (nombre: string, foto: string, datos: Omit<Integrante, "nombre" | "foto">): Integrante => ({
  ...datos,
  nombre,
  foto: imagenPropia(`/images/comunidad/${foto}.jpg`, `${nombre}, ${datos.cargo}`, 640, 800),
});

const PIE = "Programa de Integración Escolar";

/** Funcionarios con foto cuyo cargo basta, sin área: [nombre, foto, cargo]. */
const conFoto = (personas: [nombre: string, foto: string, cargo: string][]): Integrante[] =>
  personas.map(([nombre, foto, cargo]) => funcionario(nombre, foto, { cargo }));

export const grupos: GrupoComunidad[] = [
  {
    id: "equipo-directivo",
    titulo: "Equipo directivo",
    icono: "directivo",
    descripcion: "Conduce el proyecto educativo y la gestión del liceo.",
    dotacion: "5 cargos",
    destacarPrimero: true,
    integrantes: [
      funcionario("Ernesto Uslar", "ernesto-uslar", { cargo: "Director", area: "Dirección", correo: correo("Dirección") }),
      funcionario("Miroslava Montecinos", "miroslava-montecinos", { cargo: "Jefa de UTP", area: "Unidad Técnico-Pedagógica" }),
      funcionario("Ramon Aguilera", "ramon-aguilera", {
        cargo: "Encargado de Convivencia Escolar",
        area: "Convivencia escolar",
      }),
      funcionario("Jaime Navarrete", "jaime-navarrete", { cargo: "Jefe Administrativo", area: "Administración" }),
      funcionario("Juan Garcia", "juan-garcia", {
        cargo: "Coordinador de Especialidades",
        area: "Formación técnico-profesional",
      }),
    ],
  },
  {
    id: "administracion",
    titulo: "Área Administrativa y Finanzas",
    icono: "administracion",
    descripcion: "Gestiona la administración, los recursos y las finanzas del liceo.",
    // 4 cargos según el liceo; falta la función de Fredy Oporto y el cuarto integrante.
    dotacion: "4 cargos",
    integrantes: [
      funcionario("Daniela Rilling", "daniela-rilling", {
        cargo: "Secretaria",
        area: "Administración",
        correo: correo("Secretaría"),
      }),
      funcionario("Esteban Uribe", "esteban-uribe", { cargo: "Prevencionista de Riesgos", area: "Seguridad y prevención" }),
      funcionario("Fredy Oporto", "fredy-oporto", { cargo: "Cargo por confirmar", area: "Área Administrativa y Finanzas" }),
      { cargo: "Cargo por confirmar", area: "Área Administrativa y Finanzas" },
    ],
  },
  {
    id: "docentes",
    titulo: "Docentes",
    icono: "docentes",
    descripcion: "Enseñan la formación general y la formación diferenciada de cada especialidad, en aulas, talleres y laboratorios.",
    dotacion: "54 docentes",
    // Ordenados por asignatura: formación general y luego especialidades.
    integrantes: conFoto([
      ["Andrea Avila", "andrea-avila", "Docente de Lenguaje"],
      ["Daniela Burgos", "daniela-burgos", "Docente de Lenguaje"],
      ["Diego Gallardo", "diego-gallardo", "Docente de Lenguaje"],
      ["Karina Sanzana", "karina-sanzana", "Docente de Lenguaje"],
      ["Lissette Quezada", "lissette-quezada", "Docente de Lenguaje"],
      ["Bexi Zambrano", "bexi-zambrano", "Docente de Matemática"],
      ["Hector Gallardo", "hector-gallardo", "Docente de Matemática"],
      ["Hugo Barrientos", "hugo-barrientos", "Docente de Matemática"],
      ["Lorena Solis", "lorena-solis", "Docente de Matemática"],
      ["Pamela Del Rio", "pamela-del-rio", "Docente de Matemática"],
      ["Romina Fernandoy", "romina-fernandoy", "Docente de Matemática"],
      ["Daniel Salas", "daniel-salas", "Docente de Historia"],
      ["Dany Melendre", "dany-melendre", "Docente de Historia"],
      ["Nory Rosas", "nory-rosas", "Docente de Historia"],
      ["Debora Alarcon", "debora-alarcon", "Docente de Inglés"],
      ["Maria Rios", "maria-rios", "Docente de Inglés"],
      ["Romina Torres", "romina-torres", "Docente de Inglés"],
      ["Carmen Concha", "carmen-concha", "Docente de Biología y Ciencias"],
      ["Marlene Millapan", "marlene-millapan", "Docente de Biología y Ciencias"],
      ["Felipe Cifuentes", "felipe-cifuentes", "Docente de Física"],
      ["Evelyn Guerra", "evelyn-guerra", "Docente de Filosofía"],
      ["Sandra Labbe", "sandra-labbe", "Docente de Religión"],
      ["Angelina Figueroa", "angelina-figueroa", "Docente de Tecnología"],
      ["Eduardo Bello", "eduardo-bello", "Docente de Tecnología"],
      ["Felipe Relh", "felipe-relh", "Docente de Tecnología"],
      ["Marbelis Rojas", "marbelis-rojas", "Docente de Artes"],
      ["Matias Carcamo", "matias-carcamo", "Docente de Música"],
      ["Marcelo Vergara", "marcelo-vergara", "Docente de Educación Física"],
      ["Miguel Leal", "miguel-leal", "Docente de Educación Física"],
      ["Pedro Saldivia", "pedro-saldivia", "Docente de Educación Física"],
      ["Jaime Becerra", "jaime-becerra", "Docente de Voleibol"],
      ["Nayeli Aros", "nayeli-aros", "Docente de Edificación"],
      ["Roberto Iturriaga", "roberto-iturriaga", "Docente de Edificación"],
      ["Ruben Aravera", "ruben-aravera", "Docente de Edificación"],
      ["Angelo Ramirez", "angelo-ramirez", "Docente de Electricidad"],
      ["Javier Cifuentes", "javier-cifuentes", "Docente de Electricidad"],
      ["Julio Oyarzun", "julio-oyarzun", "Docente de Electricidad"],
      ["Francisco Vera", "francisco-vera", "Docente de Estructuras Metálicas"],
      ["Raul Quezada", "raul-quezada", "Docente de Estructuras Metálicas"],
      ["Claudia Ceverio", "claudia-ceverio", "Docente de Instalaciones Sanitarias"],
      ["Cristian Asenjo", "cristian-asenjo", "Docente de Mecánica Automotriz"],
      ["Jose Mansilla", "jose-mansilla", "Docente de Mecánica Automotriz"],
      ["Mauricio Quezada", "mauricio-quezada", "Docente de Mecánica Automotriz"],
    ]),
  },
  {
    id: "integracion",
    titulo: "Programa de Integración Escolar",
    icono: "pie",
    descripcion: "Acompaña a estudiantes con necesidades educativas especiales junto a docentes y familias.",
    dotacion: "16 profesionales",
    integrantes: [
      funcionario("Susana Villalon", "susana-villalon", { cargo: "Coordinadora PIE", area: PIE }),
      funcionario("Cristian Villalon", "cristian-villalon", { cargo: "Psicólogo", area: PIE }),
      funcionario("Joel Martinez", "joel-martinez", { cargo: "Terapeuta Ocupacional", area: PIE }),
      ...(
        [
          ["Aylin Ferrada", "aylin-ferrada"],
          ["Camila Ponce", "camila-ponce"],
          ["Carolina Andrade", "carolina-andrade"],
          ["Geraldine Bahamondes", "geraldine-bahamondes"],
          ["Karla Catrihual", "karla-catrihual"],
          ["Susana Union", "susana-union"],
          ["Vanesa Saldivia", "vanesa-saldivia"],
          ["Viviana Soto", "viviana-soto"],
        ] as const
      ).map(([nombre, foto]) => funcionario(nombre, foto, { cargo: "Educadora Diferencial", area: PIE })),
    ],
  },
  {
    id: "asistentes",
    titulo: "Asistentes de la educación",
    icono: "asistentes",
    descripcion:
      "Apoyan el bienestar de estudiantes y familias, la convivencia y la seguridad en talleres, y sostienen el funcionamiento diario del liceo, el internado y la atención a la comunidad.",
    // El PEI informa por separado 5 profesionales de convivencia y apoyo y 69 asistentes.
    dotacion: "69 asistentes y 5 profesionales de apoyo",
    // Ordenados por función (sin subtítulos en la página).
    integrantes: conFoto([
      // Inspectoría y residencia escolar
      ["Patricio Alvarez", "patricio-alvarez", "Inspector Jefe"],
      ["Hector Bravo", "hector-bravo", "Coordinador Residencia Escolar"],
      ["Alejandro Guzman", "alejandro-guzman", "Inspector"],
      ["Carlos Flandez", "carlos-flandez", "Inspector"],
      ["Cristian Manzano", "cristian-manzano", "Inspector"],
      ["Felipe Barraza", "felipe-barraza", "Inspector"],
      ["Francisca Meeder", "francisca-meeder", "Inspectora"],
      ["Genaro Solis", "genaro-solis", "Inspector"],
      ["Gonzalo Villagran", "gonzalo-villagran", "Inspector"],
      ["Guido Puebla", "guido-puebla", "Inspector"],
      ["Hector Hurtado", "hector-hurtado", "Inspector"],
      ["Humberto Gallegos", "humberto-gallegos", "Inspector"],
      ["Jose Luis Guarda", "jose-luis-guarda", "Inspector"],
      ["Jose Luis Soto", "jose-luis-soto", "Inspector"],
      ["Julio Casanova", "julio-casanova", "Inspector"],
      ["Luis Rosas", "luis-rosas", "Inspector"],
      ["Marcela Casanova", "marcela-casanova", "Inspectora"],
      ["Maria Pascuala Avila", "maria-pascuala-avila", "Inspectora"],
      ["Marta Guarda", "marta-guarda", "Inspectora"],
      ["Mauricio Villanueva", "mauricio-villanueva", "Inspector"],
      ["Minerva Baeza", "minerva-baeza", "Inspectora"],
      ["Raul Paredes", "raul-paredes", "Inspector"],
      // Convivencia y apoyo psicosocial
      ["Ivana Arancibia", "ivana-arancibia", "Psicóloga"],
      ["Sharon Soto", "sharon-soto", "Psicóloga"],
      ["Jessica Catalan", "jessica-catalan", "Trabajadora Social"],
      ["Ximena Ojeda", "ximena-ojeda", "Trabajadora Social"],
      // Talleres de especialidad
      ["Gabriel Pezoa", "gabriel-pezoa", "Técnico Edificación"],
      ["Eric Vera", "eric-vera", "Técnico Estructuras Metálicas"],
      ["Luis Medina", "luis-medina", "Técnico Instalaciones Sanitarias"],
      // Secretaría, informática y biblioteca
      ["Maria Jose Erices", "maria-jose-erices", "Secretaria Docencia"],
      ["Pedro Fernandez", "pedro-fernandez", "Encargado de Informática"],
      ["Jesus Espinoza", "jesus-espinoza", "Asistente de Informática"],
      ["Edith Monasterio", "edith-monasterio", "Encargada de Biblioteca"],
      // Salud y alimentación
      ["Catalina Egaña", "catalina-egana", "Nutricionista"],
      ["Selmira Vera", "selmira-vera", "Técnico Paramédico"],
      ["Andrea Sanhueza", "andrea-sanhueza", "Manipuladora de Alimentos"],
      ["Bernardita Montero", "bernardita-montero", "Manipuladora de Alimentos"],
      ["Camila Mendoza", "camila-mendoza", "Manipuladora de Alimentos"],
      ["Doris Villegas", "doris-villegas", "Manipuladora de Alimentos"],
      ["Iris Ojeda", "iris-ojeda", "Manipuladora de Alimentos"],
      ["Jacqueline Vega", "jacqueline-vega", "Manipuladora de Alimentos"],
      ["Jovita Chacon", "jovita-chacon", "Manipuladora de Alimentos"],
      ["Margarita Lipiante", "margarita-lipiante", "Manipuladora de Alimentos"],
      ["Maria Gatica", "maria-gatica", "Manipuladora de Alimentos"],
      ["Ricardo Chatre", "ricardo-chatre", "Manipulador de Alimentos"],
      // Mantención, portería y transporte
      ["Ercito Mancilla", "ercito-mancilla", "Auxiliar"],
      ["Irma Cardenas", "irma-cardenas", "Auxiliar"],
      ["Juan Vera", "juan-vera", "Auxiliar"],
      ["Luis Huala", "luis-huala", "Auxiliar"],
      ["Margarita Ortiz", "margarita-ortiz", "Auxiliar"],
      ["Maria Cardenas", "maria-cardenas", "Auxiliar"],
      ["Patricia Montecinos", "patricia-montecinos", "Auxiliar"],
      ["Veronica Retamales", "veronica-retamales", "Auxiliar"],
      ["Emerson Canales", "emerson-canales", "Encargado de Parques y Jardines"],
      ["Victor Melo", "victor-melo", "Portero"],
      ["German Sepulveda", "german-sepulveda", "Conductor"],
      ["Mauricio Muñoz", "mauricio-munoz", "Conductor"],
    ]),
  },
];

export const fuenteDotacion = FUENTE_PEI;

/** Organizaciones de la comunidad (sin integrantes publicados todavía). */
export const organizaciones = [
  { titulo: "Centro de Estudiantes", texto: "Organiza y representa a las y los estudiantes del liceo." },
  { titulo: "Centro de Padres y Apoderados", texto: "Organiza y representa a las familias ante el establecimiento." },
  {
    titulo: "Consejo Asesor Empresarial",
    texto: "Trece empresarios que apoyan la gestión, orientación y supervisión del proyecto educativo (PEI).",
  },
];
