import request from '../helpers/request';
import history from '../helpers/history';
import { getToken } from '../helpers/token';

export function getCompleteUser(user, id) {
	id = id || "";
    return fetch(process.env.REACT_APP_API_URL + '/user/getall/' + user + '/' + id)
    	.then(res => res.json())
    	.catch(console.error)
}

export function getUser(id) {
    return fetch(process.env.REACT_APP_API_URL + '/user/' + id)
    	.then(res => res.json())
    	.catch(console.error)
}

export function updateUser(formdata) {
	const token = getToken();
	const user = {
    	description: formdata[0].value,
		country: formdata[1].value,
		profilePicture: formdata[2].value,
	}
	request('PUT', '/user/' + token.user._id, user)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/' + token.user.username);
		})
}	

export function deleteUser(id) {
	request('DELETE', '/user/' + id)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/');
		})
}