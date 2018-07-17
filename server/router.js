const AuthController = require('./controllers/authentication'),
  reviewController = require('./controllers/review'),
  gigController = require('./controllers/gig'),
  userController = require('./controllers/user'),
  messageController = require('./controllers/message'),
	express = require('express'),
	passportService = require('./config/passport'),
	passport = require('passport'),
  helpers = require('./helpers');

const Gig = require('./models/gig');  //für test

//auth middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
const requireOwner = AuthController.requireOwnership;

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
     // undefined is whack => find.js
     if (p.input !== "undefined") options.title = { "$regex": p.input, "$options": "i" };
     if (q.category) options.category = decodeURI(q.category);
     if (q.tags) options.tags = decodeURI(q.tags);
console.log("options: ", options)
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

  apiRoutes.post('/user/update/:id', requireOwner, userController.updateUser);

  apiRoutes.post('/user/delete/:id', requireOwner, userController.deleteUser);

//========================== gigs ===========================

  apiRoutes.get('/getgigs', gigController.getGigs);

  apiRoutes.get('/gig/get/:id', gigController.getGig);

  apiRoutes.post('/gig/post', requireAuth, gigController.createGig);

  apiRoutes.post('/gig/update/:id', requireOwner, gigController.updateGig);

  apiRoutes.post('/gig/delete/:id', requireOwner, gigController.deleteGig);

  apiRoutes.post('/gig/status/:id', requireOwner, gigController.updateGigStatus);

//========================== reviews ===========================

  apiRoutes.get('/review/get/:gigId', reviewController.getReviews);

  apiRoutes.post('/review/post', requireAuth, reviewController.createReview);

  apiRoutes.post('/review/update/:id', requireOwner, reviewController.updateReview);

  apiRoutes.post('/review/delete/:id', requireOwner, reviewController.deleteReview);

//========================== messages ===========================

  apiRoutes.get('/message/get', requireOwner, messageController.getMessages);

  apiRoutes.post('/message/post', requireAuth, messageController.createMessage);

//========================== testing ===========================

  apiRoutes.get('/test', (req, res, next) => {
    const count = 50; //determines the number of individual calls

    for (let i=0; i<count;i++) {
      let x = helpers.generateGigs();
      let gig = new Gig(x);
      gig.save((err, gig) => {
        if(err) {
          console.error(err);
          res.end('Error!', err);
        }
      })
    }
    res.end('Success! ' + count + ' gigs have been created.');
  });

};
