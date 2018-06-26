import post from '../helpers/post';
import history from '../helpers/history';
import { getToken } from '../services/auth.service';

export function createGig(formdata) {
	const token = getToken();
	const gig = {
		title: formdata[0].value,
		category: formdata[1].value,
		description: formdata[2].value,
		dateOfExpiry: formdata[3].value,
		location: formdata[4].value,
		tags: formdata[5].value,
		seller: { id: token.user._id, username: token.user.username },
	}
	post('/gig/post', gig)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/' + data.gig.seller.username);
		})
}

export function updateGig(formdata, id) {
	//const token = getToken();
	console.log(id)
	const gig = {
		title: formdata[0].value,
		category: formdata[1].value,
		description: formdata[2].value,
		dateOfExpiry: formdata[3].value,
		location: formdata[4].value,
		tags: formdata[5].value,
		//	.seller nied unbedingt gut
		//seller: { id: token.user._id, username: token.user.username },
	}
	post('/gig/update/' + id, gig)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/' + data.gig.seller.username);
		})
}

export function deleteGig(id) {
	post('/gig/delete/' + id)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/' + data.gig.seller.username);
		})
}