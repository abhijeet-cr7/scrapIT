// controllers/userController.js
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    try {
      const user = await userModel.createUser(name, email, password);
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(500).json({ error: `Failed to create user ${error}` });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const isValidPassword = await userModel.validatePassword(user, password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // ✅ Set token in HttpOnly cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // only over HTTPS in production
        sameSite: 'Strict', // prevents CSRF
        maxAge: 60 * 60 * 1000, // 1 hour
      });
  
      res.json({ message: 'Login successful' }); // no need to send token in body now
    } catch (error) {
      res.status(500).json({ error: `Failed to login: ${error.message}` });
    }
  },
  checkUser : async (req, res) => {
      res.status(200).json({message : "Authorization Successfull"});
  }
};

module.exports = userController;