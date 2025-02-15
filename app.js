const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const cookieparser = require('cookie-parser')

connectToDb();

// Remove the default cors middleware
// app.use(cors()); <- Remove this line

// Use the configured cors middleware
app.use(cors({
  origin: 'process.env.FRONTEND_URL',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());

app.get('/',(req,res)=>{
  res.send("backend is running");
});

// Fix the API route to match your frontend fetch URL
app.use('/api', userRoutes);  // Changed from '/users' to '/api'

module.exports = app;
