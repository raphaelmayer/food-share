## FoodShare, a food sharing app 
*FoodShare is a web application where users can share food. FoodShare is still in the development stage. It is built with the **MERN Stack**.*

**Link:** *to be determined* 

### // Critical User Stories before MVP
- implement **refreshToken** and functionality
- implement **search feature**
- implement **filter service**
	- queries by: title, category, seller
	- sort: recent, price, rating, reviewCount
- implement **image upload feature**
- implement **location features**
	- GeoLocation
	- google maps api
- introduce coherent **style**
	- design
	- Logo

### // Critical Bugs before MVP
- a user can make **infinite reviews** on a single other user **=>** only allow a single review and check if user has already written a review
- users can edit and delete any review if logged in **=>** implement serverside **ownership check** 
- **multiple tags** in **search feature** are not working => check serverside parsing of req.params.tags

### // Low Priority
- componentify stars rating (gig, profile, review)
- sync gig-grid & profile-grid

