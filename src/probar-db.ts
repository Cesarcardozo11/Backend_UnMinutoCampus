/**
 * Script de diagnóstico y prueba de conexión a la base de datos PostgreSQL.
 *
 * Ejecución manual mediante CLI:
 * `npm run db:probar`
 */
import dotenv from 'dotenv';

// Carga las variables de entorno de conexión
dotenv.config();

import pool from './config/db';

/**
 * Función asíncrona que verifica la conectividad ejecutando una consulta SQL básica.
 */
async function probar(): Promise<void> {
  try {
    const result = await pool.query('SELECT current_database() AS base, NOW() AS hora');
    console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
    console.table(result.rows);
  } catch (error) {
    console.error('❌ Error: No se pudo conectar a la base de datos:', error instanceof Error ? error.message : error);
  } finally {
    // Cierra el pool para liberar el hilo de ejecución al terminar la prueba
    await pool.end();
  }
}

// Ejecución del script
probar();
