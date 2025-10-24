// File: api/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// **FIXED PATH:** Use '../' to correctly access the 'routes' folder 
// from within the 'api' folder.
const medicineRoutes = require('../routes/medicineRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

// **SECURITY & DEPLOYMENT FIX:** // Use the MONGODB_URI environment variable defined on Vercel.
// Never hardcode secrets in the final deployed code.
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined in environment variables.');
    // You might want to throw an error or handle this more gracefully.
}

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
      // Log the error to help with Vercel debugging
      console.error('MongoDB connection error:', err);
  });

// Route handling
app.use('/api/medicines', medicineRoutes);

// **Vercel Serverless Export:**
// The Express app is exported here instead of calling app.listen().
// Vercel's platform will use this exported app to handle requests.
module.exports = app;

// **NOTE:** You must remove or comment out any app.listen() call.
// The Serverless Function environment does not require it.