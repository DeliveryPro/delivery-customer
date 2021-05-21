import app from './firebase-middleware'

class UsersApi {
	constructor(firebase) {
		this.firebase = firebase
	}

	getUsers = () =>
		this.firebase
			.database()
			.ref(`users`)
			.once('value')
			.then((snapshot) => snapshot.val())

	getUser = (userId) =>
		this.firebase
			.database()
			.ref(`users/${userId}`)
			.once('value')
			.then((snapshot) => snapshot.val())

	addNew = (data) =>
		this.firebase
			.database()
			.ref(`users`)
			.push({ ...data })

	updateUser = (userId, data) => this.firebase.database().ref(`users`).child(userId).update(data)
}

export default new UsersApi(app)
