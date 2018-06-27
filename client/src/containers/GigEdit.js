import React, { Component } from 'react';
import './css/GigEdit.css';
import filterOptions from '../helpers/filterOptions';

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

					<h2>Edit your item</h2>

					<form onSubmit={this.handleSubmit} >
            			<div className="section-small">
            			  <h4>title</h4>
            			  <input className="styledInput" onChange={this.handleChange} type="input" maxLength="50" placeholder="title" name='title' value={gig.title} required />
            			</div>
            
                        <div className="section-small">
                          <h4>Choose a category for your gig</h4>
                          <select className="styledInput" placeholder="category" type="input" required>
                            { filterOptions[0].map(str => <option value={ str.value }>{ str.text }</option>) }
                          </select>
                        </div>
            			
            			<div className="section-small">
            			  <h4>description</h4>
            			  <textarea className="styledInput" onChange={this.handleChange} rows="5" cols="20" placeholder="description" name='description' type="input" required value={gig.description} />
            			</div>
            			
            			<div className="section-small">
            			  <h4>Date Of Expiry</h4>
            			  <input className="styledInput" onChange={this.handleChange} type="date" placeholder="dateOfExpiry" name='dateOfExpiry' required value={gig.dateOfExpiry} />
            			</div>
            			
            			<div className="section-small">
            			  <h4>location</h4>
            			  <input className="styledInput" onChange={this.handleChange} type="input" maxLength="50" placeholder="location" name='location' required value={gig.location} />
            			</div>
            			
            			<div className="section-small">
            			  <h4>Set up tags</h4>
            			  <input className="styledInput" onChange={this.handleChange} type="text" placeholder="tags" name='tags' multiple value={gig.tags} />
            			</div>

						<button type="submit">submit</button>
					</form>

					<div className="gig-edit-delete-container">
						<div>You may choose to delete this item. Beware that this action is permanent and cannot be undone.</div>
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