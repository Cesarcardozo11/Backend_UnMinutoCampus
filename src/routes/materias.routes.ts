import { Router } from 'express';
import { MateriaController } from '../controllers/materia.controller';

/**
 * Enrutador de Express para las operaciones CRUD del recurso Materias.
 *
 * Ruta base configurada en App.ts: `/api/v1/materias`
 */
const router: Router = Router();

/**
 * @route   GET /api/v1/materias
 * @desc    Obtiene el listado completo de materias
 */
router.get('/', MateriaController.obtenerTodas);

/**
 * @route   GET /api/v1/materias/:id
 * @desc    Obtiene una materia en específico por su identificador numérico
 */
router.get('/:id', MateriaController.obtenerPorId);

/**
 * @route   POST /api/v1/materias
 * @desc    Crea y registra una nueva materia
 */
router.post('/', MateriaController.crear);

/**
 * @route   PUT /api/v1/materias/:id
 * @desc    Actualiza la información de una materia existente
 */
router.put('/:id', MateriaController.actualizar);

/**
 * @route   DELETE /api/v1/materias/:id
 * @desc    Elimina una materia del sistema según su ID
 */
router.delete('/:id', MateriaController.eliminar);

export default router;
