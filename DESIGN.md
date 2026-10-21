# Sistema visual — Liceo Bicentenario Industrial Ing. Ricardo Fenner Ruedi

## La idea

Los cinco emblemas de la insignia (casa, rayo, engranaje, grúa, llave) son las cinco
especialidades. Cada especialidad lleva el color de su emblema; el granate del marco de la
insignia es el color institucional. La portada abre con cinco carpetas con pestaña, una por
especialidad.

**El motivo** es el chaflán: el canto cortado de la pestaña de carpeta (y de una plancha de
taller). Se repite en el recorte de fotografías (`.chamfer`, `.chamfer-lg`), los botones
(`.btn`), las viñetas (`.bullet`) y las pestañas (`.tab-shape`). No se introducen otras formas
(ni círculos decorativos, ni esquinas redondeadas suaves).

## Tokens (src/app/globals.css)

| Rol | Variable | Uso |
| --- | --- | --- |
| Fondo | `--bg` / `bg-bg` | Fondo de página |
| Superficie | `--surface`, `--surface-strong` | Paso de tono para separar bloques (en vez de líneas o sombras) |
| Tinta | `--ink` / `text-ink` | Todo el texto corrido |
| Tinta secundaria | `--muted` / `text-muted` | Notas secundarias (contraste ≥ 7:1) |
| Acento | `--accent` / `bg-accent`, `text-accent` | Botón principal, enlaces, un campo de color por página |
| Especialidades | `--esp-edificacion`, `--esp-electricidad`, `--esp-mecanica`, `--esp-metalicas`, `--esp-sanitarias` (+ `-ink` para el texto encima) | Solo para lo que pertenece a esa especialidad |

Tipografía: Schibsted Grotesk (400, 600, 800). Cinco tamaños: `text-small`, `text-body`,
`text-lead`, `text-head`, `text-display` (y el `h1` de páginas internas en `Encabezado`).

## Reglas de la casa

- Títulos de dos líneas como máximo en todo ancho. Un `h1` por página; cada sección con su `h2`.
- Sin "eyebrows" (etiquetas pequeñas sobre títulos), sin numeración 01/02/03, sin monoespaciada,
  sin mayúsculas pequeñas espaciadas.
- Sin líneas finas ni cajas con borde de 1px (salvo tablas y campos de formulario). Separar con
  espacio, un paso de tono de fondo, o un cambio de escala.
- Sin degradados, sin sombras en reposo (solo en lo que flota: menús desplegables), sin vidrio/blur.
- Sin grillas de tarjetas idénticas con icono + título + texto. Cada sección vecina con una
  composición distinta.
- Sin emojis. Iconos: `lucide-react` o `Emblema`.
- Márgenes exteriores únicos: `Container` (`--gutter`). Separación entre secciones: `--section-gap`.
- Texto corrido en `--ink` a 16px o más; medida 45–75 caracteres (`.prose-liceo`, `max-w-[60ch]`).
- Movimiento: ver la sección "Sistema de movimiento" más abajo y `src/app/motion.css`.
- Áreas táctiles de 44px como mínimo.

## Contenido honesto

- Nunca inventar datos oficiales (autoridades, cifras, fechas, perfiles de egreso, contactos).
- Lo que falta se modela como `Contenido` pendiente y se muestra con `<Pendiente>`.
- Las imágenes provisionales (`provisional: true`) se rotulan "Imagen referencial" y se acreditan en `/creditos`.
- No publicar fotografías identificables de estudiantes sin autorización escrita del apoderado.

## Sistema de movimiento (src/app/motion.css)

Todo el movimiento usa `transform`, `translate`, `opacity` y `clip-path`, con las curvas
`--ease-out` (entradas) y `--ease-in-out` (desplazamientos). Con `prefers-reduced-motion`
se conservan los fundidos y se eliminan los desplazamientos.

| Clase | Qué hace | Dónde |
| --- | --- | --- |
| `.intro-line` (con `<span>` dentro) | La línea sube desde una máscara al cargar | `h1` de la portada y de cada página |
| `.intro-fade`, `.intro-insignia` | Entrada escalonada al cargar (`--i` fija el orden) | Bajadas, botones, figuras del encabezado |
| `.intro-carpeta` | Las carpetas del hero suben una a una | `HeroCarpetas` |
| `.panel-in` | Contenido de la carpeta al cambiar de especialidad | `HeroCarpetas` |
| `.rv` → `.is-in` (automático) | Al hacer scroll, cada título, párrafo, ítem, botón o foto sube y aparece; los que llegan juntos se escalonan 75 ms | Todo `main` y el pie, salvo zonas con `data-sin-rv` |
| `.rv-img`, `.parallax` | La foto se descubre de abajo hacia arriba y se desplaza levemente | `Foto` (marcada con `.reveal-img`) |
| `.zoom-img` | Zoom suave al pasar el puntero por el enlace (`.group`) | Miniaturas y fotos |
| `.flecha`, `.flecha-diagonal` | La flecha avanza al pasar el puntero | Iconos `ArrowRight` / `ArrowUpRight` |
| `.fila-mueve` | La fila se desplaza levemente al pasar el puntero | Listas de enlaces |
| `.link-linea` | Subrayado que crece desde la izquierda | Menú principal |
| `.menu-panel`, `.menu-movil` | Submenú que sale de su botón; menú móvil escalonado | `SiteHeader` |
| `.header-flotante`, `.progreso-lectura` | El encabezado se despega y una barra marca el avance de lectura | `SiteHeader` |
| `.marquesina` | Franja continua de especialidades, con botón de pausa | Portada |
| `.rv-franja` | Los cinco tramos de color del pie crecen uno tras otro | `SiteFooter` |
| View Transitions (`.pagina`) | Fundido y leve subida del contenido al cambiar de página; el encabezado queda fijo | `layout.tsx` |

Las entradas al hacer scroll las activa `Movimiento.tsx` con `IntersectionObserver` en todos los
navegadores. Lo que ya se ve al cargar nunca se oculta, y sin JavaScript el contenido siempre se ve.
Para excluir una zona con coreografía propia, agréguele `data-sin-rv`; para incluir un elemento
que no sea texto, `data-rv`.

**No usar nombres de View Transition compartidos entre páginas** (`<ViewTransition name>`): con
Cache Components la página anterior queda montada y oculta, el nombre se duplica y el navegador
cancela la transición.
