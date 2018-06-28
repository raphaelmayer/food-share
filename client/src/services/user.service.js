import post from '../helpers/post';
import history from '../helpers/history';
import { getToken } from '../services/auth.service';

export function updateUser(formdata) {
	const token = getToken();
	const user = {
    	description: formdata[0].value,
		country: formdata[1].value,
		profilePicture: formdata[2].value,
	}
	post('/user/update/' + token.user._id, user)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/' + token.user.username);
		})
}	

export function deleteUser(id) {
	post('/user/delete/' + id)
      	.catch(err => console.error(err))
		.then(res => res.json())
		.then(data => {
			console.log(data);
      		history.push('/');
		})
}