// src/controllers/teamController.js
const Team = require('../models/teamModel');
const Employee = require('../models/employeeModel');
const { writeLog } = require('../utils/logger');

async function listTeams(req, res) {
  const orgId = req.organisation_id;
  const rows = await Team.listByOrg(orgId);
  res.json(rows);
}

async function createTeam(req, res) {
  const orgId = req.organisation_id;
  if (!req.body.name) return res.status(400).json({ error: 'name required' });
  const t = await Team.create({ organisation_id: orgId, name: req.body.name, description: req.body.description });
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'created_team', meta: { teamId: t.id } });
  res.status(201).json(t);
}

async function updateTeam(req, res) {
  const orgId = req.organisation_id;
  const id = req.params.id;
  const updated = await Team.update(id, orgId, req.body);
  if (!updated) return res.status(404).json({ error: 'not found or not permitted' });
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'updated_team', meta: { teamId: id } });
  res.json(updated);
}

async function deleteTeam(req, res) {
  const orgId = req.organisation_id;
  const id = req.params.id;
  await Team.remove(id, orgId);
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'deleted_team', meta: { teamId: id } });
  res.status(204).end();
}

async function assign(req, res) {
  const orgId = req.organisation_id;
  const teamId = req.params.teamId;
  const { employeeId, employeeIds } = req.body;
  const ids = employeeIds || (employeeId ? [employeeId] : []);
  if (ids.length === 0) return res.status(400).json({ error: 'no employees provided' });

  for (const id of ids) {
    const e = await Employee.findById(id);
    if (!e || e.organisation_id !== orgId) return res.status(400).json({ error: `employee ${id} not in org` });
    await Team.assignEmployee(teamId, id);
    await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'assigned_employee_to_team', meta: { employeeId: id, teamId } });
  }

  res.json({ ok: true });
}

async function unassign(req, res) {
  const orgId = req.organisation_id;
  const teamId = req.params.teamId;
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ error: 'employeeId required' });
  const e = await Employee.findById(employeeId);
  if (!e || e.organisation_id !== orgId) return res.status(400).json({ error: 'employee not in org' });
  await Team.unassignEmployee(teamId, employeeId);
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'unassigned_employee_from_team', meta: { employeeId, teamId } });
  res.json({ ok: true });
}

module.exports = { listTeams, createTeam, updateTeam, deleteTeam, assign, unassign };
