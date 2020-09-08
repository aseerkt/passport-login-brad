const express = require('express');
const router = express.Router();

// @desc    Login Page
// @route   GET /users/login
// @access  Public
router.get('/login', (req, res) => res.send('Login'));

// @desc    Register Page
// @route   GET /users/register
// @access  Public
router.get('/register', (req, res) => res.send('Register'));

module.exports = router;
