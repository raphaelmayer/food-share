const AuthenticationController = require('./controllers/authentication'),
								 express = require('express'),
								 passportService = require('./config/passport'),
								 passport = require('passport');
                 helpers = require('./helpers');

const Gig = require('./models/gig');
const User = require('./models/user');
const Review = require('./models/review');

//auth middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

//role types
const REQUIRE_OWNER = "Owner",
	    REQUIRE_ADMIN = "Admin",
	    REQUIRE_SELLER = "Seller",
	    REQUIRE_BUYER = "Buyer";

module.exports = (app) => {
	const apiRoutes = express.Router(),
		    authRoutes = express.Router();

	// Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

	// Set url for API group routes
  app.use('/api', apiRoutes);


  // routes

//========================== user ===========================

  apiRoutes.get('/user/getall/:username/:gigId', (req, res) => {
    const username = req.params.username;
    const gigId = req.params.gigId;
    helpers.getCompleteUser(res, username, gigId)
    .then(data => res.json(data));
  });
  
  apiRoutes.get('/user/getall/:username', (req, res) => {
    const username = req.params.username;
    helpers.getCompleteUser(res, username)
    .then(data => res.json(data));
  });

  apiRoutes.get('/user/get/:userId', (req, res) => {
    console.log(req.params.userId)
    User.findById(req.params.userId, (err, user) => {
      if (err) { res.json({ error: 'cannot find user' }) }
      res.json(user);
    });
  });

  apiRoutes.post('/user/update/:userId', requireAuth, (req, res, next) => {
    const userId = req.params.userId;
    const newUser = req.body;

    User.findByIdAndUpdate(userId, { $set: newUser }, (err, user) => {
      if (err) { return err ; }
      if(!user) res.json({ error: 'no such user' });
      console.log(user);
      res.json(user);
    });
  });

  apiRoutes.post('/user/delete/:id', requireAuth, (req, res) => {
    //User.findByIdAndDelete(req.params.id, (err, user) => {
    //  if (err) { return err ; }
    //  if(!user) res.json({ error: 'no such user' });
      res.json({ success: 'user removed.'});
    //});
  });

//========================== gigs ===========================

  apiRoutes.get('/getgigs', (req, res) => {
    Gig.find({}, (err, gig) => {
      if(err) { console.log(err); }
      if(gig) { res.json(gig); } 
      else { res.json({ Response: "No gigs found" }); };
    });
  });

  apiRoutes.get('/gig/get/:gigId', (req, res) => {
    Gig.findById(req.params.gigId, (err, gig) => {
      if (err) { return next(err); }
      res.json(gig);
    });
  });

  apiRoutes.post('/gig/post', requireAuth, (req, res, next) => {
    console.log(req.body);
    let gig = new Gig(req.body);

    gig.save((err, gig) => {
      if(err) { return next(err); }
      res.json(gig);
    });
  });

  apiRoutes.post('/gig/update/:id', requireAuth, (req, res, next) => {
    Gig.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, gig) => {
      if (err) { console.error(err); }
      if(!gig) res.json({ error: 'no such gig' });
      console.log(gig);
      res.json(gig);
    });
  });

  apiRoutes.post('/gig/delete/:id', requireAuth, (req, res) => {
    Gig.findByIdAndDelete(req.params.id, (err, gig) => {
      if (err) { return err ; }
      if(!gig) res.json({ error: 'no such gig' });
      res.json({ success: 'gig removed.'});
    });
  });

//========================== reviews ===========================

  apiRoutes.get('/reviews/get/:gigId', (req, res) => {
    Review.find({ gigId: req.params.gigId }, (err, reviews) => {
      res.json(reviews);
    })
  });

  apiRoutes.post('/reviews/post', requireAuth, (req, res, next) => {
    let review = new Review(req.body);
    review.save((err, review) => {
      if(err) { return next(err); }
      res.json(review);
    });
  });

  apiRoutes.post('/reviews/update/:id', requireAuth, (req, res, next) => {
    Review.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, review) => {
      if (err) { res.json({ error: err }); }
      if (!review) { res.json({ missing: req.params.id }); }
      else { res.json({ success: 'UPDATED ' + review._id }); }
    });
  });

  apiRoutes.post('/reviews/delete/:id', requireAuth, (req, res, next) => {
    Review.findByIdAndRemove(req.params.id, (err, review) => {
      if (err) { res.json({ error: err }); }
      if (!review) { res.json({ missing: req.params.id }); }
      else { res.json({ success: 'DELETED ' + review._id }); }
    });
  });

//========================== testing ===========================

  apiRoutes.get('/test', (req, res) => {
    const count = 20; //determines the number of individual calls

    for (let i=0; i<count;i++) {
      let x = helpers.generateGigs();
      let gig = new Gig({
        title: x.title,
        price: x.price,
        description: x.description,
        rating: x.rating,
        reviewCount: x.reviewCount,
        seller: { username: x.seller.username,
                  level: "Top Rated Seller",
                  image: x.seller.image },
        images: { thumbnail: x.images.thumbnail },
      });
      gig.save((err, gig) => {
        if(err) return next(err); 
      })
    }
    res.end('Success! ' + count + ' gigs have been created.')
  });

};
