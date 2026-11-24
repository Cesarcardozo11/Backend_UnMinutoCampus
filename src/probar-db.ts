// Script para comprobar la conexión a la base de datos.
// Ejecutar con: npm run db:probar
import dotenv from 'dotenv';

dotenv.config();

import pool from './config/db';

async function probar() {
  try {
    const result = await pool.query('SELECT current_database() AS base, NOW() AS hora');
    console.log('Conexión exitosa a la base de datos');
    console.table(result.rows);
  } catch (error) {
    console.log('No se pudo conectar:', error instanceof Error ? error.message : error);
  } finally {
    await pool.end();
  }
}

probar();
