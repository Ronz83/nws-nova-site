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
    const sqlPath = 'C:\\Users\\Ronald\\projects\\nws-nova-site\\supabase\\migrations\\03_user_permissions.sql';
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute it
    await client.query(sql);
    console.log('Migration 03_user_permissions executed successfully!');
    
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

runSchema();
