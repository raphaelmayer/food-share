import authHeader from '../helpers/auth-header';

function post(path, payload) {
	const options = {
		method: 'POST',
	    mode: 'cors',
	    headers: authHeader(),
	    body: JSON.stringify(payload), 
	}

	return fetch('http://localhost:3001/api' + path, options)
}

export default post;