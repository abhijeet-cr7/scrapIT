// server.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

  app.use(express.json());

// Use the user routes
app.use('/api', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});