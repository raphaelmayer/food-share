// not in use
import io from 'socket.io-client';

const socket = io("localhost:3001");

socket.on('RECEIVE_MESSAGE', (data) => {
  addMessage(data);
})

const addMessage = (data) => {
    console.log(data);
    console.log(this.state.messages);
}

export function sendMessage(username, message) {
    socket.emit('SEND_MESSAGE', {
        author: username,
        message: message
    });
}