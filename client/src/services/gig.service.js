import request from "../helpers/request";
import history from "../helpers/history";
import { getToken } from "../helpers/token";

export function getGigs(id) {
	return fetch(process.env.REACT_APP_API_URL + '/gig')
		.then(res => res.json())
		.catch(console.error)
}

export function getGig(id) {
	return fetch(process.env.REACT_APP_API_URL + '/gig/' + id)
		.then(res => res.json())
		.catch(console.error)
}

export function createGig(formdata) {
	const token = getToken();
	const gig = {
		title: formdata[0].value,
		category: formdata[1].value,
		description: formdata[2].value,
		dateOfExpiry: formdata[3].value,
		location: formdata[4].value,
		tags: formdata[5].value,
		//author: { id: token.user._id, username: token.user.username },
	}
	request("POST", "/gig/", gig)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push("/" + data.gig.author.username + "/" + data.gig._id);
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
		//	.author nied unbedingt gut
		//author: { id: token.user._id, username: token.user.username },
	}
	request("PUT", "/gig/" + id, gig)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push("/" + data.gig.author.username + "/" + data.gig._id);
		})
}

export function deleteGig(id) {
	request("DELETE", "/gig/" + id)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push("/" + data.gig.author.username);
		})
}

export function updateGigStatus(newStatus, id) {
	request("POST", "/gig/status/" + id, newStatus)
		.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => console.log(data));
}