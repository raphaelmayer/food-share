'use strict';

const jwt = require('jsonwebtoken'),
      User = require('../models/user'),
      config = require('../config/main');

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";

module.exports = {
  login,
  register,
}

const generateToken = (user, type) => {
  if (type === REFRESH_TOKEN) {
    return jwt.sign({ _id: user._id }, config.secret, {
      expiresIn: 2592000 //seconds
    });
  }
  if (type === ACCESS_TOKEN) {
    return jwt.sign(user, config.secret, {
      expiresIn: 10080 //seconds
    });
  }
  return { };
};

const setUserInfo = (req) => {
  return {
    _id: req._id,
    // firstName: req.profile.firstName,
    // lastName: req.profile.lastName,
    username: req.username,
    email: req.email,
    // role: req.role,
  };
};

// Login Route
function login(req, res, next) {
  console.log("asd");
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    accessToken: 'JWT ' + generateToken(userInfo, ACCESS_TOKEN),
    refreshToken: generateToken(userInfo, REFRESH_TOKEN),
    user: userInfo
  });
};

// Registration Route
function register(req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    //const firstName = req.body.firstName;
    //const lastName = req.body.lastName;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
    }
    if (!username) {
        return res.status(422).send({ error: 'You must enter an username.'});
    }
//    if (!firstName || !lastName) {
//        return res.status(422).send({ error: 'You must enter your full name.'});
//    }
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
          email: email,
          username: username,
          password: password,
          //profile: { firstName: firstName, lastName: lastName }
        });

        user.save(function(err, user) {
          if (err) { return next(err); }

          // Respond with JWT if user was created
          let userInfo = setUserInfo(user);

          res.status(201).json({
              accessToken: 'JWT ' + generateToken(userInfo, ACCESS_TOKEN),
              refreshToken: generateToken(userInfo, REFRESH_TOKEN),
              user: userInfo
          });
        });
    });
};