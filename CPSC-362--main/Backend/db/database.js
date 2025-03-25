// db/database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Build an absolute path to shelters.db
const dbPath = path.resolve(__dirname, "../data/shelters.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not open database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;
