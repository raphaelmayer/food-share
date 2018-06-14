import post from '../helpers/post';
import { getToken } from '../services/auth.service';

export function postReview(formdata, user) {
	const token = getToken();
	const review = {
		text: formdata[0].value,
		rating: formdata[1].value,
		author: { id: token.user._id, username: token.user.username },
		seller: { id: user.id, username: user.username },
	}
	post('/reviews/post', review)
	.then(res => res.json())
	.then(data => console.log(data))
}


export function updateReview(formdata, id) {
	const token = getToken();
	const review = {
		text: formdata[0].value,
		rating: formdata[1].value,
		author: { id: token.user._id, username: token.user.username },
		//seller: { id: token.user._id, username: token.user.username },
	}
	post('/reviews/update/' + id, review)
	.then(res => res.json())
	.then(data => console.log(data))
}


export function deleteReview(id) {
	post('/reviews/delete/' + id)
	.then(res => res.json())
	.then(data => console.log(data))
}