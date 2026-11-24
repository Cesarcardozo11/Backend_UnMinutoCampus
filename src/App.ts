import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import materiasRoutes from './routes/materias.routes';

/**
 * Instancia principal de la aplicación Express.
 */
const app: Application = express();

/* ==========================================================================
   CONFIGURACIÓN DE MIDDLEWARES GLOBALES
   ========================================================================== */

/**
 * CORS (Cross-Origin Resource Sharing):
 * Permite que clientes alojados en otros dominios o puertos (como Angular en http://localhost:4200)
 * puedan realizar peticiones HTTP hacia este servidor backend.
 */
app.use(cors());

/**
 * Body Parser:
 * Permite a la aplicación interceptar y parsear cuerpos de peticiones en formato JSON (Content-Type: application/json),
 * exponiéndolos convenientemente en el objeto `req.body`.
 */
app.use(express.json());

/**
 * Logger Middleware:
 * Registra en consola cada petición entrante indicando el método HTTP (GET, POST, etc.) y la ruta solicitada.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.log(`${req.method} ${req.path}`);
  next(); // Pasa la ejecución al siguiente middleware o controlador
});

/* ==========================================================================
   DEFINICIÓN DE RUTAS
   ========================================================================== */

/**
 * @route   GET /api/v1/health
 * @desc    Ruta de comprobación de estado (Health Check) para verificar que el servicio está activo
 * @access  Público
 */
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

/**
 * @route   /api/v1/materias
 * @desc    Monta el conjunto de rutas REST asociadas al módulo de Materias
 */
app.use('/api/v1/materias', materiasRoutes);

export default app;
