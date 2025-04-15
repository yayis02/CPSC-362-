// db/setup.js
const db = require("./database");

// Create the shelters table if it doesn't exist
// In db.js or setup.js
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS shelters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      zip TEXT,
      latitude REAL,
      longitude REAL,
      services TEXT
    )`, (err) => {
      if (err) {
        console.error("Error creating shelters table:", err.message);
      } else {
        console.log("Shelters table created or verified.");
      }
    });
  });
  

// Close the DB when done
db.close();
