import React from 'react';
//import './css/ReviewBox.css';

const ReviewBox = (props) => {
	if (props.update) {
		return(
			<div className='review-box'>
				<strong>{ props.author.username }</strong>
				<div style={{color: 'orange', display: 'inline'}}>
	        	  	<i className={props.rating<=0 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating<1.9 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating<2.9 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating<3.9 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating>4.9 ? "fas fa-star" : "far fa-star"}></i>
	        	</div>
				<br />
				{ props.text }
				<br />
				<button onClick={ () => props.show = true }>Edit</button>
				<button onClick={ (e) => props.update(e, props._id) }>Update</button>
				<button onClick={ (e) => props.delete(e, props._id) }>Delete</button>
			</div>
		);		
	} else {
		return(
			<div className='review-box'>
				<strong>{ props.author.username }</strong>
				<div style={{color: 'orange', display: 'inline'}}>
	        	  	<i className={props.rating<=0 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating<1.9 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating<2.9 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating<3.9 ? "far fa-star" : "fas fa-star"}></i>
	        	  	<i className={props.rating>4.9 ? "fas fa-star" : "far fa-star"}></i>
	        	</div>
				<br />
				{ props.text }
				<br />
			</div>
		);			
	}

}

export default ReviewBox; 
