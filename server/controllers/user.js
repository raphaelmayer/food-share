const User = require('../models/user');
const helpers = require("../helpers");

module.exports = {
  getCompleteUser,
  getUser,
  updateUser,
  deleteUser
}

function getCompleteUser(req, res) {
  const username = req.params.username;
  const gigId = req.params.gigId;
  
  helpers.getCompleteUser(res, username, gigId)
  .then(data => res.json(data));
}

function getUser(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) console.error(err);
    if (!user) res.json({ error: 'no such user' });
    res.json(user);
  });
}

function updateUser(req, res, next) {
  if (req.params.id === res.locals.id) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
      if (err) console.error(err);
      if (!user) res.json({ error: 'no such user' });
      res.json(user);
    });
  } else {
    console.error("U user", "Unauthorized.")
  }
}

function deleteUser(req, res) {
  if (req.params.id === res.locals.id) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) console.error(err);
      if (!user) res.json({ error: 'no such user' });
      res.json({ success: 'user removed.'});
    });
  } else {
    console.error("D user", "Unauthorized.")
  }
}