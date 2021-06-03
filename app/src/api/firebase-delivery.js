import database from '@react-native-firebase/database'

class DeliveryApi {
	createNew = (data) => database().ref(`delivery`).push(data)

	getList = (userId) =>
		database()
			.ref(`users/${userId}/delivery`)
			.once('value')
			.then((data) => data.val())

	subscribeOnChange = (userId, cb) =>
		database()
			.ref(`users/${userId}/delivery`)
			.on('child_changed', (data) => cb({ [data.key]: data.val() }))

	subscribeOnAdd = (userId, cb) =>
		database()
			.ref(`users/${userId}/delivery`)
			.on('child_added', (data) => cb({ [data.key]: data.val() }))

	getPackageData = (packageId) =>
		database()
			.ref(`delivery`)
			.child(packageId)
			.once('value')
			.then((data) => ({ id: packageId, ...data.val() }))
	subscribeToCourierPosition = (courierId, cb) =>
		database()
			.ref(`couriers/${courierId}`)
			.child('coords')
			.on('value', (data) => cb({ ...data.val(), courierId }))

	cancelSubscribeToCourierPosition = (courierId) =>
		database()
			.ref(`couriers/${courierId}`)
			.child('coords')
			.off('value')
}

export default new DeliveryApi()
