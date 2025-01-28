// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/login', userController.login); 
router.get('/users', authenticateToken, userController.getUsers);

module.exports = router;