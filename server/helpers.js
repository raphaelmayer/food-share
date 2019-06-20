const User = require('./models/user');
const Gig = require('./models/gig');
const Review = require('./models/review');

const filterOptions = [
  [
  "Category",
  "Fruits and Vegetables",
  "Meat and Fish",
  "Egg and Milk Products",
  "Bread",
  "Sweets and Snacks",
  "Frozen Food",
  "Beverages",
  "Others",
  ], [
  "Tags",
  "Vegan",
  "Swag",
  "Bio",
  ], [
  "Max Distance",
  ], [
  "Sort",
  "Distance",
  "Date of Expiry",
  ]
]

//attach gigs array to userdata and send to client
exports.getCompleteUser = async function(res, username, id) {
  const user = await User.findOne({ username: username });
  const gigs = await Gig.find({ "author.username": username });
  const reviews = await Review.find({ 'subject.username': username });
  const stats = statsTotal(reviews);
  
  return { 
    username: user.username, 
    _id: user._id,
    description: user.description,
    createdAt: user.createdAt,
    country: user.country, 
    gigs: gigs, 
    reviews: reviews,
    stats: stats,
  }
}

const statsTotal = (reviews) => {
  const ratingTotal = reviews.reduce((x, y) => x + y.rating, 0) / reviews.length;
    return { rating: Math.round(ratingTotal * 10) / 10 };
}
exports.statsTotal = (reviews) => {
  const ratingTotal = reviews.reduce((x, y) => x + y.rating, 0) / reviews.length;
    return { rating: Math.round(ratingTotal * 10) / 10 };
}


exports.generateGigs = () => {
  const gig = { title: ["Bananen", "Ananas", "Kartoffel viel", "Erdbeeren", "Coca-Cola", "Brot", "Melonen"],
                description: "Lorem ipsum",
                category: filterOptions[0].slice(1),
                location: [ "Sistrans", "Ampass", "Innsbruck", "Völs", "Telfs", "Aldrans", "Wattens", "Riffian", "Hall in Tirol", "Arzl", "Thaur", "Imst", "Reutte", "Natters" ],
                dateOfExpiry: [ "2018-06-20", "2018-08-12", "2018-06-01", "2018-09-20", "2018-03-09", "2018-08-26" ],
                tags: filterOptions[1].slice(1),
                author: {
                    username: ["HeinzSolutions", "attiimaster", "SchiemdMarkus", "DavidOnline", "Güglgül gül", "WebTech"],
                    image: ["https://www.stayathomemum.com.au/cache/860x380-0/wp-content/uploads/2015/12/bigstock-Bangkok-jan-A-Waxwork-Of-178261381-e1502062851153.jpg", "https://www.gannett-cdn.com/-mm-/65a45bca9f33902b2606c2e4b514d633b8e6864a/c=0-312-3147-2090&r=x803&c=1600x800/local/-/media/2017/11/14/USATODAY/USATODAY/636462879849725622-AP-People-Blake-Shelton.jpg", "https://cdn.aarp.net/content/dam/aarp/entertainment/Styles-and-Trends/2017/11/1140-famous-people-lost-john-hillerman.imgcache.rev2704554f25acc328d06d94aa0ec6ad6d.web.jpg"]
                },
                images: [ 
                  "https://www.incimages.com/uploaded_files/image/970x450/getty_855098134_353411.jpg", 
                  "https://www.kroger.com/product/images/large/front/0000000004011", 
                  "https://butterwithasideofbread.com/wp-content/uploads/2012/07/Easiest-Best-Homemade-Bread.BSB_.IMG_6014.jpg", 
                  "https://atmedia.imgix.net/256bcd631df0a49d24b03a30cad403298c93f6f0?auto=format&q=45&w=300.0&h=216.0&fit=max&cs=strip", 
                  "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_11bac8bd-745f-4a59-b1dd-4afe937f9db2.JPG", 
                  "http://www.groceriesinaboxbonaire.com/wp-content/uploads/2016/12/AHI_434d50323135303337_1_LowRes_JPG.jpg", 
                  "https://storage.googleapis.com/zopnow-static/images/products/320/fresh-apple-red-delicious-v-500-g.png",
                ]  }
  let newGig = {
    title: gig.title[getRandomInt(gig.title)],
    description: gig.description,
    category: gig.category[getRandomInt(gig.category)],
    location: gig.location[getRandomInt(gig.location)],
    dateOfExpiry: gig.dateOfExpiry[getRandomInt(gig.dateOfExpiry)],
    tags: gig.tags[getRandomInt(gig.tags)],
    author: { id: "id",
            username: gig.author.username[getRandomInt(gig.author.username)],
              image: gig.author.image[getRandomInt(gig.author.image)] },
    images: gig.images[getRandomInt(gig.images)]
  }
  return newGig;

}

function getRandomInt(arr) {
  return Math.floor(Math.random() * Math.floor(arr.length));
}