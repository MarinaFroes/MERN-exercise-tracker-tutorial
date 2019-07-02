// Require everything we need
const express = require('express');
const cors = require('cors');
// Connect to the mongoDB Atlas database
const mongoose = require('mongoose');

// Add environmental variables in the dotenv file
require('dotenv').config();

// Create the express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
  //Allow us to parse JSON
app.use(express.json());

// Add uri with enviromental variable from the mongoDB dashboard
const uri = process.env.ATLAS_URI;
// uri - that's where our database is stored
  // useNewUrlParser and useCreateIndex flags - deal with updates to mongoDB 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connected successfully`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

// Start the server: 'nodemon server' in the terminal