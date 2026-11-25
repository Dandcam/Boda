/**
 * RECEPTOR DE FOTOS DE BODA  ->  Google Drive
 *
 * Este script SOLO sabe guardar fotos en UNA carpeta de tu Drive.
 * No tiene ninguna función para listar, leer ni descargar archivos,
 * así que quien use el enlace nunca puede ver lo que ya está guardado.
 */

// 1) Pega aquí el ID de tu carpeta de Drive (lo que aparece después de /folders/ en la URL)
const FOLDER_ID = 'PEGA_AQUI_EL_ID_DE_TU_CARPETA';

// 2) Límites de seguridad
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB por foto
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'image/gif'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const mime = String(data.mime || '');
    if (ALLOWED.indexOf(mime) === -1) return out({ ok: false, error: 'tipo' });

    const bytes = Utilities.base64Decode(data.data);
    if (bytes.length > MAX_BYTES) return out({ ok: false, error: 'tamano' });

    const guest = String(data.guest || 'Invitado').replace(/[^\wáéíóúñÁÉÍÓÚÑ \-]/g, '').trim().slice(0, 30) || 'Invitado';
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
    const ext = mime.split('/')[1].replace('jpeg', 'jpg');
    const name = stamp + '_' + guest + '_' + Math.floor(Math.random() * 9000 + 1000) + '.' + ext;

    const blob = Utilities.newBlob(bytes, mime, name);
    DriveApp.getFolderById(FOLDER_ID).createFile(blob);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: 'servidor' });
  }
}

// Visitar el enlace en el navegador solo muestra que el servicio está activo.
function doGet() {
  return ContentService.createTextOutput('Servicio de fotos activo 💌');
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
