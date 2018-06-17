const User = require('../models/user');
const helpers = require("../helpers");

exports.getCompleteUser = (req, res) => {
  const username = req.params.username;
  const gigId = req.params.gigId;
  
  helpers.getCompleteUser(res, username, gigId)
  .then(data => res.json(data));
}

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.error(err);
    if (!user) res.json({ error: 'no such user' });
    res.json(user);
  });
}

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) console.error(err);
    if (!user) res.json({ error: 'no such user' });
    res.json(user);
  });
}

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) console.error(err);
    if (!user) res.json({ error: 'no such user' });
    res.json({ success: 'user removed.'});
  });
}