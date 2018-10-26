import React, { Component } from 'react';
import './css/Settings.css';
import history from '../helpers/history';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    console.log(token)
  }

  render() {

    return (       
       	<div className="container60">

       	</div>

    );
  }
}

export default Settings;
