const express = require('express');
const router = express.Router();

// @desc
// @route   GET /
// @access  Public
router.get('/', (req, res) => res.send('Welcome'));

module.exports = router;
