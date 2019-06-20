"use strict" 

const express = require('express');
const authRouter = require("./auth.js");
const gigRouter = require("./gig.js");
const messageRouter = require("./message.js");
const reviewRouter = require("./review.js");
const userRouter = require("./user.js");

const Gig = require('../models/gig');  // für test

module.exports = (app) => {
	const apiRouter = express.Router();
	app.use("/api", apiRouter);

	apiRouter.use("/auth", authRouter);
	apiRouter.use("/gig", gigRouter);
	apiRouter.use("/message", messageRouter);
	apiRouter.use("/review", reviewRouter);
	apiRouter.use("/user", userRouter);
	
	// search by query
	apiRouter.get('/search/:input', (req, res) => {
	    const p = req.params; console.log(p);
	    const q = req.query; console.log(q);
	    console.log(decodeURI(req.url))
	    
	    // not as errorprone
	    const options = {}; 
	    // undefined is whack => find.js
	    if (p.input !== "undefined") options.title = { "$regex": p.input, "$options": "i" };
	    if (q.category) options.category = decodeURI(q.category);
	    if (q.tags) options.tags = decodeURI(q.tags);
		
		console.log("options: ", options)
	    
	    Gig.find(options, {}, (err, items) => {
	      	if (err) console.error(err);
	      	res.json(items);
	    })
  	})  

	// create fake gigs (not usable / clickable)
	apiRouter.get('/test', (req, res, next) => {
	    const count = 50; //determines the number of individual calls
	
	    for (let i=0; i<count;i++) {
	      	let x = helpers.generateGigs();
	      	let gig = new Gig(x);
	      	gig.save((err, gig) => {
	      	  	if(err) {
	      	  	  	console.error(err);
	      	  	  	res.end('Error!', err);
	      	  	}
	      	})
	    }
	    res.end('Success! ' + count + ' gigs have been created.');
	});
}