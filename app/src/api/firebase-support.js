import database from '@react-native-firebase/database'
class SupportApi {
	createNew = (data) => database().ref(`support`).push(data)
}
export default new SupportApi()
