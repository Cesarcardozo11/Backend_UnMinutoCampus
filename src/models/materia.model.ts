import pool from '../config/db';

// Forma de una materia (igual a la tabla "materias")
export interface Materia {
  id?: number;
  nrc: string;
  nombre_materia: string;
  nombre_docente: string;
  correo_docente: string;
}

// El modelo es el ÚNICO que escribe SQL. $1, $2... son los valores que se envían aparte
export class MateriaModel {
  static async obtenerTodas() {
    const result = await pool.query('SELECT * FROM materias ORDER BY id');
    return result.rows;
  }

  static async obtenerPorId(id: number) {
    const result = await pool.query('SELECT * FROM materias WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async crear(materia: Materia) {
    const result = await pool.query(
      'INSERT INTO materias (nrc, nombre_materia, nombre_docente, correo_docente) VALUES ($1, $2, $3, $4) RETURNING *',
      [materia.nrc, materia.nombre_materia, materia.nombre_docente, materia.correo_docente]
    );
    return result.rows[0];
  }

  static async actualizar(id: number, materia: Materia) {
    const result = await pool.query(
      'UPDATE materias SET nrc = $1, nombre_materia = $2, nombre_docente = $3, correo_docente = $4 WHERE id = $5 RETURNING *',
      [materia.nrc, materia.nombre_materia, materia.nombre_docente, materia.correo_docente, id]
    );
    return result.rows[0];
  }

  static async eliminar(id: number) {
    const result = await pool.query('DELETE FROM materias WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
