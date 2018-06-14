export function getToken() {
	const token = JSON.parse(localStorage.getItem('accessToken'));
	
	if (token && token.token) return token; 
	else return {};
}

export function setToken(token) {
	localStorage.setItem('accessToken', JSON.stringify(token));
}

export function login(email, password) {
	const reqOptions = {
		method: 'POST',
		mode: 'cors',
		headers: { 'content-type': 'application/json'},
		body: JSON.stringify({ password, email })
	};

	return fetch('http://localhost:3001/api/auth/login', reqOptions)		
		.then(res => {
			if(!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json()
		})
		.then(token => {
			if(token && token.token) {
				setToken(token);
			}

			return token;
		});
}

export function register(username, email, password) {
	console.log("register")
	const reqOptions = {
		method: 'POST',
		mode: 'cors',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ username, email, password })
	};

	return fetch('http://localhost:3001/api/auth/register', reqOptions)
		.then(res => {
			if(!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(token => {
			if(token && token.token) {
				setToken(token);
			}

			return token;
		});
}

export function logout() {
		localStorage.removeItem('accessToken');
		//this.props.history.push('/');
}
