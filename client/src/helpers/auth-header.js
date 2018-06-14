function authHeader() {
	const token = JSON.parse(localStorage.getItem('accessToken'));
	
	if (token && token.token) {
		return { 'Authorization': token.token,
				 'Content-Type': 'application/json' };
	} else return {};
}

export default authHeader;