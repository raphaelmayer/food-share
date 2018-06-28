const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
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
	subject: {
		id: {
			type: String,
			required: true,
		}, 
		username: {
			type: String,
			required: true,
		}
	}
}, {timestamps: true});

module.exports = mongoose.model('Review', ReviewSchema);
