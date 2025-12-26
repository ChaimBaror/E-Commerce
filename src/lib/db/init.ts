import { readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';

export async function initializeDatabase() {
  try {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error('POSTGRES_URL or DATABASE_URL environment variable is not set');
    }

    const pool = new Pool({
      connectionString,
    });

    const schemaPath = join(process.cwd(), 'src/lib/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    // Remove comments
    const cleanedSchema = schema
      .split('\n')
      .map(line => {
        const commentIndex = line.indexOf('--');
        if (commentIndex !== -1) {
          return line.substring(0, commentIndex);
        }
        return line;
      })
      .join('\n')
      .trim();

    // Execute the entire schema at once
    // PostgreSQL can handle multiple statements separated by semicolons
    await pool.query(cleanedSchema);

    await pool.end();
    console.log('Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Check if it's just a "relation already exists" error (which is OK)
    if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
      console.log('Tables may already exist, continuing...');
      return { success: true };
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}

