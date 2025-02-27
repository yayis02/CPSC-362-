require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock API Endpoints
app.get('/api/fire-risk', async (req, res) => {
    res.json({ message: "Fire risk data (mock)" });
});

app.get('/api/homes', async (req, res) => {
    res.json([{ address: "123 Main St", lat: 37.7749, lon: -122.4194 }]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
