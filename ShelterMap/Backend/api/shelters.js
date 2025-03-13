// api/shelters.js
const express = require("express");
const router = express.Router();
const db = require("../db/database"); // Path to your DB connection

// GET /api/shelters - Fetch all shelters
router.get("/", (req, res) => {
  const query = "SELECT * FROM shelters";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Return shelter data as JSON
  });
});

// (Optional) Add more routes here: POST, DELETE, etc.

module.exports = router;
