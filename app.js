const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config({ path: './url.env' }); // Load environment variables
const app = express();

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Frontend origin
    methods: ['GET', 'POST'],
    credentials: true, // If sending cookies or tokens
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route import (Ensure this line is after cors() and body-parser middleware)
app.use(require("./Router/rout")); // This makes the /register route accessible

// MongoDB connection using MONGO_URI from .env
const uri = process.env.DATA;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure options are passed for mongoose connection
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});