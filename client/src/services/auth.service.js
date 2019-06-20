import { getToken, setToken } from "../helpers/token";

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
			return res.json();
		})
		.then(tokens => {
			console.log(tokens);
			if(tokens && tokens.accessToken && tokens.refreshToken) {
				setToken(tokens);
			}

			return tokens;
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
		.then(tokens => {
			if(tokens && tokens.accessToken && tokens.refreshToken) {
				setToken(tokens);
			}

			return tokens;
		});
}

export function logout() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');
		//this.props.history.push('/');
}
