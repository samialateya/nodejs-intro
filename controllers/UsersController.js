//import user model
const UserModel = require('../models/UserModel');

class UsersController {
	//*fetch all users
	static async index(req, res) {
		//catch users list
		const usersList = await (new UserModel()).readUsers();
		//set content type as json
		res.setHeader('Content-Type', 'application/json');
		//return list of users as a json response
		res.end(JSON.stringify(usersList));
	}

	//*fetch user by id
	static async show(req, res) {
		//get user id
		const userId = req.url.match(/\/users\/(\d+)/)[1];
		//catch users list
		const usersList = await (new UserModel()).readUsers();
		//get user by id
		const user = usersList.find(user => user.id === userId);
		//!404 if user not found
		if (!user) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 404;
			res.end(JSON.stringify({ error: 'User not found' }));
		}
		//set content type as json
		res.setHeader('Content-Type', 'application/json');
		//return user as a json response
		res.end(JSON.stringify(user));
	}

	//*create new user
	static async create(req, res) {
		//get user data
		const userData = await (new UserModel()).readUsers();
		//get user id
		const userId = userData.length + 1;
		//get request body
		let body = [];
		req.on('error', (err) => {
			console.error(err);
			//!return server error
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 500;
			res.end(JSON.stringify({ error: 'Server error' }));
		}).on('data', (chunk) => {
			body.push(chunk);
		}).on('end', async () => {
			body = Buffer.concat(body).toString();
			body = JSON.parse(body);
			let user = {};
			//set user id
			user.id = userId;
			//set user name
			user.name = body.name;
			//push user to users list
			userData.push(user);
			//write users list to file
			await (new UserModel()).writeUsers(userData);
			//set content type as json
			res.setHeader('Content-Type', 'application/json');
			//return user as a json response
			res.end(JSON.stringify(user));
		});
	}
}
module.exports = UsersController;