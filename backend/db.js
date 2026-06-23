const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'shop.db');
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');

const db = new DatabaseSync(dbPath);

function initDb() {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);

  const count = db.prepare('SELECT COUNT(*) AS n FROM products').get().n;
  if (count === 0) {
    const seed = fs.readFileSync(seedPath, 'utf8');
    db.exec(seed);
  }
}

module.exports = { db, initDb };
