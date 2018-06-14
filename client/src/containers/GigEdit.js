import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/GigEdit.css';

import { getToken } from '../services/auth.service';
import post from '../helpers/post';

class GigEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {  }

		this.handleTest = this.handleTest.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const username = getToken().user.username; 	//redux state?
		const url = window.location.pathname.split('/');
		//if(username === url[2]) 
		console.log('gigname:', decodeURI(url[3]))
		
		fetch('http://localhost:3001/api/gig/get/' + url[3]) 
			.then(res => res.json())
			.then(gig => this.setState({ gig }))
    }

    handleTest(e) {
    	e.preventDefault();
    	console.log(this.state);
    }

    handleChange(e) {
    	let newGigState = { ...this.state.gig };
    	newGigState[e.target.name] = e.target.value;
    	this.setState({ gig: newGigState });
    }

    handleSubmit(e) {
    	console.log(window.location.pathname)
    	e.preventDefault();
    	for(let i=0; i<e.target.length; i++) {
    		console.log(e.target[i].name + ':', e.target[i].value);
    	}
    	const url = window.location.pathname.split('/');
    	const updatedGig = {
    		//_id: url[3],
      		title: e.target[0].value,
      		description: e.target[1].value,
    	}
    	
	    post('/gig/update/' + url[3], updatedGig)
	      	.catch(err => console.error(err))
	      	.then(res => res.json())
	      	.then(updatedGig => console.log(updatedGig))
	      	//.then(updatedGig => this.props.history.push('/' + updatedGig.username));
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