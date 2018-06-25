import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRequest, getSuccess, getFailure } from '../_actions/client.actions';

import GigCard from '../components/GigCard';
import './css/find.css';

const filterOptions = [
	[
	"Category",
	"Fruits and Vegetables",
	"Meat and Fish",
	"Egg and Milk Products",
	"Bread",
	"Sweets and Snacks",
	"Frozen Food",
	"Beverages",
	"Others",
	], [
	"Tags",
	"vegan",
	"swag",
	], [
	"Max Distance",
	], [
	"Sort",
	"Distance",
	"Date of Expiry",
	]
]
class Find extends Component {
	constructor(props) {
		super(props);
		this.state = { gigs: undefined, filter: undefined };	
		this.handleSearch = this.handleSearch.bind(this);
		this.handleTest = this.handleTest.bind(this);
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
		const fd = e.target; // fd = formdata
		const category = fd[0].value === "Category" ? "" : "&category=" + fd[0].value;
		const tags = fd[1].value === "Tags" ? "" : "&tags=" + fd[1].value;
		const distance = fd[2].value === "Max Distance" ? "" : "&distance=" + fd[2].value;
		const sort = fd[3].value === "Sort" ? "" : "&sort=" + fd[3].value;
		
		const query = fd[4].value || null + "?" + category.toLowerCase() + tags + distance + sort;
			
		fetch('http://localhost:3001/api/search/' + encodeURI(query))
			.then(res => res.json())
			.then(gigs => this.setState({ gigs: gigs }))
	}
	handleTest() {
		console.log(this.state)
	}

	render() {
		const Filter = () => {
			return(
				<div className="filter-container">
					{ filterOptions.map(arr => 
						<select>
							{ arr.map(str => <option>{ str }</option>) }
						</select>) 
					}
					
				</div>
			)
		}	

		if(this.props.client.isLoading) {
			return( <h1 className="loading-screen">loading...</h1> )
		} 

		return(
			<div className="container">
			<button onClick={ this.handleTest }>test</button>

			<form onSubmit={this.handleSearch}>
				<Filter />

				<div className="head">
					<h1>What do you need today?{ this.props.client.isLoading }</h1>
					<div className="big-search-form">
						<input className="big-search-bar" type="text" placeholder="Find Services" />
						<button className="big-search-submit" type="submit"><i className="fas fa-search"></i></button>
					</div>
				</div>
			</form>

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