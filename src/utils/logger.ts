/**
 * Utilidad de registro de eventos (Logger) para el servidor.
 * Formatea los mensajes con una marca temporal legible en español.
 *
 * @param mensaje - Texto descriptivo del evento o acción realizada
 * @param datos   - (Opcional) Información complementaria o payload para depuración
 */
function log(mensaje: string, datos?: unknown): void {
  const fecha = new Date().toLocaleString('es-ES');

  if (datos !== undefined) {
    console.log(`[${fecha}]`, mensaje, datos);
  } else {
    console.log(`[${fecha}]`, mensaje);
  }
}

export const logger = { log };

export default logger;
