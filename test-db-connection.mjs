import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const poolConfig = {
  user: process.env.VITE_DB_USER,
  host: process.env.VITE_DB_HOST,
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  database: process.env.VITE_DB_NAME,
};

// Only add password if it's provided
if (process.env.VITE_DB_PASSWORD && process.env.VITE_DB_PASSWORD.trim()) {
  poolConfig.password = process.env.VITE_DB_PASSWORD;
}

const pool = new Pool(poolConfig);

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    console.log(`Host: ${process.env.VITE_DB_HOST}`);
    console.log(`Port: ${process.env.VITE_DB_PORT}`);
    console.log(`Database: ${process.env.VITE_DB_NAME}`);
    console.log(`User: ${process.env.VITE_DB_USER}`);

    const client = await pool.connect();
    console.log('\n✅ Successfully connected to the database!');

    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('Current time from database:', result.rows[0]);

    // Check if tables exist
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 Existing tables:');
    if (tableCheck.rows.length === 0) {
      console.log('No tables found. Run the schema.sql file in pgAdmin to create tables.');
    } else {
      tableCheck.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }

    client.release();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();
