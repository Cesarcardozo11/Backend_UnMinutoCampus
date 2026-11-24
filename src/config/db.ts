import { Pool } from 'pg';

/**
 * Configuración del Pool de conexiones para PostgreSQL.
 *
 * Un Connection Pool mantiene un grupo de conexiones abiertas y activas con la base de datos,
 * reutilizándolas en cada consulta en lugar de abrir y cerrar una conexión nueva por cada petición HTTP,
 * lo que optimiza significativamente el rendimiento y la escalabilidad del backend.
 *
 * - En Railway: se usa DATABASE_URL (una sola cadena con usuario, clave, host, puerto y base).
 * - En tu computador: se usan las variables DB_* del archivo .env
 */
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'parcial',
    });

export default pool;
