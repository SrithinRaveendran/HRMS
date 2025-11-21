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

// default error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'server error' });
});

module.exports = app;
