const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// User Model
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match User
      User.findOne({ email })
        .then((user) => {
          if (!user)
            return done(null, false, {
              message: 'This email is not registered',
            });
          console.log({ email, password });
          // Check if password matches
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(null, false, { message: 'Internal Error' });
            if (isMatch) {
              return done(null, user);
            } else {
              console.log('password incorrect');
              return done(null, false, { message: 'Incorrect Password' });
            }
          });
        })
        .catch((err) => {});
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
