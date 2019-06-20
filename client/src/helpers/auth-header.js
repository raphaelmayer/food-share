import { getToken } from './token';

function authHeader() {
	const token = getToken();
	console.log(token);
	
	if (token && token.accessToken && token.refreshToken) {
		return { 
			'Authorization': token.accessToken,
			'refreshtoken': token.refreshToken,
			'Content-Type': 'application/json'
		};

	} else return {};
}

export default authHeader;