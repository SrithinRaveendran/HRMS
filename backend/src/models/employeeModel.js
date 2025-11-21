const db = require('../config/db');

async function listByOrg(organisation_id) {
  return await db.query('SELECT * FROM employees WHERE organisation_id = ? ORDER BY id DESC', [organisation_id]);
}

async function findById(id) {
  const rows = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
  return rows[0];
}

async function create(employee) {
  await db.query(
    'INSERT INTO employees (organisation_id, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)',
    [employee.organisation_id, employee.first_name, employee.last_name, employee.email, employee.phone]
  );
  const [rows] = await db.pool.query('SELECT LAST_INSERT_ID() AS id');
  return { id: rows[0].id, ...employee };
}

async function update(id, organisation_id, patch) {
  const res = await db.query(
    'UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ? AND organisation_id = ?',
    [patch.first_name, patch.last_name, patch.email, patch.phone, id, organisation_id]
  );
  // return updated row
  return await findById(id);
}

async function remove(id, organisation_id) {
  await db.query('DELETE FROM employees WHERE id = ? AND organisation_id = ?', [id, organisation_id]);
}

module.exports = { listByOrg, findById, create, update, remove };
