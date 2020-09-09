const express = require('express');
const router = express.Router();
// Authentication Middleware
const auth = require('../config/auth');

// @desc    Welcome Page
// @route   GET /
// @access  Public
router.get('/', (req, res) => res.render('welcome'));

// @desc     Dashboard for Users
// @route    GET /dashboard
// @access   Private
router.get('/dashboard', auth, (req, res) =>
  res.render('dashboard', {
    name: req.user.name,
  })
);

module.exports = router;
