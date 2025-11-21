const db = require('../config/db');

async function createOrganisation(name, conn = null) {
  const executor = conn || db;
  const res = await executor.query('INSERT INTO organisations (name) VALUES (?)', [name]);
  // mysql2 returns an OkPacket when INSERT; to get inserted id:
  const [result] = await executor.query('SELECT LAST_INSERT_ID() AS id');
  return { id: result[0] ? result[0].id : undefined, name };
}

module.exports = { createOrganisation };
