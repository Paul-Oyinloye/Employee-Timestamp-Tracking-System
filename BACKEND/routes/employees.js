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

// READ all employees
router.get('/', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ single
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { name, role, rate_per_hour } = req.body;
  const sql = `UPDATE employees SET name = ?, role = ?, rate_per_hour = ? WHERE id = ?`;
  db.run(sql, [name, role, rate_per_hour, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ id: parseInt(req.params.id), name, role, rate_per_hour });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;