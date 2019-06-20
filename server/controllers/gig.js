const Gig = require('../models/gig');

module.exports = {
  getGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
  updateGigStatus
}

function getGigs(req, res, next) {
  Gig.find({}, (err, gig) => {
    if (err) console.error(err);
    if (gig) res.json(gig); 
    else res.json({ Response: "No gigs found" });
  });
}

function getGig(req, res, next) {
  Gig.findById(req.params.id, (err, gig) => {
    if (err) console.error(err);
    res.json(gig);
  });
}

function createGig(req, res, next) {
  console.log(req.headers)
  let gig = new Gig(req.body);

  gig.save((err, gig) => {
    if (err) console.error(err); 
    res.json({ success: 'gig created.', gig: gig });
  });
}

function updateGig(req, res, next) {
  const query = { _id: req.params.id, "author.id": res.locals.id };
  Gig.findOneAndUpdate(query, { $set: req.body }, (err, gig) => {
    if (err) console.error(err);
    if (!gig) res.json({ error: 'no such gig' });
    console.log(gig);
    res.json({ success: 'gig updated.', gig: gig });
  });
}

function deleteGig(req, res, next) {
  const query = { _id: req.params.id, "author.id": res.locals.id };
  Gig.findOneAndRemove(query, (err, gig) => {
    if (err) console.error(err);
    if (!gig) res.json({ error: 'no such gig' });
    res.json({ success: 'gig removed.', gig: gig });
  });
}

function updateGigStatus(req, res, next) {
  console.log(req.body.status);
  const query = { _id: req.params.id, "author.id": res.locals.id };
  Gig.findOneAndUpdate(query, { status: req.body.status }, (err, gig) => {
    if (err) console.error(err);
    if (!gig) res.json({ error: 'no such gig' });
    else { 
      console.log(gig);
      res.json({ success: 'gig updated.', gig: gig });
    }
  });
}