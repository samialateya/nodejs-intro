//catch http library
const http = require('http');
//get users controller
const UsersController = require('./controllers/UsersController');
//create a server
const server = http.createServer((req, res) => {
	//*define routes
	//?get users
	if (req.url === '/users' && req.method === 'GET') {
		UsersController.index(req, res);
	}
	//?get user with id
	else if (req.url.match(/\/users\/\d+/) && req.method === 'GET') {
		UsersController.show(req, res);
	}
	//?create new user
	else if (req.url === '/users' && req.method === 'POST') {
		UsersController.create(req, res);
	}
	//!not fond route
	else {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 404;
		res.end(JSON.stringify({ error: 'Route not found' }));
	}
});

//start server on port 3000
server.listen(3000, () => {
	console.log('Server started on port 3000');
});