// models/userModel.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const userModel = {
  getAllUsers: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },
  createUser: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const role =  email === "abhijeetdbz7@gmail.com" ? 1 : 2;
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
      );
    console.log(result, "result");
    return {result}; // Return the ID of the newly created user
  },
  findUserByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Return the first matching user
  },
  validatePassword: async (user, password) => {
    return await bcrypt.compare(password, user.password); // Validate password
  },
};

module.exports = userModel;