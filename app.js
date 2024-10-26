const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');

// Load environment variables
dotenv.config({ path: './url.env' });
const app = express();

// CORS Middleware
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Ensure this matches your frontend origin
    methods: ['GET', 'POST'],
    credentials: true // Enable credentials if using cookies or tokens in requests
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Middleware
app.use(require("./Router/rout")); // Ensure your routes are correctly imported here

// MongoDB connection using MONGO_URI from .env
const uri = process.env.DATA;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});