# LIFE-US — Sitio B2B

Sitio estático de una sola página (HTML/CSS/JS, sin build) para lifeus.cl.

## 1. Activar el formulario de contacto (Web3Forms)

El formulario usa [Web3Forms](https://web3forms.com) — servicio gratuito que reenvía los envíos por email sin necesidad de backend propio.

1. Andá a https://web3forms.com y creá una access key gratuita con el email **n.brunettoa@gmail.com** (o el que prefieras como principal).
2. Una vez generada la key, en el dashboard de Web3Forms agregá **joaquinrodriguez0898@gmail.com** como destinatario adicional (sección "Additional Emails" / "Manage Access Key"), para que las consultas lleguen a ambos correos.
3. Copiá la access key y reemplazá el placeholder en [index.html](index.html), en el `<form id="contactForm">`:
   ```html
   <input type="hidden" name="access_key" value="WEB3FORMS_ACCESS_KEY_AQUI">
   ```
   por tu key real.
4. Probá el formulario en producción (o corriendo el sitio localmente) para confirmar que el email llega.

No hace falta backend, base de datos ni variables de entorno: la key vive en el HTML porque Web3Forms está diseñado para uso client-side (limita por dominio/origen desde su dashboard si querés restringir el uso a lifeus.cl).

## 2. Deploy a Vercel

1. Subí este repo a GitHub (ver abajo).
2. En https://vercel.com → **Add New Project** → importá el repo.
3. Framework: **Other** (sitio estático, sin build command, sin output directory — Vercel sirve `index.html` directo).
4. Deploy.

```bash
git remote add origin <URL_DE_TU_REPO_GITHUB>
git push -u origin master
```

## 3. Conectar el dominio lifeus.cl

1. En el proyecto de Vercel → **Settings → Domains** → agregá `lifeus.cl` (y `www.lifeus.cl` si lo vas a usar).
2. Vercel te va a dar registros DNS (A/CNAME) para configurar en el proveedor donde compraste el dominio.
3. Una vez propagado el DNS (puede tardar hasta 24-48hs), el sitio queda accesible en lifeus.cl con HTTPS automático.

## Estructura

- `index.html` — sitio completo (HTML, CSS y JS inline, sin dependencias de build).
- Sin `package.json` / `vercel.json`: no son necesarios para un sitio estático de una sola página.
