import React, { Component } from 'react';
import './css/ProfileEdit.css';

import { getToken } from '../helpers/token';
import { getUser, updateUser } from '../services/user.service';

class ProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const userId = getToken().user._id; 
		console.log(userId)

		getUser(userId)
		.then(user => this.setState({ user: user }))
    }

    handleChange(e) {
    	let newUserState = { ...this.state.user };
    	newUserState[e.target.name] = e.target.value;
    	this.setState({ user: newUserState });
    }

    handleSubmit(e) {
    	e.preventDefault();
    	updateUser(e.target);
	}

	render() {
		const { user } = this.state;

		if(user) {
			return(
				<div className="container60">
					<button type="button" onClick={this.handleTest}>test</button>

					<form className="edit-form" onSubmit={this.handleSubmit} >	
						<h2>Edit { user.username }'s profile</h2>

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