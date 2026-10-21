# Noticias de Facebook en la portada

La sección **Últimas noticias y anuncios** de la portada puede mostrar las últimas publicaciones de la
página de Facebook del liceo ([facebook.com/indufenner](https://www.facebook.com/indufenner)).

## Cómo funciona

- **Con token:** el servidor del sitio pide a la Graph API de Meta las últimas publicaciones (texto,
  foto, fecha y enlace) y muestra hasta seis en la grilla de noticias, con el diseño del sitio. Las ve
  **cualquier persona, sin iniciar sesión en Facebook**. Se renuevan solas en segundo plano cada hora.
  El navegador del visitante no se conecta con Facebook: las fotos pasan por el optimizador de
  imágenes del sitio. Como las publicaciones no tienen título, se usa su primera línea.
- **Sin token:** la grilla muestra las noticias del propio sitio (`src/content/noticias.ts`).

Si el token deja de funcionar, el sitio vuelve solo a las noticias del sitio y registra el error en los logs de
Vercel (`[facebook] No se pudieron leer las publicaciones`). Nunca se cae la portada.

Código: `src/lib/facebook.ts` (lectura de la API) y `src/components/home/NoticiasPortada.tsx`.

## Qué se necesita

- Una persona con **acceso total (administrador)** a la página de Facebook del liceo, con su cuenta
  personal de Facebook.
- 15 minutos y acceso al proyecto en Vercel.

## Obtener el token (lo hace el administrador de la página)

Los nombres de los botones de Meta cambian con el tiempo; si alguno no coincide, busque la opción
equivalente.

1. **Cuenta de desarrollador.** Entre a <https://developers.facebook.com> con su cuenta de Facebook y
   regístrese como desarrollador (es gratis).
2. **Crear la app.** *Mis apps → Crear app*. Nombre sugerido: «Sitio web Liceo Fenner». Cuando pida
   el caso de uso, elija el relacionado con **administrar una página** (o «Otro» → tipo «Negocio»).
   La app puede quedarse en **modo desarrollo**: para leer la página de la que usted es
   administrador no hace falta la revisión de Meta.
3. **Token de usuario.** Abra el *Explorador de la API Graph*
   (<https://developers.facebook.com/tools/explorer>), elija la app en «Meta App» y en
   *Permisos* agregue `pages_show_list` y `pages_read_engagement`. Pulse **Generate Access Token** y
   acepte, marcando la página del liceo.
4. **Hacerlo de larga duración.** Copie ese token y péguelo en el *Depurador de tokens*
   (<https://developers.facebook.com/tools/debug/accesstoken>). Pulse **Extend Access Token** y copie
   el token nuevo (dura unos 60 días).
5. **Token de la página.** Vuelva al Explorador, pegue el token largo en «Access Token» y consulte:

   ```text
   me/accounts?fields=id,name,access_token
   ```

   En la respuesta, busque la página del liceo y copie su **`id`** y su **`access_token`**.
   Un token de página obtenido a partir de un token largo **no caduca**. Puede comprobarlo en el
   depurador: debe decir «Expires: Never».
6. **Probarlo (opcional).** En el Explorador, con el token de la página, consulte
   `<id>/posts?fields=message,created_time,permalink_url,full_picture&limit=3`. Deben aparecer las
   últimas publicaciones.

> El token da acceso de lectura a la página. Trátelo como una contraseña: no lo envíe por chat ni
> correo, no lo pegue en el código y guárdelo solo en Vercel.

## Configurarlo en Vercel

1. *Project → Settings → Environment Variables*.
2. Agregue, para **Production** (y si quiere también Preview):
   - `FACEBOOK_PAGE_ID` = el `id` de la página.
   - `FACEBOOK_PAGE_TOKEN` = el `access_token` de la página. Márquela como **Sensitive**.
3. *Deployments → … → Redeploy* para que el sitio lea las variables nuevas.
4. Abra la portada: «Últimas noticias y anuncios» debe mostrar las publicaciones de Facebook. Si
   siguen las noticias del sitio, revise los logs del despliegue.

Para probar en su computador, agregue las mismas dos variables a `.env.local`.

## Cuándo hay que renovar el token

El token de página deja de funcionar si la persona que lo generó:

- cambia la contraseña de Facebook,
- deja de ser administradora de la página, o
- elimina la app o le quita los permisos.

En esos casos, otra persona administradora repite los pasos 3 a 5 y actualiza `FACEBOOK_PAGE_TOKEN`
en Vercel. Mientras tanto, la portada muestra las noticias del sitio.

## Privacidad

Los visitantes no se conectan con Facebook: el servidor trae las publicaciones. La política de
privacidad del sitio (`/privacidad`, sección «Enlaces a otros sitios») lo explica. Las publicaciones son
las mismas que el liceo ya hizo públicas en Facebook: revise ahí que las fotos de estudiantes cuenten con autorización.
