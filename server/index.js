const express = require('express'),
				app = express(),
				bodyParser = require('body-parser'),
				logger = require('morgan'),
				mongoose = require('mongoose'),
				config = require('./config/main'),
				router = require('./router/index'),
				socketIO = require('./socketIO');


mongoose.connect(config.database);


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

app.get('/', (req, res) => {
	res.end('Access via ./api/:route')
})


const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

socketIO(server);

router(app);

