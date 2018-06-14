import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './css/profile.css';

import * as authActions from '../_actions/auth.actions';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		const email = e.target[0].value;
		const username = e.target[1].value;
		const password = e.target[2].value;
		//const password-check = e.target[3].value;

		const { dispatch } = this.props;
		dispatch(authActions.register(username, email, password));
	}

	render() {
		console.log(this.props)
		return(
			<div className="container">
				<form className="auth-form" onSubmit={this.handleSubmit}>
					<h1>Register</h1>
					<input type="email" name="email" placeholder="Enter your e-mail" />
					<input type="username" name="username" placeholder="Enter your username" />
					<input type="password" name="password" placeholder="Enter your password" />
					<input type="password" name="password-check" placeholder="Enter your password again" />
					<input type="submit" />
				</form>
			</div>
		);
	};
};

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Register);
export { connectedRegisterPage as Register }; 