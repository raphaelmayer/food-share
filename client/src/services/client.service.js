

export function searchGigs(fd, tags) { // fd = formdata
	const category = fd[0].value ? "&category=" + fd[0].value : "";
	const input = fd[1].value || undefined;
	const joinedTags = tags[0] ? "&tags=" + tags.join("+") : "";
	
	const query = input + "?" + category + joinedTags;
	console.log(query);

	return fetch('http://localhost:3001/api/search/' + encodeURI(query))
}