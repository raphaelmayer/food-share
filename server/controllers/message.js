const Message = require('../models/message');

module.exports = {
  getInbox,
  getOutbox,
  getMessages,
  createMessage,
  updateReadStatus
}

function getInbox(req, res, next) {

    Message.find({ "recipient.id": res.locals.id }, (err, msgs) => {
      // error handling

      res.json(msgs);
    })
}

function getOutbox(req, res, next) {

    Message.find({ "author.id": res.locals.id }, { new: 0 }, (err, msgs) => {
      // error handling

      res.json(msgs);
    })
}

function getMessages(req, res, next) {
    console.log("getMessages", "Yay, got through!");
    console.log("res.locals.id", res.locals.id);
    res.end();
}

function updateReadStatus(req, res, next) {
  Message.findByIdAndUpdate(req.params.id, { $set: { new: false } }, (err, msg) => {
    if (err) console.error(err);
    if (msg) res.json(msg); 
    else res.json({ Response: "No messages found" });
  });
}

function createMessage(req, res, next) {
	console.log("req", req.body);
    let msg = new Message(req.body);
    console.log("msg", msg);
    
    msg.save((err, msg) => {
        if (err) console.error(err); 
        res.json({ success: 'msg created.', msg: msg });
    });
}