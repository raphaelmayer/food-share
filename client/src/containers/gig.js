import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './css/gig.css';

import { getRequest, getSuccess, getFailure } from '../_actions/client.actions';

import Reviews from '../components/Reviews';
import ProfileHead from '../components/ProfileHead';
import EditButton from '../components/EditButton';

class Gig extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { gigs: [] } }
    
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const url = window.location.pathname.split('/');
    
    dispatch(getRequest());
    fetch('http://localhost:3001/api/user/getall/' + url[1] + '/' + url[2])
      .then(res => res.json())
      .then(user => this.setState({ user: user }))
      .catch(err => dispatch(getFailure(err)))
      .then(dispatch(getSuccess()))
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const { user } = this.state;
    const url = window.location.pathname.split('/');
    const position = user.gigs.map(gig => gig._id).indexOf(decodeURI(url[2]));
    const gig = this.state.user.gigs[position];
  
    if(gig) {
      return (
        <div className="container">
  
        <button onClick={this.handleClick}>test</button>
        <Link to={ '/editgig/' + user.username + '/' + gig._id } >
          <EditButton onClick={ () => console.log('todo') } user={ user.username } />
        </Link>

          <div className="container60 gig-grid">
  
            <div className="gig-main">
              <h3 className="gig-title">{ gig.title }</h3>
              <div className="gig-main-image"></div>
              
              <div className="gig-main-desc">
                <h4>Description</h4>
                <p>{ gig.description }</p>
              </div>
              
              <div className="gig-main-desc">
                <h4>Facts</h4>
                <p>Date of Expiry: { gig.dateOfExpiry }</p>
                <p>Location: { gig.location }</p>
              </div>
            </div>
  
            <div className="gig-reviews">
              <h4>Reviews</h4>
              <Reviews seller={{ id: user._id, username: user.username }} reviews={ user.reviews } />
            </div>       
              
            <div className="gig-location">
              <h4>Location</h4>
            </div>
  
            <ProfileHead isProfile={ false } { ...user } />  
  
          </div>
        </div>
      );
    } else { 
      return (
        <div>No gig found.<button onClick={ this.handleClick }>test</button></div>
      )
    }
  }
}

function mapStateToProps(state) {
    const { auth, client } = state;
    return {
        auth,
        client
    };
}

const connectedGigPage = connect(mapStateToProps)(Gig);
export { connectedGigPage as Gig }; 