import authHeader from '../helpers/auth-header'; 

//client.service is not in use right now

export function getRequest(url) {}

export function postRequest(url, payload) {
	const options = {
	  	method: 'POST',
	  	mode: 'cors',
	  	headers: authHeader(),
	  	body: JSON.stringify(payload),   
	}

	fetch('http://localhost:3001/api' + url, options)
	  	.catch(err => alert(err))		//handleError(err)
	  	.then(res => res.json())
	  	.then(data => console.log(data))
}