const mongoose = require('mongoose'),
				 Schema = mongoose.Schema,
				 bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	firstName: { type: String },
	lastName: { type: String },
	description: {
		type: String,
		default: "No description found."
	},
	level: {
		type: String,
		default: "Top Rated Seller"
	},
	profilePicture: {
		type: String,
		default: "No picture found."
	},
	country: {
		type: String,
		default: "No country specified."
	},
	role: {
		type: String,
		enum: ['Buyer', 'Seller', 'Admin', 'Owner'],
		default: 'Buyer'
	},
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Date }
}, 
{ timestamps: true });

UserSchema.pre('save', function(next) {
	const user = this,
		  SALT_FACTOR = 5;

	if(!user.isModified('password')) {return next()};

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if(err) {return next(err)};

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) {return next(err)};
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(pw, cb) {
	bcrypt.compare(pw, this.password, function(err, isMatch) {
		if(err) {return cb(err)};

		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);