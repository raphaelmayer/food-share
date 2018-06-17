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

//========================== user ===========================

  apiRoutes.get('/user/getall/:username/:gigId', userController.getCompleteUser);

  apiRoutes.get('/user/getall/:username', userController.getCompleteUser);
  
  apiRoutes.get('/user/get/:id', userController.getUser);

  apiRoutes.post('/user/update/:id', requireAuth, userController.updateUser);

  apiRoutes.post('/user/delete/:id', requireAuth, userController.deleteUser);

//========================== gigs ===========================

  apiRoutes.get('/getgigs', gigController.getGigs);

  apiRoutes.get('/gig/get/:gigId', gigController.getGig);

  apiRoutes.post('/gig/post', requireAuth, gigController.createGig);

  apiRoutes.post('/gig/update/:id', requireAuth, gigController.updateGig);

  apiRoutes.post('/gig/delete/:id', requireAuth, gigController.deleteGig);

//========================== reviews ===========================

  apiRoutes.get('/review/get/:gigId', reviewController.getReviews);

  apiRoutes.post('/review/post', requireAuth, reviewController.createReview);

  apiRoutes.post('/review/update/:id', requireAuth, reviewController.updateReview);

  apiRoutes.post('/review/delete/:id', requireAuth, reviewController.deleteReview);

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
