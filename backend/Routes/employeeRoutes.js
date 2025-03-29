const express = require("express");
const db = require("../db/db"); 
const router = express.Router();

// Get all employees
router.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error", message: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
