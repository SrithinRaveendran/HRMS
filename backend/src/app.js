const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);

// health check
app.get('/api/ping', (req, res) => res.json({ pong: true }));

// debug only — remove after use
app.get('/debug/env', (req, res) => {
  res.json({
    JWT_SECRET_present: !!process.env.JWT_SECRET,
    JWT_SECRET_value_first8: process.env.JWT_SECRET ? process.env.JWT_SECRET.slice(0,8) + '...' : null,
    NODE_ENV: process.env.NODE_ENV || null
  });
});


// default error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'server error' });
});

module.exports = app;
