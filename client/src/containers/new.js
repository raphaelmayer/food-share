import React, { Component } from 'react';
import './css/new.css';

import { createGig } from '../services/gig.service';

class New extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    createGig(e.target);
  }
  
  render() {
    return (
      <div className="container">
        <div className="container60">
          <h2>New Gig</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="section-small">
              <h4>Enter a title for your gig, like: "I make beautiful wedding photos!" (max. 50 characters).</h4>
              <input className="styledInput" placeholder="title" type="input" maxLength="50" required />
            </div>
            
            <div className="section-small">
              <h4>Describe your gig. Be as detailed as possible and try to answer the most common questions as best as possible.</h4>
              <textarea className="styledInput" placeholder="description" type="input" length="400px" required />
            </div>
            
            <div className="section-small">
              <h4>Date Of Expiry (Format: Day . Month . Year)</h4>
              <input className="styledInput" placeholder="dateOfExpiry" type="date" length="400px" required />
            </div>
            
            <div className="section-small">
              <h4>Enter a location where users can collect the food (max. 50 characters).</h4>
              <input className="styledInput" placeholder="location" type="input" maxLength="50" required />
            </div>
            
            <div className="section-small">
              <h4>Set up to 15 tags to optimize your chances of being found by search (Hint: Try to be specific about what it is you sell.).</h4>
              <input className="styledInput" placeholder="tags" type="text" multiple />
            </div>
            
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default New;
