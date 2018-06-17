const Gig = require('../models/gig');

exports.getGigs = (req, res, next) => {
  Gig.find({}, (err, gig) => {
    if (err) console.error(err);
    if (gig) res.json(gig); 
    else res.json({ Response: "No gigs found" });
  });
}

exports.getGig = (req, res, next) => {
  Gig.findById(req.params.id, (err, gig) => {
    if (err) console.error(err);
    res.json(gig);
  });
}

exports.createGig = (req, res, next) => {
  let gig = new Gig(req.body);

  gig.save((err, gig) => {
    if (err) console.error(err); 
    res.json({ success: 'gig created.', gig: gig });
  });
}

exports.updateGig = (req, res, next) => {
  Gig.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, gig) => {
    if (err) console.error(err);
    if (!gig) res.json({ error: 'no such gig' });
    console.log(gig);
    res.json({ success: 'gig updated.', gig: gig });
  });
}

exports.deleteGig = (req, res, next) => {
  Gig.findByIdAndDelete(req.params.id, (err, gig) => {
    if (err) console.error(err);
    if (!gig) res.json({ error: 'no such gig' });
    res.json({ success: 'gig removed.', gig: gig });
  });
}