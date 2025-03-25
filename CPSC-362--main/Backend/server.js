// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Import the shelters route
const sheltersRoute = require("./api/shelters");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/shelters", sheltersRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
