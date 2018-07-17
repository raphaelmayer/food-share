const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('./config/main');

module.exports = (server) => {

io = socket(server);

io.use((socket, next) => {
	if (socket.handshake.query && socket.handshake.query.token) {
		// remove "JWT " from tokenstring with split()
		jwt.verify(socket.handshake.query.token.split(" ")[1], config.secret, (err, decoded) => {
			console.log('err: ', err)
			if (err) return next(new Error('Authentication Error'));
			console.log("token verified ...");
			socket.decoded = decoded;
			next();
		});

	} else {
		console.log('no token')
		next(new Error('No token'));
	}
});

io.on('connection', (socket) => {
	console.log("new connection: ", socket.id);

  	socket.on('SEND_MESSAGE', (data) => {
  		console.log(data);
  		data.author = socket.decoded.username;
  		
  		io.emit('RECEIVE_MESSAGE', data);
  	})

	socket.on('TEST', handleTest)
	
  	socket.on('disconnect', () => {
  	  	console.log('user disconnected: ', socket.id);
  	  	// handleDisconnect()
  	})

  	socket.on('error', (err) => {
  	  	console.log('received error from socket:', socket.id);
  	  	console.log(err);
  	})
})

}

const handleTest = (data) => {
	console.log("handleTest");

}