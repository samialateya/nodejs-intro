//import file system module
const { readFile, writeFile } = require('fs').promises;

class UserModel {
	#usersList = [];
	#usersFile = './data/users.json';

	readUsers() {
		return new Promise(async(resolve, reject) => {
			try {
				const usersData = await readFile(this.#usersFile, 'utf8');
				this.#usersList = JSON.parse(usersData);
				resolve(this.#usersList);
			}
			catch (err) {
				reject(err);
			}
		});
	}

	writeUsers(usersList) {
		return new Promise(async(resolve, reject) => {
			try {
				const usersData = JSON.stringify(usersList);
				await writeFile(this.#usersFile, usersData);
				resolve();
			}
			catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = UserModel;