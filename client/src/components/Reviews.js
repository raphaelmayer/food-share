import React, { Component } from 'react';
import './css/Reviews.css';

import { createReview, updateReview, deleteReview } from '../services/review.service';
import { getToken } from '../services/auth.service';
import ReviewBox from './ReviewBox';

class Reviews extends Component {
	constructor() {
		super();
		this.state = { edit: false }
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	toggleEdit(e, id) {
		const review = this.props.reviews.filter((d) => d._id == id ? d : null)[0]; 
		console.log(review);
		this.state.edit ? 
			this.setState({ edit: false }) 
			: 
			this.setState({ edit: review });
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log('create');
		createReview(e.target, this.props.seller);
	}
	handleUpdate(e) {
		e.preventDefault();
		console.log('update');
		updateReview(e.target, this.state.edit._id);
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
						reviews.map((review, i) => <ReviewBox toggleEdit={ this.toggleEdit } user={{ id: user._id, username: user.username }} update={ this.handleUpdate } delete={ this.handleDelete } { ...review } key={i} />)
						: 'No reviews yet. Be the first one to rate!' }
				</div>
				
				<form onSubmit={ this.state.edit ? this.handleUpdate : this.handleSubmit } >
					<textarea placeholder={ this.state.edit.text } >

					</textarea>
					<input type='number' placeholder='1-5' />
					<input type='submit' />
				</form>
			</div>
		);
	}
}
}

export default Reviews; 

