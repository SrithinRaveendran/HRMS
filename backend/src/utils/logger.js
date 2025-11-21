// src/utils/logger.js
// Small helper to write actions into logs table

const db = require('../config/db');

async function writeLog({ organisation_id = null, user_id = null, action, meta = {} }) {
  try {
    await db.query(
      'INSERT INTO logs (organisation_id, user_id, action, meta) VALUES (?, ?, ?, ?)',
      [organisation_id, user_id, action, JSON.stringify(meta)]
    );
  } catch (err) {
    // Do not crash the app on logging error; console it for visibility
    console.error('Failed to write log:', err);
  }
}

module.exports = { writeLog };
