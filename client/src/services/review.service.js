import post from '../helpers/post';
import { getToken } from '../services/auth.service';

export function createReview(formdata, seller) {
	const token = getToken();
	const review = {
		text: formdata[0].value,
		rating: formdata[1].value,
		author: { id: token.user._id, username: token.user.username },
		seller: { id: seller.id, username: seller.username },
	}
	post('/review/post', review)
	.catch(err => console.error(err))
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
	post('/review/update/' + id, review)
	.catch(err => console.error(err))
	.then(res => res.json())
	.then(data => console.log(data))
}

export function deleteReview(id) {
	post('/review/delete/' + id)
	.catch(err => console.error(err))
	.then(res => res.json())
	.then(data => console.log(data))
}