export type CreditoImagen = {
  archivo: string; // ruta pública, ej. "/images/especialidades/edificacion.jpg"
  titulo: string;
  autor: string;
  licencia: string; // ej. "CC BY-SA 4.0"
  licenciaUrl: string;
  fuenteUrl: string; // página de la obra
  descripcion: string; // texto alternativo en español de Chile, describiendo lo que se ve (máx. 120 caracteres)
  ancho: number; // px reales del archivo descargado
  alto: number;
};

export const creditosImagenes: CreditoImagen[] = [
  {
    archivo: "/images/especialidades/edificacion.jpg",
    titulo: "Brick and block laying",
    autor: "Mark.murphy",
    licencia: "CC BY-SA 3.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    fuenteUrl: "https://commons.wikimedia.org/wiki/File:Brick_and_block_laying.jpg",
    descripcion: "Muro de albañilería en obra, con bloques, ladrillos, mortero en un balde, nivel y paleta",
    ancho: 1920,
    alto: 1440,
  },
  {
    archivo: "/images/especialidades/electricidad.jpg",
    titulo: "Close-up of a 200-amp breaker in the ON position",
    autor: "Moses Cursor Ssebunya",
    licencia: "CC0 1.0",
    licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    fuenteUrl: "https://wordpress.org/photos/photo/515687aa4e/",
    descripcion: "Interruptor automático de 200 A dentro de un tablero eléctrico, con cables de colores conectados",
    ancho: 2048,
    alto: 1152,
  },
  {
    archivo: "/images/especialidades/mecanica-automotriz.jpg",
    titulo: "Mechanic repairing car engine",
    autor: "Bembety",
    licencia: "CC0 1.0",
    licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    fuenteUrl: "https://commons.wikimedia.org/wiki/File:Mechanic_repairing_car_engine.jpg",
    descripcion: "Manos de un mecánico trabajando en el motor de un auto con el capó abierto",
    ancho: 1920,
    alto: 1440,
  },
  {
    archivo: "/images/especialidades/construcciones-metalicas.jpg",
    titulo: "Let the Sparks Fly - Makita 9557NB Angle Grinder",
    autor: "Mark Hunter",
    licencia: "CC BY 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by/2.0/",
    fuenteUrl: "https://commons.wikimedia.org/w/index.php?curid=148867982",
    descripcion: "Esmeril angular cortando metal, con una lluvia de chispas anaranjadas",
    ancho: 1920,
    alto: 1277,
  },
  {
    archivo: "/images/especialidades/instalaciones-sanitarias.jpg",
    titulo: "Propane torch soldering copper pipe",
    autor: "neffk",
    licencia: "CC BY 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by/2.0/",
    fuenteUrl: "https://commons.wikimedia.org/w/index.php?curid=50017388",
    descripcion: "Soplete de gas con llama azul soldando la unión de una cañería de cobre",
    ancho: 1920,
    alto: 1280,
  },
  {
    archivo: "/images/entorno/la-union.jpg",
    titulo: "Laguna Colun",
    autor: "Dentren",
    licencia: "CC BY-SA 3.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    fuenteUrl: "https://commons.wikimedia.org/wiki/File:Laguna_Colun.JPG",
    descripcion: "Laguna Colún, en la costa de la comuna de La Unión, entre cerros con bosque nativo y una duna",
    ancho: 1920,
    alto: 1440,
  },
  {
    archivo: "/images/entorno/taller.jpg",
    titulo: "Heavy Machine Shop",
    autor: "Matthew Machado",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuenteUrl: "https://commons.wikimedia.org/wiki/File:Heavy_Machine_Shop.jpg",
    descripcion: "Interior de un taller industrial antiguo con tornos y maquinaria pesada, sin personas",
    ancho: 1920,
    alto: 1280,
  },
  {
    archivo: "/images/entorno/aula-tecnica.jpg",
    titulo: "Workbench and tools (Unsplash)",
    autor: "Jeff Sheldon (Ugmonk)",
    licencia: "CC0 1.0",
    licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    fuenteUrl: "https://commons.wikimedia.org/wiki/File:Workbench_and_tools_(Unsplash).jpg",
    descripcion: "Banco de trabajo de madera con un compás de puntas y herramientas de trazado",
    ancho: 1920,
    alto: 1440,
  },
];
