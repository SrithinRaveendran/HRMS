// src/config/db.js
// Exports a promise-based pool and helpers for connections/queries

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'hrms_dev',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true // useful for migrations; be careful with SQL injection
});

module.exports = {
  // simple query helper: returns [rows, fields]
  query: async (sql, params) => {
    const [rows] = await pool.query(sql, params);
    return rows;
  },
  // get a connection for transactions
  getConnection: async () => {
    return await pool.getConnection();
  },
  pool
};
