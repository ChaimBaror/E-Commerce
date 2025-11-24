import { sql } from '@vercel/postgres';
import { Pool } from 'pg';

export { sql };

// Pool for dynamic queries (used in update functions)
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('POSTGRES_URL or DATABASE_URL environment variable is not set');
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

export { getPool };

// Helper function to test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return { success: true, time: result.rows[0]?.current_time };
  } catch (error) {
    console.error('Database connection error:', error);
    return { success: false, error };
  }
}

// Export all database functions
export * from './products';
export * from './variants';
export * from './images';
export * from './reviews';
