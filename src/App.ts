import express from 'express';
import cors from 'cors';
import logger from './utils/logger';
import materiasRoutes from './routes/materias.routes';

const app = express();

// Permite que Angular (otro puerto) llame a la API
app.use(cors());

// Permite leer el body de las peticiones en formato JSON
app.use(express.json());

// Registra cada petición que llega
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.path}`);
  next();
});

// Ruta para comprobar que la API está viva
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Rutas del módulo Materias
app.use('/api/v1/materias', materiasRoutes);

export default app;
