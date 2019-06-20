const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/main');
const passportService = require('../config/passport');
const passport = require('passport');

exports.requireAuth = passport.authenticate('jwt', { session: false });
exports.requireLogin = passport.authenticate('local', { session: false });

// middleware to check if the user is the owner of the requested items.
exports.requireOwnership = (req, res, next) => {
  
  jwt.verify(req.headers.authorization.split(" ")[1], config.secret, (err, decoded) => {

    if (err) {
      res.status(422).json({ error: err });
      return next(err);
    }
    if (decoded._id) {
      res.locals.id = decoded._id;
      return next();
    }
    res.status(401).json({ error: 'You are not authorized to view this content.(owner)' });
    return next('Unauthorized');
  })
}

// Role authorization check
exports.roleAuthorization = function(role) {  
    return function(req, res, next) {
      const user = req.user;

      User.findById(user._id, function(err, foundUser) {
          if (err) {
            res.status(422).json({ error: 'No user was found.' });
            return next(err);
          }

          // If user is found, check role.
          if (foundUser.role == role) {
            return next();
          }

          res.status(401).json({ error: 'You are not authorized to view this content.(role)' });
          return next('Unauthorized');
      });
    };
};