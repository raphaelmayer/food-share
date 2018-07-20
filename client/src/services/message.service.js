import post from '../helpers/post';
import authHeader from '../helpers/auth-header';


export function getInbox() {
    return fetch('/api/message/getInbox', { headers: authHeader() })
}

export function getOutbox() {
    return fetch('/api/message/getOutbox', { headers: authHeader() })
}

export function getMessages(ownerId) {
    return fetch('/api/message/get', { headers: authHeader() })
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
        .then(data => console.log(data))
}

// functions for conversation model; not in use

export function getConversations() {
    return fetch('/api/message/get', { headers: authHeader() })
}