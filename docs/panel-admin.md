# Panel de administración

El sitio tiene un panel en **`/admin`** (por ejemplo `https://dominio-del-liceo.cl/admin`) para
agregar, editar y eliminar contenido sin tocar código. Está hecho con
[Sveltia CMS](https://sveltiacms.app), gratuito y de código abierto.

## Qué se puede editar

| Sección del panel | Qué cambia en el sitio |
| --- | --- |
| **Noticias** | Crear, editar y borrar noticias. Las seis más recientes salen en la portada y todas en `/noticias`. Cada una tiene su página. |
| **Portada → Cifras de la portada** | Los números bajo el video (30 años, 850+ alumnos…). |
| **Portada → ¿Por qué estudiar aquí?** | Las razones para elegir el liceo. |
| **Portada → Calendario de admisión** | Las fechas del SAE en la franja granate. **Actualícelas cada año** con las fechas oficiales del Mineduc. |
| **Portada → Residencia escolar** | El bloque del internado. |
| **Portada → Preguntas frecuentes** | Preguntas y respuestas desplegables. |
| **Datos del sitio → Datos de contacto** | Dirección, teléfonos, correos, redes sociales y horario (franja superior, pie de página, contacto). |
| **Datos del sitio → Comunidad educativa** | Grupos y personas: agregar, quitar u ordenar funcionarios, cambiar cargos y fotos. |

El resto del sitio (especialidades, historia, documentos, textos de las páginas) todavía se edita en
el código. Se puede sumar al panel más adelante.

## Cómo funciona

- Todo lo que se guarda en el panel queda como un cambio (commit) en el repositorio de GitHub
  `FeliGar18/webLiceo`, rama `main`. Hay historial completo: cualquier cambio se puede revisar o
  deshacer.
- Vercel detecta el cambio y **vuelve a publicar el sitio en uno o dos minutos**. No es instantáneo.
- Antes de publicar, el sitio **revisa los datos** (por ejemplo, que la fecha sea válida o que haya
  al menos un correo). Si algo quedó mal, Vercel no publica ese cambio y **el sitio anterior sigue en
  línea**. El error aparece en *Vercel → Deployments*; se corrige desde el panel y se guarda de nuevo.
- No hay base de datos ni costo adicional.

## Quién puede entrar

Cada persona que edite necesita:

1. Una **cuenta de GitHub** (gratis, en <https://github.com/signup>).
2. **Permiso de escritura** en el repositorio: el dueño entra a
   *github.com/FeliGar18/webLiceo → Settings → Collaborators → Add people* e invita a la persona. La
   persona acepta la invitación desde su correo.

Quite el acceso (en la misma pantalla) cuando alguien deje de encargarse del sitio.

## Entrar al panel

1. Abra `https://<dominio-del-sitio>/admin`.
2. Pulse **«Iniciar sesión con un token de acceso»** (el botón «Iniciar sesión con GitHub» requiere
   un servidor adicional que no está configurado).
3. El panel muestra un enlace para **crear el token en GitHub**. Al crearlo:
   - *Token name*: por ejemplo «Panel sitio liceo».
   - *Expiration*: 90 días o 1 año (cuando caduque, se crea otro y se repite este paso).
   - *Repository access*: **Only select repositories** → `FeliGar18/webLiceo`.
   - *Permissions → Repository permissions → **Contents: Read and write***. Nada más.
   - Pulse *Generate token* y copie el código (empieza con `github_pat_`).
4. Pegue el token en el panel. El navegador lo recuerda; no hay que repetirlo cada vez.

> El token es como una contraseña: no lo comparta ni lo envíe por correo o chat. Úselo solo en su
> propio computador. Si cree que alguien lo vio, bórrelo en *GitHub → Settings → Developer
> settings → Personal access tokens* y cree otro.

## Publicar una noticia

1. **Noticias → Nueva noticia**.
2. Complete **Título**, **Fecha**, **Categoría** y **Resumen** (lo que se lee en la tarjeta de la
   portada).
3. En **Texto de la noticia**, separe los párrafos con una línea en blanco.
4. **Foto** (opcional): súbala horizontal, idealmente de unos 1600 px de ancho. Escriba en
   **Descripción de la foto** qué se ve en ella. Sin foto, la tarjeta muestra el engranaje de la
   insignia.
5. **Guardar**. En uno o dos minutos aparece en la portada y en `/noticias`.

La dirección de la noticia se crea sola a partir del título (por ejemplo
`/noticias/feria-tecnica-regional`). Para borrar una noticia, ábrala y use **Eliminar**.

Las noticias de ejemplo que trae el sitio tienen marcada la casilla «Es un texto de ejemplo»:
bórrelas cuando publiquen las primeras noticias reales.

## Comunidad educativa

- Cada grupo (Equipo directivo, Docentes, etc.) tiene su lista de personas. Arrastre para cambiar el
  orden; el orden del panel es el de la página.
- **Foto**: vertical (4:5), de unos 640 × 800 px. La tarjeta la recorta a ese formato.
- **Destacar a la primera persona**: deja a la primera persona sola arriba (se usa para el director).
- Publique nombres y fotos **solo con autorización** de cada persona.

## Reglas que conviene respetar

- No publicar fotos donde se identifique a estudiantes sin autorización escrita del apoderado.
- No inventar datos oficiales: si un teléfono o correo no está confirmado, márquelo «Por confirmar»
  (el sitio lo muestra con un aviso).
- Solo correos institucionales, nunca personales.

## Para quien mantiene el código

- Los archivos que edita el panel están en `src/content/datos/` (JSON) y las fotos en
  `public/images/noticias/`, `public/images/comunidad/` y `public/images/subidas/`.
- La configuración del panel está en `public/admin/config.yml`. El script del panel se copia desde
  `node_modules/@sveltia/cms` a `public/admin/cms/` antes de `dev` y `build`
  (`scripts/copiar-cms.mjs`); esa carpeta no se sube al repositorio. La versión está fijada en
  `package.json`.
- Cada archivo se valida con zod al compilar (`src/content/noticias.ts`, `cifras.ts`, `comunidad.ts`,
  `institucion.ts`).
- `/admin` tiene su propia política de seguridad (CSP) en `next.config.ts` y no se indexa.
- En desarrollo, el panel ofrece «Trabajar con un repositorio local» (Chrome o Edge): edita los
  archivos de la carpeta del proyecto directamente, sin token. Las noticias nuevas se ven al
  reiniciar `npm run dev`.
