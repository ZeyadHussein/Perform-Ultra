const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get employee name and task completion from performance table
router.get('/', (req, res) => {
  const query = `
    SELECT u.Name AS Full_Name, p.Task_completed
    FROM performance p
    JOIN user u ON p.User_ID = u.User_ID
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching performance data:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

module.exports = router;
