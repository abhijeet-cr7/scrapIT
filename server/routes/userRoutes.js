// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/users', userController.createUser);
router.post('/login', userController.login); 
router.get('/users', authMiddleware, userController.getUsers);
router.get('/check-in', authMiddleware,  userController.checkUser);

module.exports = router;