const db = require('../config/db');

async function listByOrg(organisation_id, limit = 100) {
  return await db.query('SELECT * FROM logs WHERE organisation_id = ? ORDER BY id DESC LIMIT ?', [organisation_id, limit]);
}

module.exports = { listByOrg };
