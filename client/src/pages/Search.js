import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequest, getSuccess, getFailure } from '../_actions/client.actions';
import filterOptions from '../helpers/filterOptions';

import GigCard from '../components/GigCard';
import { searchGigs } from '../services/client.service';
import './css/Search.css';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = { gigs: undefined, filterMenu: false, tags: [] };	
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
		searchGigs(e.target, this.state.tags)
		.catch(err => console.error(err))
		.then(res => res.json())
		.then(d => this.setState({ gigs: d }))
	}
	toggleFilterMenu(e) {
		this.state.filterMenu ? this.setState({ filterMenu: false }) : this.setState({ filterMenu: true });
	}
	toggleTag(e) {
		const newTag = e.target.innerHTML;
		const tags = this.state.tags;

		if (tags.indexOf(newTag) < 0) {
			tags.push(newTag);
			this.setState({ tags: tags })
		} else if (tags.indexOf(newTag) >= 0) {
			tags.splice(tags.indexOf(newTag), 1);
			this.setState({ tags: tags })
		}
	}
	handleTest() {
		console.log(this.state)
	}

	render() {	
		const FilterMenu = (props) => {
			if (props.filterMenu) {
				return (
					<div className="filter-menu filter-menu-open">
						<small className="big-search-more" onClick={ props.toggleFilterMenu }>less . . .</small>
						<br/><em>selecting more than one tag at once is possible but will lead to unintended behaviour <strong>({ props.tags.join(", ") || "no active tag" })</strong></em><br/>
						<div className="filter-menu-box">
							{ filterOptions[1].map((d, i) => {
								return (
									<div className="filter-menu-circle" onClick={ props.toggleTag }>
										<div>{ filterOptions[1][i] }</div>
										<i className="fas fa-leaf"></i>
									</div>
								);
							})}
						</div>
						<div>
							<fieldset className="filter-menu-max-d">
							    <legend>Set a Maximum Distance</legend>
							    <label for="volume">1 km</label>
							    <input type="range" id="start" name="volume" min="1" max="1000" />
							    <label for="volume">1000 km</label>
							</fieldset>
						</div>
					</div>
				);
			} else {
				return (
					<div className="filter-menu">
						<small className="big-search-more" onClick={ props.toggleFilterMenu }>more . . .</small>
					</div>
				);
			}
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
							{ filterOptions[0].map((str, i) => <option value={ str.value } key={i}>{ str.text }</option>) }
						</select>
						<input className="big-search-bar" type="text" placeholder="Find Services" />
						<button className="big-search-submit" type="submit"><i className="fas fa-search"></i></button>
					</form>
					<br/>
					<em>Search Results: { this.state.gigs ? this.state.gigs.length : 0 }</em>
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

const connectedSearchPage = connect(mapStateToProps)(Search);
export { connectedSearchPage as Search }; 