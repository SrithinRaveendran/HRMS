// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'missing token' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload should contain userId and orgId
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ error: 'invalid user' });
    // attach a simple user object
    req.user = { id: user.id, email: user.email, name: user.name };
    // prefer token orgId if present; fallback to user's organisation_id
    req.organisation_id = payload.orgId || user.organisation_id;
    next();
  } catch (err) {
    console.error('auth error', err);
    return res.status(401).json({ error: 'invalid token' });
  }
}

module.exports = authMiddleware;
