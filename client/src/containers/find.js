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
					<input type="text" placeholder="What service do you need?" />
					<input type="text" placeholder="What is your budget?" />
					<div className="categories-box">
						<div className="categories-btn">category 1</div>
						<div className="categories-btn">category 2</div>
						<div className="categories-btn">category 3</div>
						<div className="categories-btn">category 4</div>
						<div className="categories-btn">category 5</div>
						<div className="categories-btn">category 6</div>
						<div className="categories-btn">category 7</div>
						<div className="categories-btn">category 8</div>
					</div>
				</div>
			)
		}	

		if(this.props.client.isLoading) {
			return( <h1 className="loading-screen">loading...</h1> )
		} 

		return(
			<div className="container">
				<div className="head">
					<h1>What do you need today?{ this.props.client.isLoading }</h1>
					<form className="big-search-form" onSubmit={this.handleSearch}>
						<input className="big-search-bar" type="text" placeholder="Find Services" />
						<button className="big-search-submit" type="submit"><i className="fas fa-search"></i></button>
					</form>
				</div>

				<div className="container70 grid">
					<div className="find-filter">filter</div>

					<div className="card-container">
						{this.state.gigs ? this.state.gigs.map((props, i) => { return( <GigCard {...props} key={i} /> ); }) : null}
					</div>

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