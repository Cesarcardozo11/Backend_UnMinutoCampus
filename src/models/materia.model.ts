import pool from '../config/db';

/**
 * Interfaz que define la estructura de una entidad Materia,
 * coincidiendo exactamente con el esquema de la tabla 'materias' en PostgreSQL.
 */
export interface Materia {
  /** Identificador único autonumérico de la materia */
  id?: number;
  /** Código NRC (Número de Referencia del Curso), debe ser único */
  nrc: string;
  /** Nombre completo de la asignatura */
  nombre_materia: string;
  /** Nombre del profesor o docente que dicta la materia */
  nombre_docente: string;
  /** Correo electrónico institucional del docente */
  correo_docente: string;
}

/**
 * Capa de Acceso a Datos (Data Access Layer - Model) para la entidad Materia.
 *
 * Esta clase es la única autorizada en la arquitectura para interactuar
 * directamente con la base de datos PostgreSQL mediante consultas SQL parametrizadas,
 * garantizando la protección contra inyecciones SQL ($1, $2, etc.).
 */
export class MateriaModel {
  /**
   * Obtiene la lista completa de materias registradas en la base de datos,
   * ordenadas ascendentemente por su identificador único.
   *
   * @returns Promesa que resuelve un arreglo de materias (`Materia[]`)
   */
  static async obtenerTodas(): Promise<Materia[]> {
    const result = await pool.query('SELECT * FROM materias ORDER BY id');
    return result.rows;
  }

  /**
   * Busca y obtiene una materia específica a partir de su ID.
   *
   * @param id - Identificador numérico de la materia
   * @returns Promesa que resuelve el objeto de la materia encontrada o `undefined` si no existe
   */
  static async obtenerPorId(id: number): Promise<Materia | undefined> {
    const result = await pool.query('SELECT * FROM materias WHERE id = $1', [id]);
    return result.rows[0];
  }

  /**
   * Inserta un nuevo registro de materia en la tabla `materias`.
   *
   * @param materia - Objeto con los datos de la materia a registrar (sin ID)
   * @returns Promesa que resuelve el nuevo registro creado con su ID generado por la BD
   */
  static async crear(materia: Materia): Promise<Materia> {
    const result = await pool.query(
      'INSERT INTO materias (nrc, nombre_materia, nombre_docente, correo_docente) VALUES ($1, $2, $3, $4) RETURNING *',
      [materia.nrc, materia.nombre_materia, materia.nombre_docente, materia.correo_docente]
    );
    return result.rows[0];
  }

  /**
   * Actualiza los datos de una materia existente identificada por su ID.
   *
   * @param id - Identificador de la materia a modificar
   * @param materia - Objeto con los nuevos valores para la materia
   * @returns Promesa que resuelve la materia actualizada o `undefined` si el ID no existía
   */
  static async actualizar(id: number, materia: Materia): Promise<Materia | undefined> {
    const result = await pool.query(
      'UPDATE materias SET nrc = $1, nombre_materia = $2, nombre_docente = $3, correo_docente = $4 WHERE id = $5 RETURNING *',
      [materia.nrc, materia.nombre_materia, materia.nombre_docente, materia.correo_docente, id]
    );
    return result.rows[0];
  }

  /**
   * Elimina un registro de materia de la base de datos según su ID.
   *
   * @param id - Identificador de la materia a eliminar
   * @returns Promesa que resuelve la materia eliminada o `undefined` si el ID no existía
   */
  static async eliminar(id: number): Promise<Materia | undefined> {
    const result = await pool.query('DELETE FROM materias WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
