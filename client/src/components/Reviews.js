import React from 'react';
//import './css/Reviews.css';

import { createReview, updateReview, deleteReview } from '../services/review.service';

import ReviewBox from './ReviewBox';

const Reviews = (props) => {
	console.log("review.props", props)
	const { reviews, user } = props;

	function handleSubmit(e) {
		e.preventDefault();
		createReview(e.target, user);
	}
	function handleUpdate(e, id) {
		e.preventDefault();
		console.log('update')
		updateReview(e.target, id);
	}
	function handleDelete(e, id) {
		e.preventDefault();
		console.log('delete')
		deleteReview(id);
	}

	if (!user) {
		return(
			<div>
				<div className='reviews-container'>
					{ reviews ? 
						reviews.map((review, i) => <ReviewBox update={ null } delete={ null } { ...review } key={i} />)
						: 'No reviews yet. Be the first one to rate!' }
				</div>
			</div>
		);		
	} else {
		return(
			<div>
				<div className='reviews-container'>
					{ reviews ? 
						reviews.map((review, i) => <ReviewBox update={ handleUpdate } delete={ handleDelete } { ...review } key={i} />)
						: 'No reviews yet. Be the first one to rate!' }
				</div>
				
				<form onSubmit={ handleSubmit } >
					<textarea></textarea>
	
					<input type='number' placeholder='1-5' />
	
					<input type='submit' />
				</form>
			</div>
		);
	}
}

export default Reviews; 

