import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRequest, getSuccess, getFailure } from '../_actions/client.actions';

import GigCard from '../components/GigCard';
import './css/find.css';

class Find extends Component {
	constructor(props) {
		super(props);
		this.state = { gigs: undefined };	
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getRequest());
      	fetch('http://localhost:3001/api/getgigs') //
      		.then(res => res.json())
      		.then(gigs => this.setState({ gigs: gigs }))
      		.catch(err => dispatch(getFailure(err)))
      		.then(dispatch(getSuccess()))
	}

	handleSearch(e) {
		e.preventDefault();
		console.log(e.target[0].value);
		//fetch('http://localhost:3001/api/.........')
			//.then(res => res.json())
			//.then(gigs => this.setState({ gigs: gigs }))
	}

	render() {
		const Filter = () => {
			return(
				<div className="filter-container">
					<div>
						<div><strong>kind of food </strong></div>
						<div>fruit</div>
						<div>vegetables</div>
						<div>meat</div>
						<div>sweets</div>
						<div>non alcoholic beverages</div>
						<div>alcohol</div>
						<div>other</div>
					</div>
					<div>
						<div><strong>date of expiry</strong></div>
						<div>over DoE</div>
						<div>less than a week</div>
						<div>more than a week</div>
					</div>
					<div>
						<div><strong>Max Distance</strong></div>
						<div>0 - 1000 km</div>
					</div>
				</div>
			)
		}	

		if(this.props.client.isLoading) {
			return( <h1 className="loading-screen">loading...</h1> )
		} 

		return(
			<div className="container">
				<Filter />

				<div className="head">
					<h1>What do you need today?{ this.props.client.isLoading }</h1>
					<form className="big-search-form" onSubmit={this.handleSearch}>
						<input className="big-search-bar" type="text" placeholder="Find Services" />
						<button className="big-search-submit" type="submit"><i className="fas fa-search"></i></button>
					</form>
				</div>

				<div className="card-container">
					{this.state.gigs ? this.state.gigs.map((props, i) => { return( <GigCard {...props} key={i} /> ); }) : null}
				</div>
			</div>
		);
	};
};

function mapStateToProps(state) {
    const { auth, client } = state;
    return {
        auth,
        client
    };
}

const connectedFindPage = connect(mapStateToProps)(Find);
export { connectedFindPage as Find }; 