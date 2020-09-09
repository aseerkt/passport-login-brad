const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// @desc    Register Form Page
// @route   GET /users/register
// @access  Public
router.get('/register', (req, res) => {
  res.render('register');
});

// REGISTER POST ======================================================================

// @desc    Register Handle
// @route   POST /users/register
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check for empty fields
  if (!name || !email || !password || !password2)
    errors.push({ msg: 'Please fill in all fields' });
  else if (password.length < 6)
    errors.push({ msg: 'Password should be atleast 6 characters' });

  // Check password match
  if (password !== password2) errors.push({ msg: 'Password do not match' });
  // Check password length

  if (errors.length > 0) {
    res.render('register', {
      errors,
      ...req.body,
    });
  } else {
    // validation passed
    User.findOne({ email }).then((user) => {
      if (user) {
        res.render('register', {
          errors: [{ msg: 'Email already Registered' }],
          ...req.body,
        });
      } else {
        // Create new User
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error(err);
            // Set password to hashed
            newUser.password = hash;
            // Save User to DB
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered, please log in to continue'
                );
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// @desc    Login Page
// @route   GET /users/login
// @access  Public
router.get('/login', (req, res) => res.render('login'));

// LOGIN POST ====================================================================

// @desc    Login POST
// @route   POST /users/login
// @access  Public

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// LOGOUT ==============================================================

// @desc Logout User
// @route GET /users/logout
// @access Private
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
