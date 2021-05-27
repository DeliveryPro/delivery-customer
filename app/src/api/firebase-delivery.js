import database from '@react-native-firebase/database'

class DeliveryApi {
    addAnswer = (userId, data) => {
        database().ref(`delivery/${userId}`).push(data)
    }
}

export default new DeliveryApi()
