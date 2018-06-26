module.exports = function(router, app){

	var hosts = ['http://localhost:8080'].join(', ');

	router.use((req, res, next) => {
		res.header('access-control-allow-origin', hosts);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
		res.header('Access-Control-Max-Age', 1728000);
		// if (req.method === 'OPTIONS') {
			// return res.json({ status: 0, message: '', payload: null })
		// }
		next();
	});

	const bodyParser = require('body-parser');
	app.use(bodyParser.json({limit: '2mb'}));                           // 2mb file upload limit
	app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));     // 2mb file upload limit
	
	const routes = require('../route')(router, require('./sys.bundle').controllers());
	app.use('/', routes);
}