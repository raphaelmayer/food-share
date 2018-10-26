export function getToken() {
	const tokens = {
		accessToken: JSON.parse(localStorage.getItem('accessToken')),
		refreshToken: JSON.parse(localStorage.getItem('refreshToken')),
		user: JSON.parse(localStorage.getItem('user'))
	}
	console.log(tokens)
	if (tokens && tokens.accessToken && tokens.refreshToken) return tokens; 
	else return {};
}

export function setToken(tokens) {
	localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
	localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
	localStorage.setItem('user', JSON.stringify(tokens.user));
}