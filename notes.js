comment feature 
	onSubmit = POST => Gig.findAndUpdate(rating, reviews, reviewCount)

basic search feature 
	onSubmit = GET => '/search' + queryParams; () => Gig.find({ returnParsed(queryParams) })

//fetch state isLoading 
//	redux => EZ

edit feature (EditButton)
	profile =>
	gig => 

	isOwner ? return <button onClick={handleEdit} /> : null
	
	handleEdit() {
		user.map(() => return <input value={user.data} /> )
	}

make detailed test profiles and gigs to determine space and layout

ProfileEdit gets username from token. maybe state?

queries by: title, category, seller
sort: recent, price, rating, reviewCount


make helper function for post requests (new, editprofile, editgig)
refactor Gig.componentDidMount() + EditGig.componentDidMount() (naja db structure problem eig)

componentify stars rating (gig, profile, review)