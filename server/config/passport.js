const passport = require('passport'),
				 User = require('../models/user'),
				 config = require('./main'),
				 JwtStrategy = require('passport-jwt').Strategy,
				 ExtractJwt = require('passport-jwt').ExtractJwt,
				 LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	User.findOne({ email: email }, (err, user) => {
		if(err) {return done(err)};
		if(!user) {return done(null, false, {error: 'wrong email'})};

		user.comparePassword(password, (err, isMatch) => {
			if(err) {return done(err)};
			if(!isMatch) {return done(null, false, {error: 'wrong e-mail'})};

			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: config.secret,
	passReqToCallback: true
};

const jwtLogin = new JwtStrategy(jwtOptions, (request, payload, done) => {
	const author = { id: payload._id, username: payload.username }
	console.log("payload: ", payload)
	console.log("request.body.author: ", request.body.author )

	// author no longer from token.user but this solution is not optimal
	request.body.author = author;	
	//if (request.body.author) {
	//	console.log("payload-id: ", payload._id);
	//	console.log("req.body-id: ", request.body.author.id);
	//	console.log("ids are the same: ", payload._id === request.body.author.id && payload.username === request.body.author.username);
	//}
	
	User.findById(payload._id, (err, user) => {
		if(err) {return done(err, false)};

		if(user) {
			done(null, user);
		} else {
			done(null, false);
		};
	});
});

passport.use(jwtLogin);
passport.use(localLogin);