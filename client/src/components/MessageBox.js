import React, { Component } from 'react';
import './css/MessageBox.css';

const MessageBox = (props) => {
    const { msg, activeTab, onClick, activeMsg, handleSubmit } = props;

    if (activeMsg === msg._id) {
        return (
            <div onClick={ (e) => onClick(e, msg) } className={ "msg-box msg-box-active" }>
                <div className="msg-box-name">{ activeTab === "inbox" ? "from " + msg.author.username : "to " + msg.recipient.username }</div>
                <small className="msg-box-date"> { msg.updatedAt.slice(0, 16) }</small>
                <div className="msg-box-text">{ msg.text }
                
                { activeTab !== "outbox" ?    
                    <form onSubmit={ (e) => handleSubmit(e, msg) }>
                        <textarea />
                        <button type="submit">Submit</button>
                    </form>
                : null }

                </div>
            </div>
        );
    } else {
        return (
            <div onClick={ (e) => onClick(e, msg) } className={ msg.new ? "msg-box msg-box-new" : "msg-box" }>
                <div className="msg-box-name">{ activeTab === "inbox" ? "from " + msg.author.username : "to " + msg.recipient.username }</div>
                <small className="msg-box-date"> { msg.updatedAt.slice(0, 16) }</small>
                <div className="msg-box-text">{ msg.text }
                    
                    <form onSubmit={ (e) => handleSubmit(e, msg) }>
                        <textarea />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default MessageBox;