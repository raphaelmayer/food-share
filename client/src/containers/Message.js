import React, { Component } from 'react';
import './css/Message.css';

import { getMessages, getConversations } from '../services/message.service';

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = { conversations: null };
	}

	componentDidMount() {
        getConversations()
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ conversations: data })
        })
    }

    handleChange(e) {}

    handleSubmit(e) {}

    handleDelete(e) {}
	    

	render() {
		return(
			<div className="container60">
                <div>
                    <div>Conversation with Tim</div>
                    <div>Conversation with Heinz ONline</div>
                </div>
			</div>	
		)
	}
}

export default Message;