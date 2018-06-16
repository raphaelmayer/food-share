import React from 'react';
import { Link } from 'react-router-dom';
import './css/ProfileHead.css'

const ProfileHead = (props) => {
  console.log("profileh.props", props)
  return(
    <div className="profileHead">
      
      <div className="profileHead-picture" style={{ backgroundImage: "url(" + props.profilePicture + ")" }}></div>
      <Link to={ "/" + props.username }><h4>{ props.username }</h4></Link>
      <p>{ props.title }</p>
      
      <div className="profileHead-rating-box">
        <div>
          <i className={ props.stats.rating<=0 ? "far fa-star" : "fas fa-star" }></i>
          <i className={ props.stats.rating<1.9 ? "far fa-star" : "fas fa-star" }></i>
          <i className={ props.stats.rating<2.9 ? "far fa-star" : "fas fa-star" }></i>
          <i className={ props.stats.rating<3.9 ? "far fa-star" : "fas fa-star" }></i>
          <i className={ props.stats.rating>4.9 ? "fas fa-star" : "far fa-star" }></i>
        </div>
        <div>{ props.stats.rating }</div>
        <div className="grey">({ props.stats.reviewCount })</div>
      </div>
      
      { props.isProfile ? 
      <table className="profileHead-info">
        <tbody>
          <tr><td><i className="fas fa-map"></i> from</td><td>{ props.country }</td></tr>
          <tr><td><i className="fas fa-user"></i> Member since</td><td>{ props.timestamp }</td></tr>
        </tbody>
      </table>
      :
      null }

    </div>
  )
}

export default ProfileHead;

/*
username
profile-picture
profile-title
total rating
total reviewCount
---
profile.country
*/