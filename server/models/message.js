const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	text: {
		type: String,
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
	recipient: {
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

module.exports = mongoose.model('Message', MessageSchema);


/*
conversation = {
	id
	person1-id
	person2-id
	messages
}
*/