import React, { Component } from 'react';
import './css/Messages.css';

import MessageBox from '../components/MessageBox';

import { getInbox, getOutbox, updateReadStatus, sendMessage } from '../services/message.service';

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: null, activeTab: "inbox", activeMsg: null };

        this.handleActiveTab = this.handleActiveTab.bind(this);
        this.handleActiveMessage = this.handleActiveMessage.bind(this);
        this.handleTest = this.handleTest.bind(this);
	}

    componentDidMount() {
        getInbox()
        .then(data => {
            console.log(data);
            this.setState({ messages: data })
        })
    }

    handleActiveTab(e) {
        const activeTab = e.target.attributes.props.value;
        console.log(activeTab)
        this.setState({ activeTab: e.target.innerHTML.toLowerCase() })
        
        switch(activeTab) {
            case "inbox":
                getInbox()
                .then( data => this.setState({ messages: data }) );
                break;

            case "outbox":
                getOutbox()
                .then( data => this.setState({ messages: data }) );
                break;

            default: console.error("handleActiveTab default case");
        }
    }

    handleActiveMessage(e, msg) {
        updateReadStatus(msg);
        this.setState({ activeMsg: msg._id });
    }

    handleSubmit(e, msg) {
        e.preventDefault();
        const recipient = { username: msg.author.username, id: msg.author.id };
        // const recipient = (msg) => {
        //     if (this.state.activeTab === "inbox") return { username: msg.author.username, id: msg.author.id }
        //     else return { username: msg.recipient.username, id: msg.recipient.id }
        // }
        sendMessage(e.target, recipient);
    }

    handleTest(e) { console.log(this.state) }
	    

	render() {
        const { messages, activeTab, activeMsg } = this.state;
		return(
			<div className="container60">
            <button onClick={this.handleTest}>test</button>
                <div className="msgs-select">
                    <div className={ activeTab === "inbox" ? "msgs-select-active" : null } props="inbox" onClick={ this.handleActiveTab }>Inbox</div>
                    <div className={ activeTab === "outbox" ? "msgs-select-active" : null } props="outbox" onClick={ this.handleActiveTab }>Outbox</div>
                </div>    
                <div className="messages-container">
                {
                    Array.isArray(messages) ? messages.map((msg, i) => <MessageBox msg={ msg } activeTab={ activeTab } activeMsg={ activeMsg } onClick={ this.handleActiveMessage } handleSubmit={ this.handleSubmit } key={i} />) : "No messages yet"
                }
                </div>
			</div>	
		)
	}
}

export default Message;