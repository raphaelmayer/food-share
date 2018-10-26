import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './css/profile.css';

import * as authActions from '../_actions/auth.actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//console.log('this.props', this.props)
	}
	handleSubmit(e) {
		e.preventDefault();
		const email = e.target[0].value,
			  password = e.target[1].value;
		const { dispatch } = this.props;
		dispatch(authActions.login(email, password))
	}

	render() {
		return(
			<div className="container">
				<form className="auth-form" onSubmit={this.handleSubmit}>
				<h1>Login</h1>
					<input type="email" name="email" placeholder="Enter your e-mail" />
					<input type="password" name="password" placeholder="Enter your password" />
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

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }; 