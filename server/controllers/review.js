const Review = require('../models/review');

exports.getReviews = (req, res) => {
  Review.find({ gigId: req.params.gigId }, (err, reviews) => {
    res.json(reviews);
  })
}
exports.createReview = (req, res, next) => {
    let review = new Review(req.body);
    review.save((err, review) => {
      	if(err) { return next(err); }
      	res.json(review);
    });
}
exports.updateReview = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, review) => {
      	if (err) { res.json({ error: err }); }
      	if (!review) { res.json({ missing: req.params.id }); }
      	else { res.json({ success: 'UPDATED ' + review._id }); }
    });
  }
exports.deleteReview = (req, res, next) => {
    Review.findByIdAndRemove(req.params.id, (err, review) => {
	    if (err) { res.json({ error: err }); }
	    if (!review) { res.json({ missing: req.params.id }); }
	    else { res.json({ success: 'DELETED ' + review._id }); }
    });
}
