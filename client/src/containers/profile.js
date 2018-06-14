import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/profile.css';

import GigCard from '../components/GigCard';
import ProfileHead from '../components/ProfileHead';
import EditButton from '../components/EditButton';
import Reviews from '../components/Reviews';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			edit: false
		};
		this.handleTest = this.handleTest.bind(this)
	}

	componentDidMount() {
		let username = window.location.pathname; //.split("").slice(1).join("");
		fetch('http://localhost:3001/api/user/getall' + username)
			.then(res => res.json())
			.then(user => {console.log(user);this.setState({user: user})})
    }

    handleTest(e) {
    	e.preventDefault();
    	console.log(this.state);
    }

	render() {
		const { user, edit } = this.state;
		const portfolioMockUp = ["Project 1", "Project 2", "Project 3"];
		//console.log('from profile:', user)

		if(user) {
			return(
				<div className="container">
					<div>
						<button type="button" onClick={this.handleTest}>test</button>
						<button type="button" onClick={e => alert("Add the feature!")}>add gig</button>
						<EditButton onClick={() => this.setState( edit ? {edit:false}:{edit:true})} user={user.username} />
					</div>
					
					{ edit ? user.gigs.map(gig => <Link to={ 'editgig/' + user.username + '/' + gig._id }>{ gig.title }</Link> ) : null }
					
					<div className="container70 profile-grid">
	
						<ProfileHead isProfile={true} {...user} />
	
						<div className="profile-main">
							<h4>profile-main</h4>
							{ user.gigs.map((gig, i) => <GigCard {...gig} key={i} />) }
						</div>

						<div className="profile-description">
							<h4>profile-description</h4>
							<p>{user.description}</p>
						</div> 
	
						<div className="profile-reviews">
							<h4>profile-reviews</h4>
              				<Reviews user={{ id: user._id, username: user.username }} reviews={ user.reviews } />
						</div>
	
					</div>
				</div>			
			)
		} else {
			return(
				<div>Could not find a user named <q>{ window.location.pathname.slice(1) }</q>.<button type="button" onClick={this.handleTest}></button></div>
			);
		}
	};
};

export default Profile