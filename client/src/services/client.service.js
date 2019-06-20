

export function searchGigs(fd, tags) { // fd = formdata
	const category = fd[0].value ? "&category=" + fd[0].value : "";
	const input = fd[1].value || undefined;
	const joinedTags = tags[0] ? "&tags=" + tags.join("+") : "";
	
	const query = input + "?" + category + joinedTags;
	console.log(query);

	return fetch(process.env.REACT_APP_API_URL + '/search/' + encodeURI(query))
		.then(res => res.json())
		.catch(console.error)
}