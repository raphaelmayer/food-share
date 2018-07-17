const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GigSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	dateOfExpiry: {
		type: String,
		required: true,
	},
	tags: {
		type: String,
	},
	status: {
		type: String,
		required: true,
		enum: [ 'open', 'pending', 'closed' ],
		default: 'open'
	},
	author: {
		id: {
			type: String,
			required: true,
		}, 
		username: {
			type: String,
			required: true,
		}
	},
	images: [],
}, {timestamps: true});

//tags!, reviews(comments) 

module.exports = mongoose.model('Gig', GigSchema);
