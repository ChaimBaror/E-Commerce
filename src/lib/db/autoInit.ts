import { sql } from './index';
import { initializeDatabase } from './init';

let initAttempted = false;

/**
 * Automatically initializes database if tables don't exist
 * Only attempts once per runtime to avoid infinite loops
 */
export async function ensureDatabaseInitialized(): Promise<boolean> {
  if (initAttempted) {
    return false;
  }

  try {
    // Try to query products table to see if it exists
    await sql`SELECT 1 FROM products LIMIT 1`;
    return true; // Tables exist
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // If table doesn't exist, try to initialize
    if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
      console.log('Database tables not found. Attempting to create them...');
      initAttempted = true;
      
      try {
        const result = await initializeDatabase();
        if (result.success) {
          console.log('✅ Database tables created successfully!');
          return true;
        } else {
          console.error('❌ Failed to create database tables:', result.error);
          return false;
        }
      } catch (initError) {
        console.error('❌ Error during database initialization:', initError);
        return false;
      }
    }
    
    // Some other error
    throw error;
  }
}

