import post from '../helpers/post';
import history from '../helpers/history';
import authHeader from '../helpers/auth-header';


export function getInbox() {
  return new Promise((resolve, reject) => {
    fetch('/api/message/getInbox', { headers: authHeader() })
      .catch(err => {
        console.error(err);
        reject(err);
      })
      .then(res => res.json())
      .then(data => resolve(data)) 
  })
}

export function getOutbox() {
  return new Promise((resolve, reject) => {
    fetch('/api/message/getOutbox', { headers: authHeader() })
      .catch(err => {
        console.error(err);
        reject(err);
      })
      .then(res => res.json())
      .then(data => resolve(data)) 
  })
}

export function sendMessage(formdata, recipient) {  
  const msg = {
    // author: {}, // gets populated from a validated token on the server
    recipient: recipient,
    text: formdata[0].value,
  }

  post('/message/post', msg)
    .catch(err => console.error(err))
    .then(res => res.json())
    .then(data => {
      console.log(data);
      history.go(history.location.pathname);
    })
}

export const updateReadStatus = (msg) => {
  if (!msg.new) return;

  fetch("http://localhost:3001/api/message/updateReadStatus/" + msg._id)
  .then(res => res.json())
  .then(msg => console.log(msg))  // eventually replace old msg in state with the new one
}