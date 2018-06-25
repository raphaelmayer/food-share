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
		this.state = { gigs: undefined, filter: undefined, tags: [] };	
		this.handleSearch = this.handleSearch.bind(this);
		this.toggleFilterMenu = this.toggleFilterMenu.bind(this);
		this.toggleTag = this.toggleTag.bind(this);
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
		const input = fd[1].value || null;
		const tags = this.state.tags == [] ? "" : "&tags=" + this.state.tags.join("+");
		
		const query = input + "?" + category.toLowerCase() + tags.toLowerCase();
console.log(query)
		fetch('http://localhost:3001/api/search/' + encodeURI(query))
			.then(res => res.json())
			.then(gigs => this.setState({ gigs: gigs }))
	}
	toggleFilterMenu(e) {
		this.state.filterMenu ? this.setState({ filterMenu: false }) : this.setState({ filterMenu: true });
	}
	toggleTag(e) {
		const newTag = e.target.innerHTML;
		const tags = this.state.tags;
		console.log(newTag)

		if (tags.indexOf(newTag) < 0) {
			tags.push(newTag);
			console.log(tags);
			this.setState({ tags: tags })
		} else if (tags.indexOf(newTag) >= 0) {
			tags.splice(tags.indexOf(newTag), 1);
			console.log(tags);
			this.setState({ tags: tags })
		}
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
		const FilterMenu = (props) => {
			console.log(props)
			if (props.filterMenu) {
				return (
					<div className="filter-menu filter-menu-open">
						<small className="big-search-more" onClick={ props.toggleFilterMenu }>less . . .</small>
						<br/><em>selecting more than one tag at once is possible but leads to unintended behaviour ({ props.tags.join(", ") || "no active tag" })</em><br/>
						<div className="filter-menu-box">
							<div className="filter-menu-circle" onClick={ props.toggleTag }>
								<div>vegan</div>
								<i className="fas fa-leaf"></i>
							</div>
							<div className="filter-menu-circle" onClick={ props.toggleTag }>
								<div>swag</div>
								<i className="fas fa-leaf"></i>
							</div>
							<div className="filter-menu-circle" onClick={ props.toggleTag }>
								<div>bio</div>
								<i className="fas fa-leaf"></i>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div className="filter-menu">
						<small className="big-search-more" onClick={ props.toggleFilterMenu }>more . . .</small>
					</div>
				);}
		}

		if(this.props.client.isLoading) {
			return( <h1 className="loading-screen">loading...</h1> )
		} 

		return(
			<div className="container">
			<button onClick={ this.handleTest }>test</button>

				<div className="head">
					<h1>What do you need today?{ this.props.client.isLoading }</h1>

					<form className="big-search-form" onSubmit={this.handleSearch}>
						<select>
							{ filterOptions[0].map(str => <option>{ str }</option>) }
						</select>
						<input className="big-search-bar" type="text" placeholder="Find Services" />
						<button className="big-search-submit" type="submit"><i className="fas fa-search"></i></button>
					</form>
					<br/>
					<FilterMenu tags={ this.state.tags } filterMenu={ this.state.filterMenu } toggleFilterMenu={ this.toggleFilterMenu } toggleTag={ this.toggleTag } />
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