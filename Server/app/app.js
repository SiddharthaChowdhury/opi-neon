const express 	= require('express'),
app				= express(),
router			= express.Router(),
http			= require('http'),
server			= http.createServer(app),
path			= require('path');

require('./conf/sys.middleware.js')(router,app); // set up middleware

const mongoose = require('mongoose');

var mongoConfig = {
	username: 'Austin4Silvers',
	password: 'Pa22w0rd',
	host: '',
	port: '',
	database: 'review-work'
};
var uri = 'mongodb://' + mongoConfig.username + ':' + mongoConfig.password + '@ds161710.mlab.com:61710/'+mongoConfig.database;

mongoose.Promise = global.Promise;
console.log('\n'+'\x1b[33m%s\x1b[0m: ','Checking for database connectivity..')
mongoose.connect(uri, {}, function(err) {
	if(err){
		console.log("\n","\x1b[31m"," > Database connectivity failed: "+(err.errmsg == undefined ? err : err.errmsg ),"\x1b[0m" );
	}else{
		console.log(" > Database connected successfully!");
		let p1 = new Promise((resolve, reject) => {
			console.log('\n'+'\x1b[33m%s\x1b[0m: ','Firing up the server..')
			var port = parseInt(process.env.PORT || '1337')
			app.set('port', port);
			server.listen(port);

			server.on('listening', resolve());
			server.on('error', reject());
		}).then(()=>{
			var addr = server.address();
			var bind = typeof addr === 'string'
				? 'pipe-' + addr
				: addr.port;
			console.log( '\x1b[33m%s\x1b[0m: ', '\n PORT' ,"\x1b[36m", bind, "\n","\x1b[31m", "\n Press \'<Ctrl> + c\' to exit \n", "\x1b[35m", "\x1b[0m");
			// Server is started
		}).catch(()=>{
			console.log("\n","\x1b[31m");
			if (error.syscall !== 'listen'){throw error;}
			var bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port;
			switch (error.code) {
				case 'EACCES':
					  console.error(bind + ' requires elevated privileges.');
					  process.exit(1);
					  break;
				case 'EADDRINUSE':
					  console.error(bind + ' is already in use.');
					  process.exit(1);
					  break;
				default:
					  throw error;
			}
			console.log("\x1b[0m");
		});
	}
});