import type { Contenido, Especialidad } from "@/lib/types";
import { FUENTE_PEI } from "./institucion";
import { imagenProvisional } from "./imagenes";

/**
 * Especialidades técnico-profesionales del liceo.
 *
 * Verificado en el PEI 2025-2026 (Sistema de Admisión Escolar, Mineduc):
 * - Nombres oficiales y módulos del plan de estudio (formación diferenciada).
 * - Talleres y laboratorios del liceo.
 * - Logros y experiencias de cada especialidad.
 *
 * Provisional (el liceo debe validarlo):
 * - Los resúmenes (`validado: false`).
 *
 * Pendiente (no se publica sin información oficial):
 * - Competencias, perfil de egreso, actividades prácticas y campo laboral.
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

const LAB = "Uno de los ocho laboratorios con que cuenta el liceo.";
const TALLER = "Uno de los cinco talleres de especialidad del liceo, donde se realizan las prácticas del plan de estudio.";
const MULTISECTORIAL = {
  nombre: "Taller Multisectorial de Innovación y Tecnología",
  detalle: "Implementado en 2020 y 2021 dentro del programa Liceos Bicentenario, compartido por las especialidades.",
};

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
    resumen: {
      texto:
        "Formación en los procesos de una obra de edificación: lectura de planos, trazado, obra gruesa y terminaciones, con trabajo en taller y en terreno.",
      validado: false,
    },
    titulo: "Técnico de Nivel Medio en Construcción, mención Edificación",
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
      { nombre: "Taller de Edificación", detalle: TALLER },
      { nombre: "Laboratorio de Dibujo", detalle: LAB },
      MULTISECTORIAL,
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
    resumen: {
      texto:
        "Formación en instalaciones eléctricas: circuitos, tableros, canalizaciones y normas de seguridad eléctrica, con práctica en laboratorio y taller.",
      validado: false,
    },
    titulo: "Técnico de Nivel Medio en Electricidad",
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
      { nombre: "Taller de Electricidad", detalle: TALLER },
      { nombre: "Laboratorio de Electrónica", detalle: LAB },
      { nombre: "Laboratorio de Neumática", detalle: LAB },
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
    resumen: {
      texto:
        "Formación en el diagnóstico, mantenimiento y reparación de vehículos: motor, transmisión, frenos, suspensión y sistemas eléctricos.",
      validado: false,
    },
    titulo: "Técnico de Nivel Medio en Mecánica Automotriz",
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
      { nombre: "Taller de Mecánica Automotriz", detalle: TALLER },
      { nombre: "Laboratorio de Autotrónica", detalle: LAB },
      { nombre: "Laboratorio de Neumática", detalle: LAB },
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
    resumen: {
      texto:
        "Formación en el trazado, corte, soldadura y montaje de estructuras de acero, desde la lectura del plano hasta la pieza terminada.",
      validado: false,
    },
    titulo: "Técnico de Nivel Medio en Construcciones Metálicas",
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
      { nombre: "Taller de Construcciones Metálicas", detalle: TALLER },
      { nombre: "Simulador de Soldadura", detalle: LAB },
      MULTISECTORIAL,
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
    resumen: {
      texto:
        "Formación en redes de agua potable, alcantarillado y gas: trazado, unión de tuberías, artefactos sanitarios y pruebas de instalación.",
      validado: false,
    },
    titulo: "Técnico de Nivel Medio en Instalaciones Sanitarias",
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
      { nombre: "Taller de Instalaciones Sanitarias", detalle: TALLER },
      MULTISECTORIAL,
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
