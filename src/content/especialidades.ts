import type { Contenido, Especialidad } from "@/lib/types";
import { FUENTE_PEI } from "./institucion";
import { imagenProvisional } from "./imagenes";

/**
 * Especialidades técnico-profesionales del liceo.
 *
 * Verificado en el PEI 2025-2026 (Sistema de Admisión Escolar, Mineduc):
 * - Nombres oficiales, títulos y módulos del plan de estudio (formación diferenciada).
 * - Logros y experiencias de cada especialidad.
 *
 * Entregado por el liceo (octubre de 2026), para las cinco especialidades:
 * - Descripción, áreas de aprendizaje, campo laboral e infraestructura.
 *
 * Pendiente (no se publica sin información oficial):
 * - Competencias, perfil de egreso y actividades prácticas.
 *   Para completarlos, cambie `pendiente(...)` por `{ estado: "validado", valor: [...] }`.
 */

const pendiente = (nota: string): Contenido<string[]> => ({ estado: "pendiente", nota });

const NOTA_PERFIL =
  "El perfil de egreso oficial de esta especialidad será publicado por el liceo. Mientras tanto, consulte el Proyecto Educativo Institucional.";
const NOTA_COMPETENCIAS = "Competencias pendientes de validación por la jefatura de especialidad.";
const NOTA_ACTIVIDADES = "Actividades prácticas y de taller pendientes de validación.";
const NOTA_CAMPO = "Campo laboral pendiente de validación por la jefatura de especialidad.";
const NOTA_AREA = "Descripción del área formativa pendiente de validación.";

const REX_2023 = "Rex. N° 1549 del 20 de marzo de 2023";

const base = {
  areaFormativa: pendiente(NOTA_AREA),
  competencias: pendiente(NOTA_COMPETENCIAS),
  perfilEgreso: pendiente(NOTA_PERFIL),
  actividadesPracticas: pendiente(NOTA_ACTIVIDADES),
  campoLaboral: pendiente(NOTA_CAMPO),
  galeria: [],
  enlaces: [],
};

