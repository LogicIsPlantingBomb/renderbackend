const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieparser = require('cookie-parser');

connectToDb();

// Use the configured cors middleware
app.use(cors({
  origin: "https://basic-register-login-backend.vercel.app", // Use the value of the environment variable
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/', (req, res) => {
  res.send("backend is running");
});

// Mount user routes under /api
app.use('/api', userRoutes);

module.exports = app;
