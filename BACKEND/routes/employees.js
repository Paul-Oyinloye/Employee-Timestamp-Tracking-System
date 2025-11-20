const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE employee
router.post('/', (req, res) => {
  const { name, role, rate_per_hour } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const sql = `INSERT INTO employees (name, role, rate_per_hour) VALUES (?, ?, ?)`;
  db.run(sql, [name, role || null, rate_per_hour || 0], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, role, rate_per_hour });
  });
});