const Review = require('../models/review');

module.exports = {
  getReviews,
  // getReview,
  createReview,
  updateReview,
  deleteReview
}

function getReviews(req, res) {
  Review.find({ gigId: req.params.gigId }, (err, reviews) => {
    res.json(reviews);
  })
}

function createReview(req, res, next) {
  let review = new Review(req.body);
  review.save((err, review) => {
  	if(err) { return next(err); }
  	res.json(review);
  });
}

function updateReview(req, res, next) {
  const query = { _id: req.params.id, "author.id": res.locals.id };
  console.log("U query", query);

  Review.findOneAndUpdate(query, { $set: req.body }, (err, review) => {
    if (err) { res.json({ error: err });console.error(err) }
    if (!review) { res.json({ missing: req.params.id });console.error("Cannot be found") }
    else { res.json({ success: 'UPDATED ' + review._id }); }
  });
}

function deleteReview(req, res, next) {
  const query = { _id: req.params.id, "author.id": res.locals.id };
  console.log("D query", query);

  Review.findOneAndRemove(query, (err, review) => {
    if (err) { res.json({ error: err }); }
    if (!review) { res.json({ missing: req.params.id }); }
    else { res.json({ success: 'DELETED ', _id: review._id, seller: review.seller }); }
  });
}

/*
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
	    else { res.json({ success: 'DELETED ', _id: review._id, seller: review.seller }); }
    });
}
*/
/*
exports.updateReview = (req, res, next) => {
    Review.findById(req.params.id, (err, review) => {
        
        if (err) { res.json({ error: err }); }

        if (!review) { res.json({ missing: req.params.id }); }

        if (res.locals.id === review.author.id) {
          
          // update review
          
          review.save((err, review) => {
            if (err) { res.json({ error: err }); }
            else { res.json({ success: 'UPDATED ' + review._id }); }
          })
        }

    });
  }

exports.deleteReview = (req, res, next) => {
    Review.findById(req.params.id, (err, review) => {
        
        if (err) { res.json({ error: err }); }

        if (!review) { res.json({ missing: req.params.id }); }

        if (res.locals.id === review.author.id) {
          
          // delete review
          
          Review.removeOne((err, review) => {
            if (err) { res.json({ error: err }); }
            else { res.json({ success: 'UPDATED ' + review._id }); }
          })
        }

    });
  }
*/