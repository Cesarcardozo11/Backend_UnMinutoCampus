import { Request, Response } from 'express';
import { MateriaModel } from '../models/materia.model';

/**
 * Controlador de Materias (Capa de Lógica y Control HTTP).
 *
 * Responsabilidades:
 * 1. Recibir las peticiones HTTP (Request) enviadas por el cliente.
 * 2. Extraer y validar los parámetros y datos del cuerpo (body).
 * 3. Invocar los métodos correspondientes en la capa de datos (MateriaModel).
 * 4. Responder al cliente (Response) con el código de estado HTTP adecuado y una estructura JSON estándar:
 *    `{ success: boolean, data: unknown }`.
 */
export class MateriaController {
  /**
   * Manejador para listar todas las materias.
   *
   * @route GET /api/v1/materias
   * @param req - Objeto de petición Express
   * @param res - Objeto de respuesta Express
   * @returns Estado 200 con la lista de materias, o 500 en caso de error interno
   */
  static async obtenerTodas(req: Request, res: Response): Promise<void> {
    try {
      const materias = await MateriaModel.obtenerTodas();
      res.status(200).json({ success: true, data: materias });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al obtener las materias' });
    }
  }

  /**
   * Manejador para consultar una materia individual por su ID.
   *
   * @route GET /api/v1/materias/:id
   * @param req - Objeto de petición Express con parámetro de ruta `id`
   * @param res - Objeto de respuesta Express
   * @returns Estado 200 con la materia, 404 si no se encuentra, o 500 en caso de error interno
   */
  static async obtenerPorId(req: Request, res: Response): Promise<void | Response> {
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

  /**
   * Manejador para crear y registrar una nueva materia.
   *
   * @route POST /api/v1/materias
   * @param req - Objeto de petición con los campos requeridos en `req.body`
   * @param res - Objeto de respuesta Express
   * @returns Estado 201 con la materia creada, 400 si faltan datos obligatorios, o 500 en error interno
   */
  static async crear(req: Request, res: Response): Promise<void | Response> {
    try {
      const { nrc, nombre_materia, nombre_docente, correo_docente } = req.body;

      // Validación de negocio: comprobación de campos obligatorios
      if (!nrc || !nombre_materia || !nombre_docente || !correo_docente) {
        return res.status(400).json({ success: false, data: 'Todos los campos son obligatorios' });
      }

      const nueva = await MateriaModel.crear(req.body);
      res.status(201).json({ success: true, data: nueva });
    } catch (error) {
      res.status(500).json({ success: false, data: 'Error al crear la materia' });
    }
  }

  /**
   * Manejador para actualizar los datos de una materia existente.
   *
   * @route PUT /api/v1/materias/:id
   * @param req - Objeto de petición con el parámetro `id` y los nuevos datos en `req.body`
   * @param res - Objeto de respuesta Express
   * @returns Estado 200 con la materia actualizada, 400 por datos incompletos, 404 si no existe, o 500 en error
   */
  static async actualizar(req: Request, res: Response): Promise<void | Response> {
    try {
      const { nrc, nombre_materia, nombre_docente, correo_docente } = req.body;

      // Validación de negocio: comprobación de campos obligatorios
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

  /**
   * Manejador para eliminar una materia existente por su ID.
   *
   * @route DELETE /api/v1/materias/:id
   * @param req - Objeto de petición con el parámetro de ruta `id`
   * @param res - Objeto de respuesta Express
   * @returns Estado 200 con mensaje de confirmación, 404 si no existe, o 500 en caso de error
   */
  static async eliminar(req: Request, res: Response): Promise<void | Response> {
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
