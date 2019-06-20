import request from '../helpers/request';
import history from '../helpers/history';
import { getToken } from '../helpers/token';

export function createReview(formdata, subject) {
	const token = getToken();
	const review = {
		text: formdata[0].value,
		rating: formdata[1].value,
		//author: { id: token.user._id, username: token.user.username },
		subject: { id: subject.id, username: subject.username },
	}
	request('POST', '/review/', review)
	.catch(err => console.error(err))
	.then(res => res.json())
	.then(data => {
		console.log(data);
		console.log(history.location.pathname)
		history.go(history.location.pathname);
	})
}

export function updateReview(formdata, id) {	// review id to find doc in db
	const token = getToken();
	const review = {
		text: formdata[0].value,
		rating: formdata[1].value,
		//author: { id: token.user._id, username: token.user.username },
		//subject: { id: token.user._id, username: token.user.username },
	}
	request('PUT', '/review/' + id, review)
	.catch(err => console.error(err))
	.then(res => res.json())
	.then(data => {
		console.log(data);
		console.log(history.location.pathname)
		history.go(history.location.pathname);
	})
}

export function deleteReview(id) {	// review id to find doc in db
	request('DELETE', '/review/' + id)
	.catch(err => console.error(err))
	.then(res => res.json())
	.then(data => {
		console.log(data);
		console.log(history.location.pathname)
		history.go(history.location.pathname);
	})
}