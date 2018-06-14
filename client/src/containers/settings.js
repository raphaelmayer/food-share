import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/settings.css';

import GigCard from '../components/GigCard';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = { gigs: [	{	rating: 5,
									reviewCount: 23,
									},
								{	rating: 5,
									reviewCount: 12,
									},
								{	rating: 4,
									reviewCount: 57,
									}
								]}
	}

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    console.log(JSON.parse(token));
  }

  render() {
/*
  	const statsTotal = (gigs) => {
      	let x = 0,
      	    y = 0;
      	for(let i=0; i<gigs.length; i++) {
        	x += gigs[i].rating;
        	y += gigs[i].reviewCount;
      	}
      	return ({ rating: Math.round((x / gigs.length) * 10) / 10,
      			  reviewCount: y });
    }
*/
    const statsTotal = (gigs) => {
    	const ratingTotal = gigs.reduce((x, y) => x + y.rating, 0) / gigs.length,
    		    reviewTotal = gigs.reduce((x, y) => x + y.reviewCount, 0);
            
      	return ({ rating: Math.round(ratingTotal * 10) / 10,
      			  reviewCount: reviewTotal});
    }
    
    return (       
       	<div className="container60">
       		<div className="rating-box">
				<i className="fas fa-star"></i>
				<div>{statsTotal(this.state.gigs).rating}</div>
				<div className="grey">({statsTotal(this.state.gigs).reviewCount})</div>
			</div>
       	</div>

    );
  }
}

export default Settings;
