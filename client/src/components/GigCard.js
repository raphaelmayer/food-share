import React from 'react';
import { Link } from 'react-router-dom';
import './css/GigCard.css';

const GigCard = (props) => {
	return(
		<Link to={"/" + props.author.username + "/" + props._id} className="card-box">
			<div className="thumbnail" style={{backgroundImage: "url(" + props.images + ")"}}></div>
			
			<div className="text-box-top">
				<Link to={"/" + props.author.username}>
					<div className="text-box-profile-picture" style={{backgroundImage: "url(" + props.author.image + ")"}}></div>
					<div className="text-box-top-username">{props.author.username}</div>
				</Link>
			</div>
			
			<div className="text-box-middle">
				<div>{props.title}</div>
				{/*<div className="rating-box">
					<i className="fas fa-star"></i>
					<div>{props.rating}</div>
					<div className="grey">({props.reviewCount})</div>
				</div>*/}
			</div>
			
			<div className="text-box-bottom">
				<small>{props.category} | {props.tags}</small><br/>
				<i className="fas fa-map-marker-alt"></i> {props.location}
			</div>
		</Link>
	);
}


export default GigCard;
