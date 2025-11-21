const db = require('../config/db');

async function createUser({ organisation_id, email, password_hash, name }) {
  const res = await db.query(
    'INSERT INTO users (organisation_id, email, password_hash, name) VALUES (?, ?, ?, ?)',
    [organisation_id, email, password_hash, name]
  );
  // get inserted id
  const [rows] = await db.pool.query('SELECT LAST_INSERT_ID() as id');
  const id = rows[0].id;
  return { id, organisation_id, email, name };
}

async function findByEmailAndOrg(email, organisation_id) {
  const rows = await db.query('SELECT * FROM users WHERE email = ? AND organisation_id = ?', [email, organisation_id]);
  return rows[0];
}

async function findByEmail(email) {
  const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function findById(id) {
  const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { createUser, findByEmailAndOrg, findByEmail, findById };
