// migrate.js - simple migration runner (development utility)
const fs = require('fs');
const path = require('path');
const db = require('./src/config/db');

async function migrate() {
  const fullPath = path.join(__dirname, 'migrations', 'init.sql');
  const sql = fs.readFileSync(fullPath, 'utf8');

  try {
    // mysql2's pool.query can accept multiple statements if connection configured,
    // but here we will run the entire SQL block via getConnection and execute.
    const conn = await db.getConnection();
    try {
      await conn.query(sql);
      console.log('Migrations applied successfully');
    } finally {
      conn.release();
    }
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
