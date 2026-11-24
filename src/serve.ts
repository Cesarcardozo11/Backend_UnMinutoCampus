import dotenv from 'dotenv';

// Carga las variables de entorno definidas en el archivo .env (puerto, credenciales de BD, etc.)
dotenv.config();

import app from './App';
import logger from './utils/logger';

/**
 * Puerto en el cual escuchará peticiones el servidor HTTP.
 * Se obtiene de la variable de entorno PORT o por defecto usa el puerto 3000.
 */
const PORT = process.env.PORT || 3000;

/**
 * Inicia el servidor Express en el puerto configurado.
 */
app.listen(PORT, () => {
  logger.log(`API ejecutándose exitosamente en http://localhost:${PORT}`);
});
