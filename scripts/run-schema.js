import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function runSchema() {
  const connectionString = 'postgresql://postgres:rp89kF5q1od8w6d32kK84G9Jop@nws-app-connect-supabase-aa54ca-195-201-139-127.sslip.io:5432/postgres';
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL database.');
    
    // Read the SQL file
    const sqlPath = 'C:\\Users\\Ronald\\.gemini\\antigravity\\brain\\8ae4966a-5758-496e-b06f-1f0c2a729984\\schema_and_seed.sql';
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute it
    await client.query(sql);
    console.log('Schema and seed data executed successfully!');
    
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

runSchema();
