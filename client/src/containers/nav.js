import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './css/nav.css';

import { logout } from '../_actions/auth.actions';

import { store } from '../helpers/store';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userMenu: false,
		}
		this.openUserMenu = this.openUserMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
	}
  
	openUserMenu() {
    console.log(store.getState())
		this.state.userMenu ? this.setState({ userMenu: false }) : this.setState({ userMenu: true });
	}

  handleLogout() {
    this.props.dispatch(logout());
    this.setState({ userMenu: false });
  }
  
  	render() {
  		const UserMenu = (props) => {
  			return(
  				<div className="userMenu">
            <div><Link to={"/" + props.user} onClick={ () => this.setState({ userMenu: false }) }>{props.user}</Link></div>
            <div><Link to={"/editprofile"} onClick={ () => this.setState({ userMenu: false }) }>Edit Profile</Link></div>
            <div><Link to="/settings" onClick={() => this.setState({ userMenu: false })}>Settings</Link></div>
  					<div onClick={this.handleLogout}>Logout</div>
          </div>
  			);
  		}

    	return (
      		<nav>
            <div className="nav-left">
              <Link to="/" className="logo">FoodShare</Link>
            </div>
  
            <div className="nav-right">

      		  	{ this.state.userMenu ? <UserMenu user={this.props.auth.user || 'Login'} /> : null }
        	 	  
              <div className="nav-btns">
                <Link to="/search" className="nav-btn"><i className="fas fa-search"></i></Link>
                <Link to="/new" className="nav-btn"><i className="fas fa-plus"></i></Link>
            		<Link to="/getstarted" className="nav-btn">Get Started</Link>
            		<div className="nav-btn nav-profile-box" onClick={this.openUserMenu}>
            			{this.props.auth.user || 'Login'}
            			<i className="fas fa-user"></i>
            		</div>
        	 	  </div>
            </div>
      		</nav>
    	);
  	};
};

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth,
    };
}

const connectedNav = connect(mapStateToProps)(Nav);
export { connectedNav as Nav }; 
