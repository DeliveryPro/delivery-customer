import database from '@react-native-firebase/database'

class DeliveryApi {
    createNew = (userId, data) => {
        database().ref(`delivery/${userId}`).push(data)
    }
    getList = (userId) =>
        database()
            .ref(`delivery/${userId}`)
            .once('value')
            .then((data) => data.val())

    subscribeOnChange = (userId, cb) =>
        database()
            .ref(`delivery/${userId}`)
            .on('child_changed', (data) => cb({ [data.key]: data.val() }))
}

export default new DeliveryApi()
