const express = require('express');
const { register, login ,logout} = require('../controllers/authController.js');
const { checkBlacklist } = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

router.get('/logout', checkBlacklist, logout);

module.exports = router;