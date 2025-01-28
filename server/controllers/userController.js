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
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    try {
      const userId = await userModel.createUser(name, email, password);
      res.status(201).json({ message: 'User created', userId });
    } catch (error) {
      res.status(500).json({ error: `Failed to create user ${error}` });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    console.log(email, password, "request coming in");
    try {
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      console.log(user, "user found");
      const isValidPassword = await userModel.validatePassword(user, password);
      console.log(isValidPassword, "password is valid");
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Generate JWT
      console.log("reached here password validated");
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: `Failed to login: ${error.message}` });
    }
  },
};

module.exports = userController;