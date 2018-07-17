import post from '../helpers/post';
import authHeader from '../helpers/auth-header';

export function getMessages(ownerId) {
    fetch('/api/message/get', { headers: authHeader() })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(data => console.log(data))
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