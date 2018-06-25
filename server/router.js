const AuthController = require('./controllers/authentication'),
  reviewController = require('./controllers/review'),
  gigController = require('./controllers/gig'),
  userController = require('./controllers/user'),
	express = require('express'),
	passportService = require('./config/passport'),
	passport = require('passport'),
  helpers = require('./helpers');

const Gig = require('./models/gig');  //für test

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
  authRoutes.post('/register', AuthController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthController.login);

	// Set url for API group routes
  app.use('/api', apiRoutes);


// routes

  apiRoutes.get('/search/:input', (req, res) => {
    const p = req.params; console.log(p);
    const q = req.query; console.log(q);
    console.log(decodeURI(req.url))
    
    // not as errorprone
     const options = {};
     if (p.input) options.title = { "$regex": p.input, "$options": "i" };
     if (q.category) options.category = decodeURI(q.category);
     if (q.tags) options.tags = decodeURI(q.tags);
console.log(options)
    Gig.find(options, {}, (err, items) => {
      if (err) console.error(err);
      res.json(items);
    })
    //res.json({ "req.params": req.params, "req.query": req.query });
  })

//========================== user ===========================

  apiRoutes.get('/user/getall/:username/:gigId', userController.getCompleteUser);

  apiRoutes.get('/user/getall/:username', userController.getCompleteUser);
  
  apiRoutes.get('/user/get/:id', userController.getUser);

  apiRoutes.post('/user/update/:id', requireAuth, userController.updateUser);

  apiRoutes.post('/user/delete/:id', requireAuth, userController.deleteUser);

//========================== gigs ===========================

  apiRoutes.get('/getgigs', gigController.getGigs);

  apiRoutes.get('/gig/get/:id', gigController.getGig);

  apiRoutes.post('/gig/post', requireAuth, gigController.createGig);

  apiRoutes.post('/gig/update/:id', requireAuth, gigController.updateGig);

  apiRoutes.post('/gig/delete/:id', requireAuth, gigController.deleteGig);

//========================== reviews ===========================

  apiRoutes.get('/review/get/:gigId', reviewController.getReviews);

  apiRoutes.post('/review/post', requireAuth, reviewController.createReview);

  apiRoutes.post('/review/update/:id', requireAuth, reviewController.updateReview);

  apiRoutes.post('/review/delete/:id', requireAuth, reviewController.deleteReview);

//========================== testing ===========================

  apiRoutes.get('/test', (req, res, next) => {
    const count = 20; //determines the number of individual calls

    for (let i=0; i<count;i++) {
      let x = helpers.generateGigs();
      let gig = new Gig(x);
      gig.save((err, gig) => {
        if(err) console.error(err);
        res.end('Error!');
      })
    }
    res.end('Success! ' + count + ' gigs have been created.');
  });

};
