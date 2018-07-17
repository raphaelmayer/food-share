const Message = require('../models/message');

exports.getMessages = (req, res, next) => {
    console.log("getMessages", "Yay, got through!");
    console.log("res.locals.id", res.locals.id);
    res.end();
  //Message.find({ recipient: res.locals.id }, (err, messages) => {
  //  if (err) console.error(err);
  //  if (messages) res.json(messages); 
  //  else res.json({ Response: "No messagess found" });
  //});
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