const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/main');
const router = require('./router/index');
const socketIO = require('./socketIO');

mongoose.connect(config.database);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', '*');
 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshtoken, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
  	next();
});

router(app);

const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

// playing around with sockets
// socketIO(server);