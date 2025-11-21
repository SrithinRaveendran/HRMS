// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { writeLog } = require('../utils/logger');
const User = require('../models/userModel');

require('dotenv').config();

// POST /api/auth/register
// body: { orgName, adminName, email, password }
async function register(req, res) {
  const { orgName, adminName, email, password } = req.body;
  if (!orgName || !email || !password) {
    return res.status(400).json({ error: 'orgName, email and password required' });
  }

  const conn = await db.getConnection();
  try {
    // Transaction: create org, create user
    await conn.beginTransaction();

    // create organisation
    const [orgResult] = await conn.query('INSERT INTO organisations (name) VALUES (?)', [orgName]);
    const orgId = orgResult.insertId;

    // hash password
    const password_hash = await bcrypt.hash(password, 10);

    // create user
    const [userResult] = await conn.query(
      'INSERT INTO users (organisation_id, email, password_hash, name) VALUES (?, ?, ?, ?)',
      [orgId, email, password_hash, adminName]
    );
    const userId = userResult.insertId;

    await conn.commit();

    // Write log (outside transaction; fine to use pool)
    await writeLog({ organisation_id: orgId, user_id: userId, action: 'created_organisation', meta: { orgId } });

    // create JWT
    const token = jwt.sign({ userId, orgId }, process.env.JWT_SECRET, { expiresIn: '8h' });

    return res.json({ token, user: { id: userId, email, name: adminName } });
  } catch (err) {
    await conn.rollback();
    // Duplicate email / other errors will be here
    console.error('register error', err);
    return res.status(500).json({ error: 'server error' });
  } finally {
    conn.release();
  }
}

// POST /api/auth/login
// body: { email, password }
// note: this login assumes email is unique within organisation. To support multi-org same email,
// require org identifier (e.g. orgName or orgId). For simplicity, we just find by email.
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ userId: user.id, orgId: user.organisation_id }, process.env.JWT_SECRET, { expiresIn: '8h' });

    await writeLog({ organisation_id: user.organisation_id, user_id: user.id, action: 'user_login', meta: {} });

    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ error: 'server error' });
  }
}

module.exports = { register, login };
