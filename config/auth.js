module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'Please login to access this resource');
    return res.redirect('/users/login');
  }
};
