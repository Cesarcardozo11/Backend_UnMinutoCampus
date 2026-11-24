// Muestra un mensaje en la consola con la fecha y hora
function log(mensaje: string, datos?: unknown): void {
  const fecha = new Date().toLocaleString('es-ES');

  if (datos !== undefined) {
    console.log(fecha, mensaje, datos);
  } else {
    console.log(fecha, mensaje);
  }
}

export const logger = { log };

export default logger;
