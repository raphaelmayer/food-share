import React, { Component } from 'react';
import './css/footer.css';

class Footer extends Component {
  render() {
    return (
      	<div className="footer">

			<ul>
			<li className="footer-title">About</li>
			<li>Careers</li>
			<li>Press & News</li>
			<li>Partnerships</li>
			<li>Privacy Policy</li>
			<li>Terms of Service</li>
			</ul>
			
			<ul>
			<li className="footer-title">Support</li>
			<li>Contact Support</li>
			<li>Help & Education</li>
			<li>Trust & Safety</li>
			<li>Selling on Fiverr</li>
			<li>Buying on Fiverr</li>
			</ul>
			
			<ul>
			<li className="footer-title">Community</li>
			<li>Blog</li>
			<li>Forum</li>
			<li>Podcast</li>
			<li>Affiliates</li>
			<li>Invite a Friend</li>
			</ul>
			
			<ul>
			<li className="footer-title">For Freelancers</li>
			<li>Become a Seller</li>
			<li>Fiverr Pro</li>
			<li>AND CO</li>
			<li>Free Invoice Software</li>
			</ul>

      	</div>
    );
  }
}

export default Footer;
