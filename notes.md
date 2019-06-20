## Notes
refactoring: 
rewrite server controllers and export (like userCtrl)
rewrite server router
delete notes
----
### // Critical User Stories for MVP
- implement **refreshToken** and functionality
- implement **image upload feature**
- introduce coherent **style**
	- design
	- Logo
- implement **password reset**
- implement some sort of **messaging** feature
- ProfileEdit gets id from token

### // Critical Bugs for MVP
- a user can make **infinite reviews** on a single other user **=>** only allow a single review and check if user has already written a review
- users can edit and delete any review if logged in **=>** implement serverside **ownership check** 
- **multiple tags** in **search feature** are not working => check serverside parsing of req.params.tags

### // Low Priority Improvements
- **remove redirects** after **creating/updating/deleting** => **change** item in **state** aswell => no need to request again
- improve **search feature**
- expand **filter service**
	- queries by: seller
	- sort: recent, price, rating, reviewCount
- email should be verified upon registering
- componentify stars rating (gig, profile, review)
- sync .gig-grid & .profile-grid
- sync GigEdit.jsx & Gig.jsx
- **options input** should not take value from **.innerHTML** => store value in .value


### // Future User Stories
- implement **location features**
	- GeoLocation
	- GeoCoding
- provide images for common items


IMPORTANT: 
requireAuth: checks token and sets req.body.author (setAuthor?)

requireOwner: checks token and passes ownerId to res.locals.id 