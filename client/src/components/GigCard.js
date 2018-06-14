import React from 'react';
import { Link } from 'react-router-dom';
import './css/GigCard.css';

const GigCard = (props) => {
	return(
		<Link to={"/" + props.seller.username + "/" + props._id} className="card-box">
			<div className="thumbnail" style={{backgroundImage: "url(" + props.images.thumbnail + ")"}}></div>
			
			<div className="text-box-top">
				<Link to={"/" + props.seller.username}>
					<div className="text-box-profile-picture" style={{backgroundImage: "url(" + props.seller.image + ")"}}></div>
					<div>{props.seller.username}</div>
					<div className="grey">{props.seller.level}</div>
				</Link>
			</div>
			
			<div className="text-box-middle">
				<div>{props.title}</div>
				<div className="rating-box">
					<i className="fas fa-star"></i>
					<div>{props.rating}</div>
					<div className="grey">({props.reviewCount})</div>
				</div>
			</div>
			
			<div className="text-box-bottom">
				<small>STARTING AT </small>€ {props.price}
			</div>
		</Link>
	);
}


export default GigCard;
