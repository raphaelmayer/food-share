import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/GigEdit.css';

import { getToken } from '../services/auth.service';
import { updateGig, deleteGig } from '../services/gig.service';

class GigEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//const username = getToken().user.username; 	//redux state?
		const id = window.location.pathname.split('/')[3];
		console.log('gigId:', decodeURI(id))
		
		fetch('http://localhost:3001/api/gig/get/' + id) 
			.then(res => res.json())
			.then(gig => this.setState({ gig }))
    }

    handleChange(e) {
    	let newGigState = { ...this.state.gig };
    	newGigState[e.target.name] = e.target.value;
    	this.setState({ gig: newGigState });
    }

    handleSubmit(e) {
    	e.preventDefault();
    	const id = window.location.pathname.split('/')[3];
    	console.log("updating gig")
    	updateGig(e.target, id);
    }

    handleDelete(e) {
    	e.preventDefault();
    	const id = window.location.pathname.split('/')[3];
    	console.log("deleting gig")
    	if (window.confirm("Are you sure?")) deleteGig(id);

    }
	    

	render() {
		const { gig } = this.state;

		if(gig) {
			return(
				<div className="container60">
					<button type="button" onClick={this.handleTest}>test</button>

					<form className="edit-form" onSubmit={this.handleSubmit} >
						<div className="section-small">
							<input className="styledInput" onChange={this.handleChange} name='title' value={gig.title} />
						</div>
						<div className="section-small">
							<input className="styledInput" onChange={this.handleChange} name='description' value={gig.description} />
						</div>

						<button type="submit">submit</button>
					</form>

					<div className="gig-edit-delete-container">
						<div>You may choose to delete your items. Beware that this action cannot be undone.</div>
						<button onClick={ this.handleDelete } type="button">DELETE</button>
					</div>
				</div>	
			)
		} else {
			return(
				<div>It seems that this gig does not exist.(no gig)<button type="button" onClick={this.handleTest}>test</button></div>
			);
		}
	};
};

export default GigEdit