import React, { Component } from 'react';
import './css/Reviews.css';

import { createReview, updateReview, deleteReview } from '../services/review.service';
import { getToken } from '../services/auth.service';
import ReviewBox from './ReviewBox';

class Reviews extends Component {
	constructor() {
		super();
		this.state = { showInput: false }
		this.handleShowInput = this.handleShowInput.bind(this);
	}
	handleShowInput(e) {
		this.state.showInput ? 
			this.setState({ showInput: false }) 
			: 
			this.setState({ showInput: true });
	}
	handleSubmit(e) {
		e.preventDefault();
		createReview(e.target, this.props.seller);
	}
	handleUpdate(e, id) {
		e.preventDefault();
		console.log('update');
		window.prompt("asd")
		//updateReview(e.target, id);
	}
	handleDelete(e, id) {
		e.preventDefault();
		console.log('delete');
		if (window.confirm("Are you sure?")) deleteReview(id);
	}
	render() {
	console.log("reviews.props", this.props)
	const { reviews, seller } = this.props;
	const user = getToken().user;

	console.log("user", user)


	if (!user) {	//if not logged in 
		return(
			<div>
				<div className='reviews-container'>
					{ reviews ? 
						reviews.map((review, i) => <ReviewBox update={ null } delete={ null } { ...review } key={i} />)
						: 'No reviews yet. Be the first one to rate!' }
				</div>
			</div>
		);		
	} else {		//if logged in, display input field
		return(
			<div>
				<div className='reviews-container'>
					{ reviews ? 
						reviews.map((review, i) => <ReviewBox user={{ id: user._id, username: user.username }} update={ this.handleUpdate } delete={ this.handleDelete } { ...review } key={i} />)
						: 'No reviews yet. Be the first one to rate!' }
				</div>
				
				<form onSubmit={ this.handleSubmit } >
					<textarea></textarea>
					<input type='number' placeholder='1-5' />
					<input type='submit' />
				</form>
			</div>
		);
	}
}
}

export default Reviews; 

