// server.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // Your Vite/React frontend origin
  credentials: true                // Allow cookies to be sent
}));
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

  app.use(express.json());

// Use the user routes
app.use('/api', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});