export const especialidades: Especialidad[] = [
  {
    ...base,
    slug: "edificacion",
    nombre: "Construcción, mención Edificación",
    nombreCorto: "Edificación",
    emblema: "casa",
    color: "esp-edificacion",
    sector: "Construcción",
    imagen: imagenProvisional("/images/especialidades/edificacion.jpg"),
    // Descripción, título, áreas, campo laboral e infraestructura: texto entregado por el liceo (octubre de 2026).
    resumen: {
      texto:
        "La especialidad de Construcción Mención Edificación forma técnicos capacitados para participar en todas las etapas de un proyecto de construcción, desde la lectura e interpretación de planos hasta la ejecución y supervisión de obras.",
      validado: true,
    },
    descripcion: [
      "La especialidad de Construcción Mención Edificación forma técnicos capacitados para participar en todas las etapas de un proyecto de construcción, desde la lectura e interpretación de planos hasta la ejecución y supervisión de obras. Nuestros estudiantes desarrollan competencias en albañilería, hormigón armado, terminaciones y gestión de proyectos constructivos.",
      "Durante su formación, los estudiantes aprenden técnicas modernas de construcción, cálculo de materiales, seguridad en obras y uso de tecnología aplicada a la construcción, preparándolos para desempeñarse en el dinámico sector de la construcción.",
    ],
    areaFormativa: {
      estado: "validado",
      valor: [
        "Lectura e interpretación de planos arquitectónicos",
        "Técnicas de albañilería y mampostería",
        "Hormigón armado y estructuras",
        "Cálculo de materiales y cubicaciones",
        "Terminaciones de obra y revestimientos",
        "Topografía básica aplicada",
        "Seguridad en obras de construcción",
        "Gestión y administración de proyectos",
      ],
    },
    campoLaboral: {
      estado: "validado",
      valor: [
        "Empresas constructoras",
        "Obras de edificación habitacional",
        "Construcción de edificios comerciales",
        "Empresas de remodelación",
        "Supervisión de obras",
        "Maestro constructor independiente",
        "Empresas inmobiliarias",
        "Organismos públicos de infraestructura",
      ],
    },
    titulo: "Técnico de Nivel Medio en Construcción, mención Edificación",
    tituloNota: "Reconocido por el Ministerio de Educación",
    infraestructuraTexto:
      "Disponemos de talleres especializados y áreas de práctica donde los estudiantes pueden desarrollar proyectos reales de construcción bajo supervisión profesional.",
    plan: {
      resolucion: REX_2023,
      fuente: FUENTE_PEI,
      modulos: [
        "Armado e Instalación de Enfierradura",
        "Preparación y Colocación de Hormigones",
        "Carpintería de Obra Gruesa",
        "Dibujo Técnico e Interpretación de Planos de Edificación",
        "Revestimiento de Pisos, Muros y Cielos",
        "Protecciones Hídricas y de Cubiertas",
        "Carpintería de Terminaciones",
        "Obra Gruesa con Módulos Prefabricados",
      ],
    },
    espacios: [
      { nombre: "Taller de Construcción", detalle: "Espacio equipado para prácticas de albañilería y hormigón" },
      { nombre: "Sala de Proyectos", detalle: "Computadores con software de diseño y planificación" },
      { nombre: "Herramientas Profesionales", detalle: "Equipos y herramientas de construcción especializadas" },
    ],
    logros: [
      { anio: "2024", texto: "Pasantía en la Universidad Técnica Federico Santa María, en Concepción." },
    ],
  },
  {
    ...base,
    slug: "electricidad",
    nombre: "Electricidad",
    nombreCorto: "Electricidad",
    emblema: "rayo",
    color: "esp-electricidad",
    sector: "Electricidad",
    imagen: imagenProvisional("/images/especialidades/electricidad.jpg"),
    // Descripción, título, áreas, campo laboral e infraestructura: texto entregado por el liceo (octubre de 2026).
    resumen: {
      texto:
        "La especialidad de Electricidad forma técnicos capacitados para diseñar, instalar, mantener y reparar sistemas eléctricos en instalaciones residenciales, comerciales e industriales.",
      validado: true,
    },
    descripcion: [
      "La especialidad de Electricidad forma técnicos capacitados para diseñar, instalar, mantener y reparar sistemas eléctricos en instalaciones residenciales, comerciales e industriales. Nuestros estudiantes adquieren conocimientos sólidos en circuitos eléctricos, automatización, control industrial y energías renovables.",
      "Durante 3° y 4° medio, los estudiantes desarrollan competencias prácticas en nuestros talleres equipados con tecnología moderna, preparándolos para insertarse exitosamente en el mundo laboral o continuar estudios superiores en el área.",
    ],
    areaFormativa: {
      estado: "validado",
      valor: [
        "Instalaciones eléctricas domiciliarias e industriales",
        "Circuitos eléctricos y electrónica básica",
        "Automatización y control industrial",
        "Máquinas eléctricas y transformadores",
        "Energías renovables y eficiencia energética",
        "Normativa eléctrica y seguridad",
        "Lectura e interpretación de planos eléctricos",
        "Mantención preventiva y correctiva",
      ],
    },
    campoLaboral: {
      estado: "validado",
      valor: [
        "Empresas de instalaciones eléctricas",
        "Industrias y plantas de producción",
        "Empresas de mantención eléctrica",
        "Constructoras y obras civiles",
        "Empresas de energías renovables",
        "Servicios técnicos independientes",
        "Empresas de automatización industrial",
        "Sector minero y energético",
      ],
    },
    titulo: "Técnico de Nivel Medio en Electricidad",
    tituloNota: "Reconocido por el Ministerio de Educación",
    infraestructuraTexto:
      "Contamos con talleres completamente equipados con herramientas y equipos de última generación para que nuestros estudiantes desarrollen sus habilidades en un ambiente profesional.",
    plan: {
      resolucion: REX_2023,
      fuente: FUENTE_PEI,
      modulos: [
        "Instalación y Montaje de Circuitos de Fuerza y Equipos Eléctricos",
        "Proyecto y Diseño de Sistemas de Alumbrado y Fuerza según SEC",
        "Análisis y Medición de Circuitos Eléctricos de Corriente Continua y Corriente Alterna",
        "Electrónica Analógica Digital",
        "Taller de Redes de Distribución",
        "Sistemas Fotovoltaicos",
        "Mantención de Máquinas Eléctricas",
        "Taller de Procesos Automatizados",
        "Sistema de Control Domótico",
        "Neumática y Electroneumática",
        "Energías Renovables no Convencionales y Eficiencia Energética",
        "Refrigeración Industrial",
      ],
    },
    espacios: [
      { nombre: "Taller de Instalaciones", detalle: "Paneles de práctica y simuladores de instalaciones reales" },
      { nombre: "Laboratorio de Control", detalle: "PLCs, sensores y sistemas de automatización industrial" },
      { nombre: "Equipos Profesionales", detalle: "Instrumentos de medición y herramientas especializadas" },
    ],
    logros: [
      { anio: "2024", texto: "Medalla de Oro en Instalaciones Eléctricas y en Robótica Móvil, y Medalla de Plata en Control Industrial, en la VIII Olimpiada Técnica Nacional WorldSkills." },
      { anio: "2024", texto: "Tercer lugar en la IV Olimpiada de Electricidad del CFT de Los Ríos y pasantía en sistemas fotovoltaicos en Ovalle." },
      { anio: "2018", texto: "Primer lugar en las Olimpiadas Nacionales de Mecatrónica FESTO, con capacitación en industria 4.0 en São Paulo en 2019." },
      { anio: "2015", texto: "Participación en WorldSkills Mundial, en Brasil, en la habilidad de Electricidad." },
      { anio: "2012", texto: "Cuarto lugar en la habilidad de Electricidad en WorldSkills Américas, en São Paulo." },
    ],
  },
  {
    ...base,
    slug: "mecanica-automotriz",
    nombre: "Mecánica Automotriz",
    nombreCorto: "Mecánica Automotriz",
    emblema: "engranaje",
    color: "esp-mecanica",
    sector: "Metalmecánico",
    imagen: imagenProvisional("/images/especialidades/mecanica-automotriz.jpg"),
    // Descripción, título, áreas, campo laboral e infraestructura: texto entregado por el liceo (octubre de 2026).
    resumen: {
      texto:
        "La especialidad de Mecánica Automotriz forma técnicos capacitados para diagnosticar, mantener y reparar sistemas mecánicos y electrónicos de vehículos livianos y pesados.",
      validado: true,
    },
    descripcion: [
      "La especialidad de Mecánica Automotriz forma técnicos capacitados para diagnosticar, mantener y reparar sistemas mecánicos y electrónicos de vehículos livianos y pesados. Nuestros estudiantes desarrollan competencias en motores, sistemas de transmisión, frenos, suspensión, electricidad automotriz y diagnóstico computarizado.",
      "Durante su formación, los estudiantes trabajan con vehículos reales y tecnología de diagnóstico moderna, aprendiendo tanto mecánica tradicional como sistemas electrónicos avanzados, preparándolos para el dinámico sector automotriz actual.",
    ],
    areaFormativa: {
      estado: "validado",
      valor: [
        "Motores de combustión interna bencineros y diésel",
        "Sistemas de transmisión manual y automática",
        "Sistemas de frenos y suspensión",
        "Electricidad y electrónica automotriz",
        "Diagnóstico computarizado con scanner",
        "Sistemas de inyección electrónica",
        "Aire acondicionado automotriz",
        "Mantención preventiva y correctiva",
      ],
    },
    campoLaboral: {
      estado: "validado",
      valor: [
        "Talleres mecánicos automotrices",
        "Concesionarias de vehículos",
        "Empresas de transporte",
        "Servicios técnicos especializados",
        "Empresas de mantención de flotas",
        "Mecánico independiente",
        "Empresas mineras y forestales",
        "Centros de revisión técnica",
      ],
    },
    titulo: "Técnico de Nivel Medio en Mecánica Automotriz",
    tituloNota: "Reconocido por el Ministerio de Educación",
    infraestructuraTexto:
      "Contamos con talleres completamente equipados con vehículos, herramientas y tecnología de diagnóstico para una formación práctica de excelencia.",
    plan: {
      resolucion: REX_2023,
      fuente: FUENTE_PEI,
      modulos: [
        "Mantención y Reparación de Sistemas Eléctricos y Electrónicos",
        "Mantención y Reparación de Motores de Combustión Interna y Sistemas Auxiliares",
        "Sistemas Neumáticos e Hidráulicos y Mantenimiento de Vehículos",
        "Automatización y Mantenimiento de los Sistemas de Dirección, Suspensión, Transmisión y Frenos",
        "Mecánica Automotriz y Electricidad",
        "Maquinarias y Equipos",
      ],
    },
    espacios: [
      { nombre: "Taller Mecánico", detalle: "Vehículos reales y elevadores para prácticas completas" },
      { nombre: "Equipos de Diagnóstico", detalle: "Scanner automotriz y equipos de medición especializados" },
      { nombre: "Herramientas Profesionales", detalle: "Set completo de herramientas mecánicas y neumáticas" },
    ],
    logros: [
      { anio: "2024", texto: "Medalla de Excelencia en Tecnología Mecánica en la VIII Olimpiada Técnica Nacional WorldSkills." },
      { anio: "2024", texto: "Visita técnica a SIMOTOR y a INACAP Osorno." },
      { anio: "2012", texto: "Participación en WorldSkills Américas, en São Paulo." },
    ],
  },
  {
    ...base,
    slug: "construcciones-metalicas",
    nombre: "Construcciones Metálicas",
    nombreCorto: "Construcciones Metálicas",
    emblema: "grua",
    color: "esp-metalicas",
    sector: "Metalmecánico",
    imagen: imagenProvisional("/images/especialidades/construcciones-metalicas.jpg"),
    // Descripción, áreas, campo laboral e infraestructura: texto entregado por el liceo (octubre de 2026).
    // El texto del liceo dice "Estructuras Metálicas"; el nombre y el título oficiales (PEI) son "Construcciones Metálicas".
    resumen: {
      texto:
        "La especialidad de Estructuras Metálicas forma técnicos capacitados para diseñar, fabricar y montar estructuras de acero para la construcción, industria y minería.",
      validado: true,
    },
    descripcion: [
      "La especialidad de Estructuras Metálicas forma técnicos capacitados para diseñar, fabricar y montar estructuras de acero para la construcción, industria y minería. Nuestros estudiantes desarrollan competencias en soldadura, corte, plegado, lectura de planos estructurales y cálculo de estructuras metálicas.",
      "Durante su formación, los estudiantes trabajan con equipos industriales de soldadura, corte y conformado de metales, aprendiendo técnicas modernas de fabricación y montaje de estructuras, preparándolos para el sector industrial y de la construcción.",
    ],
    areaFormativa: {
      estado: "validado",
      valor: [
        "Soldadura al arco eléctrico (SMAW, GMAW, GTAW)",
        "Lectura e interpretación de planos estructurales",
        "Corte y conformado de metales",
        "Cálculo y diseño de estructuras metálicas",
        "Montaje de estructuras industriales",
        "Trazado y desarrollo de piezas metálicas",
        "Seguridad en trabajos de altura y soldadura",
        "Control de calidad en soldadura",
      ],
    },
    campoLaboral: {
      estado: "validado",
      valor: [
        "Empresas de fabricación de estructuras metálicas",
        "Constructoras de obras industriales",
        "Empresas de montaje industrial",
        "Talleres de soldadura y calderería",
        "Industria minera y forestal",
        "Empresas de mantención industrial",
        "Maestranza y talleres mecánicos",
        "Proyectos de infraestructura",
      ],
    },
    titulo: "Técnico de Nivel Medio en Construcciones Metálicas",
    tituloNota: "Reconocido por el Ministerio de Educación",
    infraestructuraTexto:
      "Nuestros talleres están equipados con maquinaria industrial y equipos de soldadura profesionales para una formación práctica de alto nivel.",
    plan: {
      resolucion: "Rex. N° 232 de 2016 (1° y 2° medio) y Rex. N° 678 de 2020 (3° y 4° medio)",
      fuente: FUENTE_PEI,
      modulos: [
        "Carpintería Metálica",
        "Forja y Tratamientos Térmicos",
        "Soldadura",
        "Diseño de Estructuras y Trazado de Piezas Metálicas",
        "Taller de Fabricación, Armado, Montaje y Reparación de Construcciones Metálicas I y II",
        "Tratamiento de Superficies",
        "Fundaciones y Anclajes",
        "Carpintería de Construcción",
        "Soldadura y Estructura",
        "Topografía Básica",
      ],
    },
    espacios: [
      { nombre: "Taller de Soldadura", detalle: "Equipos de soldadura eléctrica, MIG/MAG y TIG" },
      { nombre: "Maquinaria Industrial", detalle: "Plegadoras, cizallas, taladros y equipos de corte" },
      { nombre: "Área de Montaje", detalle: "Espacio para ensamblaje de estructuras a escala real" },
    ],
    logros: [
      { anio: "2024", texto: "Medalla de Excelencia en Soldadura en la VIII Olimpiada Técnica Nacional WorldSkills." },
      { anio: "2024", texto: "Pasantía en soldadura en Colombia, como preparación para WorldSkills internacional, y participación en la Olimpiada Internacional WorldSkills de Soldadura en Estados Unidos." },
      { anio: "2016–2018", texto: "Podio en WorldSkills Chile de manera sistemática." },
    ],
  },
  {
    ...base,
    slug: "instalaciones-sanitarias",
    nombre: "Instalaciones Sanitarias",
    nombreCorto: "Instalaciones Sanitarias",
    emblema: "llave",
    color: "esp-sanitarias",
    sector: "Construcción",
    imagen: imagenProvisional("/images/especialidades/instalaciones-sanitarias.jpg"),
    // Descripción, título, áreas, campo laboral e infraestructura: texto entregado por el liceo (octubre de 2026).
    resumen: {
      texto:
        "La especialidad de Instalaciones Sanitarias forma técnicos capacitados para diseñar, instalar y mantener sistemas de agua potable, alcantarillado, gas y climatización en edificaciones residenciales, comerciales e industriales.",
      validado: true,
    },
    descripcion: [
      "La especialidad de Instalaciones Sanitarias forma técnicos capacitados para diseñar, instalar y mantener sistemas de agua potable, alcantarillado, gas y climatización en edificaciones residenciales, comerciales e industriales. Nuestros estudiantes adquieren conocimientos en gasfitería, cañerías, sistemas de calefacción y normativas sanitarias vigentes.",
      "Durante su formación, los estudiantes desarrollan habilidades prácticas en la instalación de redes sanitarias, sistemas de evacuación de aguas, instalaciones de gas y sistemas de climatización, preparándolos para responder a las necesidades del sector construcción e industria.",
    ],
    areaFormativa: {
      estado: "validado",
      valor: [
        "Instalaciones de agua potable fría y caliente",
        "Sistemas de alcantarillado y evacuación",
        "Instalaciones de gas domiciliario e industrial",
        "Sistemas de calefacción y climatización",
        "Lectura e interpretación de planos sanitarios",
        "Normativa sanitaria y de seguridad",
        "Cálculo de redes y dimensionamiento",
        "Mantención y reparación de sistemas",
      ],
    },
    campoLaboral: {
      estado: "validado",
      valor: [
        "Empresas de instalaciones sanitarias",
        "Constructoras y obras de edificación",
        "Empresas de mantención de edificios",
        "Servicios de gasfitería independiente",
        "Empresas de climatización",
        "Industrias y plantas de producción",
        "Empresas de instalaciones de gas",
        "Servicios públicos sanitarios",
      ],
    },
    titulo: "Técnico de Nivel Medio en Instalaciones Sanitarias",
    tituloNota: "Reconocido por el Ministerio de Educación",
    infraestructuraTexto:
      "Nuestros talleres cuentan con instalaciones completas para que los estudiantes practiquen en condiciones similares a las que encontrarán en el campo laboral.",
    plan: {
      resolucion: REX_2023,
      fuente: FUENTE_PEI,
      modulos: [
        "Diseño de Planos e Interpretación de Manuales de Instalaciones Sanitarias",
        "Electricidad Básica y Aplicada",
        "Instalación y Mantención de Redes de Agua Potable y Artefactos Sanitarios",
        "Instalación y Mantención de Redes de Captación, Tratamiento y Evacuación de Aguas I y II",
        "Instalación y Mantención de Redes y Artefactos a Gas",
        "Uniones y Soldaduras",
        "Soluciones Sanitarias (Alcantarillado)",
        "Soluciones Sanitarias (Particulares)",
        "Instalaciones Térmicas de Energías Renovables y no Renovables",
        "Instalación y Mantención de Redes de Gas (baja presión SEC)",
        "Instalación de Sistemas de Riego Tecnificado",
        "Topografía Básica",
      ],
    },
    espacios: [
      { nombre: "Taller de Cañerías", detalle: "Paneles de práctica con redes de agua y alcantarillado" },
      { nombre: "Laboratorio de Gas", detalle: "Instalaciones para prácticas de sistemas de gas" },
      { nombre: "Herramientas Especializadas", detalle: "Equipos profesionales de gasfitería y soldadura" },
    ],
    logros: [
      { anio: "2024", texto: "Destacada participación en Riego Tecnificado en la VIII Olimpiada Técnica Nacional WorldSkills." },
      { anio: "2016–2018", texto: "Podio en WorldSkills Chile de manera sistemática." },
      { anio: "2012", texto: "Participación en WorldSkills Américas, en São Paulo." },
    ],
  },
];

export function getEspecialidad(slug: string): Especialidad | undefined {
  return especialidades.find((e) => e.slug === slug);
}
