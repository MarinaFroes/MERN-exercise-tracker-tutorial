// Require everything we need
const express = require('express');
const cors = require('cors');

// Add environment variables in the dotenv file
require('dotenv').config();

// Create the express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
  //Allow us to parse JSON
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

// Start the server: 'nodemon server' in the terminal