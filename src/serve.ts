import dotenv from 'dotenv';

// Carga las variables del archivo .env (puerto y datos de la base)
dotenv.config();

import app from './App';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.log(`API ejecutandose en http://localhost:${PORT}`);
});
