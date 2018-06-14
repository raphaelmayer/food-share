import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ProfileEdit.css';

import { getToken } from '../services/auth.service';
import post from '../helpers/post';

class ProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.handleTest = this.handleTest.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const userId = getToken().user._id; 
		console.log(userId)
		fetch('http://localhost:3001/api/user/get/' + userId)
			.then(res => res.json())
			.then(user => this.setState({user: user}))
    }

    handleTest(e) {
    	e.preventDefault();
    	console.log(this.state);
    }

    handleChange(e) {
    	let newUserState = {...this.state.user};
    	newUserState[e.target.name] = e.target.value;
    	this.setState({ user: newUserState });
    }

    handleSubmit(e) {
    	e.preventDefault();
		const userId = getToken().user._id; 

    	for(let i=0; i<e.target.length; i++) {
    		console.log(e.target[i].name + ':', e.target[i].value);
    	}

    	const updatedProfile = {
    		description: e.target[0].value,
			country: e.target[1].value,
			profilePicture: e.target[2].value,
    	}

	    post('/user/update/' + userId, updatedProfile)
	      	.catch(err => console.error(err))
	      	.then(res => res.json())
	      	.then(updatedProfile => console.log(updatedProfile))
	      	//.then(updatedProfile => this.props.history.push('/' + updatedProfile.username));
	}
	    

	render() {
		const { user } = this.state;

		if(user) {
			return(
				<div className="container60">
					<button type="button" onClick={this.handleTest}>test</button>

					<form className="edit-form" onSubmit={this.handleSubmit} >	
						Edit { user.username }'s profile

						<div className="section-small">
							<input className="styledInput" onChange={this.handleChange} name='description' value={user.description} />
						</div>
						<div className="section-small">
							<input className="styledInput" onChange={this.handleChange} name='country' value={user.country} />
						</div>
						<div className="section-small">
							<input className="styledInput" onChange={this.handleChange} name='profilePicture' value={user.profilePicture} />
						</div>

						<button type="submit">submit</button>
					</form>

				</div>	
			)
		} else {
			return(
				<div>It seems that you are not logged in. If you are logged in, try relogging.(no token)<button type="button" onClick={this.handleTest}>test</button></div>
			);
		}
	};
};

export default ProfileEdit