import React from 'react';
//import './css/ReviewBox.css';

const ReviewBox = (props) => {
	console.log(props)
	//console.log(props.user.id === props.author.id)
	//console.log(props.user.id + " + " + props.author.id)

		return(
			<div className='review-box'>
				<strong>{ props.author.username } </strong> 
	        	<small>({ props.updatedAt.split("").splice(0, 10) })</small>
				<div style={{ color: 'orange', display: 'inline' }}>
	        	  	<i className={ props.rating<=0 ? "far fa-star" : "fas fa-star" }></i>
	        	  	<i className={ props.rating<1.9 ? "far fa-star" : "fas fa-star" }></i>
	        	  	<i className={ props.rating<2.9 ? "far fa-star" : "fas fa-star" }></i>
	        	  	<i className={ props.rating<3.9 ? "far fa-star" : "fas fa-star" }></i>
	        	  	<i className={ props.rating>4.9 ? "fas fa-star" : "far fa-star" }></i>
	        	</div>
				<div>{ props.text }</div>
				{ props.user && props.user.id === props.author.id ? <EditIcons toggleEdit={ props.toggleEdit } reviewId={ props._id } update={ props.update } delete={ props.delete } /> : null }

			</div>
		);

}
const EditIcons = (props) => {
	return(
			<div className="editIcons">
				<span onClick={ (e) => props.toggleEdit(e, props.reviewId) }>
					<i className="far fa-edit"></i>
				</span>
				<span onClick={ (e) => props.delete(e, props.reviewId) }>
					<i className="far fa-trash-alt"></i>
				</span>
			</div>
	);
}

export default ReviewBox; 
