const db = require('../config/db');

async function listByOrg(organisation_id) {
  return await db.query('SELECT * FROM teams WHERE organisation_id = ? ORDER BY id DESC', [organisation_id]);
}

async function create(team) {
  await db.query('INSERT INTO teams (organisation_id, name, description) VALUES (?, ?, ?)', [team.organisation_id, team.name, team.description]);
  const [rows] = await db.pool.query('SELECT LAST_INSERT_ID() AS id');
  return { id: rows[0].id, ...team };
}

async function findById(id) {
  const rows = await db.query('SELECT * FROM teams WHERE id = ?', [id]);
  return rows[0];
}

async function update(id, organisation_id, patch) {
  await db.query('UPDATE teams SET name = ?, description = ? WHERE id = ? AND organisation_id = ?', [patch.name, patch.description, id, organisation_id]);
  return await findById(id);
}

async function remove(id, organisation_id) {
  await db.query('DELETE FROM teams WHERE id = ? AND organisation_id = ?', [id, organisation_id]);
}

async function assignEmployee(teamId, employeeId) {
  // avoid duplicate assignment: check existing
  const existing = await db.query('SELECT * FROM employee_teams WHERE team_id = ? AND employee_id = ?', [teamId, employeeId]);
  if (existing.length === 0) {
    await db.query('INSERT INTO employee_teams (employee_id, team_id) VALUES (?, ?)', [employeeId, teamId]);
  }
}

async function unassignEmployee(teamId, employeeId) {
  await db.query('DELETE FROM employee_teams WHERE team_id = ? AND employee_id = ?', [teamId, employeeId]);
}

module.exports = { listByOrg, create, findById, update, remove, assignEmployee, unassignEmployee };
