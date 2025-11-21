// src/controllers/employeeController.js
const Employee = require('../models/employeeModel');
const { writeLog } = require('../utils/logger');

async function listEmployees(req, res) {
  const orgId = req.organisation_id;
  const rows = await Employee.listByOrg(orgId);
  res.json(rows);
}

async function getEmployee(req, res) {
  const orgId = req.organisation_id;
  const id = req.params.id;
  const e = await Employee.findById(id);
  if (!e || e.organisation_id !== orgId) return res.status(404).json({ error: 'not found' });
  res.json(e);
}

async function createEmployee(req, res) {
  const orgId = req.organisation_id;
  const payload = req.body;
  if (!payload.first_name) return res.status(400).json({ error: 'first_name required' });

  const emp = await Employee.create({ ...payload, organisation_id: orgId });
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'created_employee', meta: { employeeId: emp.id } });
  res.status(201).json(emp);
}

async function updateEmployee(req, res) {
  const orgId = req.organisation_id;
  const id = req.params.id;
  const patch = req.body;
  const updated = await Employee.update(id, orgId, patch);
  if (!updated) return res.status(404).json({ error: 'not found or not permitted' });
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'updated_employee', meta: { employeeId: id } });
  res.json(updated);
}

async function deleteEmployee(req, res) {
  const orgId = req.organisation_id;
  const id = req.params.id;
  await Employee.remove(id, orgId);
  await writeLog({ organisation_id: orgId, user_id: req.user.id, action: 'deleted_employee', meta: { employeeId: id } });
  res.status(204).end();
}

module.exports = { listEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };
