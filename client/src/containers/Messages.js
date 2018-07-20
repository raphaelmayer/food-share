import React, { Component } from 'react';
import './css/Messages.css';

import { getMessages, getInbox, getOutbox } from '../services/message.service';

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
        .catch(err => console.error(err))
        .then(res => res.json())
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
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({ messages: data });
                });
                break;
            case "outbox":
                getOutbox()
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({ messages: data });
                });
                break;
            default: console.error("handleActiveTab default case");
        }
    }

    handleActiveMessage(e, id) {
        fetch("http://localhost:3001/api/message/hasBeenRead/" + id)
        .then(res => res.json())
        .then(msg => console.log(msg))  // eventually replace old msg with new one

        const msg = this.state.activeMsg;

        msg === id ? 
        this.setState({ activeMsg: null }) :
        this.setState({ activeMsg: id })
    }


    handleSubmit(e) {}

    handleDelete(e) {}

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
                    messages !== null ? messages.map((msg, i) => <MessageBox msg={ msg } activeTab={ activeTab } activeMsg={ activeMsg } onClick={ this.handleActiveMessage } />) : "No messages yet"
                }
                </div>
			</div>	
		)
	}
}

export default Message;

const MessageBox = (props) => {
    const { msg, activeTab, onClick, activeMsg } = props;
    const isOpen = false;

console.log(props)
if (activeMsg === msg._id) {
    return (
        <div onClick={ (e) => onClick(e, msg._id) } className={ "msg-box msg-box-active" }>
            <div className="msg-box-name">{ activeTab === "inbox" ? "from " + msg.author.username : "to " + msg.recipient.username }</div>
            <small className="msg-box-date"> { msg.updatedAt.slice(0, 16) }</small>
            <div className="msg-box-text">{ msg.text }</div>
        </div>
    );
} else {
    return (
        <div onClick={ (e) => onClick(e, msg._id) } className={ msg.new ? "msg-box msg-box-new" : "msg-box" }>
            <div className="msg-box-name">{ activeTab === "inbox" ? "from " + msg.author.username : "to " + msg.recipient.username }</div>
            <small className="msg-box-date"> { msg.updatedAt.slice(0, 16) }</small>
            <div className="msg-box-text">{ msg.text }</div>
        </div>
    );
}
}