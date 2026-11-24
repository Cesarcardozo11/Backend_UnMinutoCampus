import { Request, Response } from 'express';
import { MateriaModel } from '../models/materia.model';

// El controlador recibe la petición, valida y le pide los datos al modelo
export class MateriaController {
  // GET /api/v1/materias
  static async obtenerTodas(req: Request, res: Response) {
    try {
      const materias = await MateriaModel.obtenerTodas();
      res.status(200).json({ success: true, data: materias });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al obtener las materias' });
    }
  }

  // GET /api/v1/materias/:id
  static async obtenerPorId(req: Request, res: Response) {
    try {
      const materia = await MateriaModel.obtenerPorId(Number(req.params.id));
      if (!materia) {
        return res.status(404).json({ success: false, data: 'Materia no encontrada' });
      }
      res.status(200).json({ success: true, data: materia });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al obtener la materia' });
    }
  }

  // POST /api/v1/materias
  static async crear(req: Request, res: Response) {
    try {
      const { nrc, nombre_materia, nombre_docente, correo_docente } = req.body;

      // Validación: todos los campos son obligatorios
      if (!nrc || !nombre_materia || !nombre_docente || !correo_docente) {
        return res.status(400).json({ success: false, data: 'Todos los campos son obligatorios' });
      }

      const nueva = await MateriaModel.crear(req.body);
      res.status(201).json({ success: true, data: nueva });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al crear la materia' });
    }
  }

  // PUT /api/v1/materias/:id
  static async actualizar(req: Request, res: Response) {
    try {
      const { nrc, nombre_materia, nombre_docente, correo_docente } = req.body;

      if (!nrc || !nombre_materia || !nombre_docente || !correo_docente) {
        return res.status(400).json({ success: false, data: 'Todos los campos son obligatorios' });
      }

      const actualizada = await MateriaModel.actualizar(Number(req.params.id), req.body);
      if (!actualizada) {
        return res.status(404).json({ success: false, data: 'Materia no encontrada' });
      }
      res.status(200).json({ success: true, data: actualizada });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al actualizar la materia' });
    }
  }

  // DELETE /api/v1/materias/:id
  static async eliminar(req: Request, res: Response) {
    try {
      const eliminada = await MateriaModel.eliminar(Number(req.params.id));
      if (!eliminada) {
        return res.status(404).json({ success: false, data: 'Materia no encontrada' });
      }
      res.status(200).json({ success: true, data: 'Materia eliminada' });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al eliminar la materia' });
    }
  }
}
