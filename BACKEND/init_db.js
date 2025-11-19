const db = require('./db');

const createTables = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  rate_per_hour REAL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS timestamps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('IN','OUT')),
  timestamp TEXT NOT NULL,
  image_path TEXT,
  notes TEXT,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
`;

db.serialize(() => {
  db.exec(createTables, (err) => {
    if (err) console.error('Error creating tables:', err);
    else console.log('Tables created or exist already.');
    db.close();
  });
});