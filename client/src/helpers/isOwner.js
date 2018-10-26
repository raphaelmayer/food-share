export default function userIsOwner(owner) {	// should be moved to take redux state
	const token = JSON.parse(localStorage.getItem('accessToken'));	
	const user = JSON.parse(localStorage.getItem('user'));

	return (token && user && user.username === owner) ? true : false; 
}