import React, { Component } from 'react';
import io from 'socket.io-client';
// import '../services/chat.service';
import './css/Chat.css';

import { getToken } from '../services/auth.service';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        message: '',
        messages: []
    };

    this.socket = io("localhost:3001", { query: { token: getToken().token } });

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    })

    const addMessage = (data) => {
      console.log(data);
      this.setState({ messages: [ ...this.state.messages, data ] });
      console.log(this.state.messages);
    }

    this.sendMessage = (e) => {
      e.preventDefault();
      // get recipient
      this.socket.emit('SEND_MESSAGE', {
          // author: token.username, // gets appended on server from a valid jwt
          // recipient: this.state.profile._id (wenn als btn in Gig / Profile)
          message: this.state.message
      });
      this.setState({ message: '' });
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="todelete"><h1>to delete</h1>
      <div className="chat">
        <div className="messages">
          {this.state.messages.map(message => {
              return (
                  <div><span>{ message.author }:</span> { message.message }</div>
              )
          })}
        </div>

        <form onSubmit={ this.sendMessage }>
          <input type="text" placeholder="Message" className="form-control" value={ this.state.message } onChange={ e => this.setState({ message: e.target.value }) }/>
          <button type="submit" className="btn btn-primary form-control">Send</button>
        </form>
      </div>
      </div>
    );
  }
}

export default Chat;