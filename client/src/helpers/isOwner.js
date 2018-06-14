export default function userIsOwner(owner) {
	const token = JSON.parse(localStorage.getItem('accessToken'));

	return (token && token.user.username === owner) ? true : false; 
}