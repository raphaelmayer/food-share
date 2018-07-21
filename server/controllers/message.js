const Message = require('../models/message');

exports.getInbox = (req, res, next) => {

    Message.find({ "recipient.id": res.locals.id }, (err, msgs) => {
      // error handling

      res.json(msgs);
    })
}

exports.getOutbox = (req, res, next) => {

    Message.find({ "author.id": res.locals.id }, { new: 0 }, (err, msgs) => {
      // error handling

      res.json(msgs);
    })
}

exports.getMessages = (req, res, next) => {
    console.log("getMessages", "Yay, got through!");
    console.log("res.locals.id", res.locals.id);
    res.end();
}

exports.updateReadStatus = (req, res, next) => {
  Message.findByIdAndUpdate(req.params.id, { $set: { new: false } }, (err, msg) => {
    if (err) console.error(err);
    if (msg) res.json(msg); 
    else res.json({ Response: "No messages found" });
  });
}

exports.createMessage = (req, res, next) => {
	console.log("req", req.body);
    let msg = new Message(req.body);
    console.log("msg", msg);
    
    msg.save((err, msg) => {
        if (err) console.error(err); 
        res.json({ success: 'msg created.', msg: msg });
    });
}