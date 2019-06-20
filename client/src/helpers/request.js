import authHeader from '../helpers/auth-header';

function request(verb, path, payload) {
	const options = {
		method: verb,
	    mode: 'cors',
	    headers: authHeader(),
	    body: JSON.stringify(payload), 
	}

	return fetch('http://localhost:3001/api' + path, options)
}

export default request;