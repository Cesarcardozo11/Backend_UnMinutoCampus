import { Router } from 'express';
import { MateriaController } from '../controllers/materia.controller';

const router = Router();

// Base: /api/v1/materias
router.get('/', MateriaController.obtenerTodas);
router.get('/:id', MateriaController.obtenerPorId);
router.post('/', MateriaController.crear);
router.put('/:id', MateriaController.actualizar);
router.delete('/:id', MateriaController.eliminar);

export default router;
