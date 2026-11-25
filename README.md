# Fotos de la boda 📷💌

Los invitados escanean un QR, toman o eligen fotos y las envían directo a TU Google Drive.
No pueden ver ni acceder a tu Drive: el script solo sabe *guardar* fotos.

## Paso 1 · Carpeta en Drive
1. Crea una carpeta en tu Google Drive (ej. "Fotos de la boda").
2. Ábrela y copia el ID de la URL: `drive.google.com/drive/folders/ESTE_ES_EL_ID`.
   (No necesitas compartir la carpeta con nadie.)

## Paso 2 · Script receptor (Google Apps Script)
1. Entra a https://script.google.com → **Nuevo proyecto**.
2. Borra lo que haya y pega el contenido de `apps-script/Code.gs`.
3. Cambia `PEGA_AQUI_EL_ID_DE_TU_CARPETA` por el ID del paso 1.
4. **Implementar → Nueva implementación → tipo "Aplicación web"**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Autoriza los permisos (Google avisará que la app no está verificada: *Avanzado → Ir a proyecto*).
6. Copia la **URL de la aplicación web** (termina en `/exec`).

## Paso 3 · Configurar la página
En `index.html`, bloque `CONFIG`, cambia:
- `names` y `date` por los de ustedes
- `scriptUrl` por la URL del paso 2

## Paso 4 · Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub (ej. `boda`) y sube **todos** estos archivos (incluido `.nojekyll`).
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.
3. Tu página quedará en `https://TUUSUARIO.github.io/boda/`.

## Paso 5 · Generar e imprimir el QR
Abre `https://TUUSUARIO.github.io/boda/generar-qr.html`, confirma la dirección y pulsa
**Descargar PNG** o **Imprimir**. ¡Pruébalo con tu celular antes de imprimir!

## Notas
- Si cambias `Code.gs` después, usa **Implementar → Administrar implementaciones → editar → Nueva versión** (la URL se mantiene).
- Las fotos se reducen a ~2400 px antes de enviarse para que suban rápido con datos móviles.
- Cada foto se guarda como `fecha-hora_Nombre_xxxx.jpg`.
- Privacidad: la URL del script es visible en el código de la página (así funcionan todos los sitios estáticos). Alguien con conocimientos podría enviar fotos, pero nunca ver ni borrar las tuyas. Si pasada la boda quieres cerrarlo, deshabilita la implementación en Apps Script.
