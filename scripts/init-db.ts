import { initializeDatabase } from '../src/lib/db/init';

async function main() {
  console.log('Initializing database...');
  const result = await initializeDatabase();
  
  if (result.success) {
    console.log('✅ Database initialized successfully!');
    process.exit(0);
  } else {
    console.error('❌ Failed to initialize database:', result.error);
    process.exit(1);
  }
}

main();

