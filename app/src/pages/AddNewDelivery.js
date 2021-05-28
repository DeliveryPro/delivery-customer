import React, { useState } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid, Platform, ToastAndroid } from 'react-native'
import Input from '../components/Input'
import { UNDERLAY_COLOR } from '../constants/colors'
import Geolocation from 'react-native-geolocation-service'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveryCreationStateSelector } from '../redux/selectors/delivery-selector'
import { createNewDeliveryAction } from '../redux/actions/delivery-action'
import { getUserIdSelector } from '../redux/selectors/user-selector'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    titleText: {
        fontSize: 30,
    },
    deliveryInfoContainer: {
        display: 'flex',
        backgroundColor: UNDERLAY_COLOR,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const DELIVERY_FIELDS = {
    ADDRESS: {
        name: 'address',
        placeholder: 'Address',
    },
    RECEIVER: {
        name: 'receiver',
        placeholder: 'Receiver',
    },
    DESCRIPTION: {
        name: 'description',
        placeholder: 'Description',
    },
}

const AddNewDelivery = ({ navigation, route }) => {
    const [data, setData] = useState({})
    const classes = useStyles()

    const onChange = (field) => (value) => {
        const d = { ...data }
        d[field] = value
        setData(d)
    }

    const uid = useSelector(getUserIdSelector)
    const deliveryState = useSelector(getDeliveryCreationStateSelector)

    const dispatch = useDispatch()

    const getUserLocation = () =>
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                return position
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )

    const isUserHasLocationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 23) return true

        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

        if (hasPermission) return true

        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG)
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG)
        }
        return false
    }

    const onSubmit = async () => {
        const position = isUserHasLocationPermission() && await getUserLocation()
        dispatch(createNewDeliveryAction(uid, { ...data, position }))
    }

    return (
        <View style={classes.root}>
            <View style={classes.titleContainer}>
                <Text style={classes.titleText}>Add new delivery</Text>
            </View>
            <View style={classes.deliveryInfoContainer}>
                <Input
                    placeholder={DELIVERY_FIELDS.ADDRESS.placeholder}
                    value={data[DELIVERY_FIELDS.ADDRESS.name]}
                    onChange={onChange(DELIVERY_FIELDS.ADDRESS.name)}
                />
                <Input
                    placeholder={DELIVERY_FIELDS.RECEIVER.placeholder}
                    value={data[DELIVERY_FIELDS.RECEIVER.name]}
                    onChange={onChange(DELIVERY_FIELDS.RECEIVER.name)}
                />
                <Input
                    placeholder={DELIVERY_FIELDS.DESCRIPTION.placeholder}
                    value={data[DELIVERY_FIELDS.DESCRIPTION.name]}
                    onChange={onChange(DELIVERY_FIELDS.DESCRIPTION.name)}
                />
            </View>
            <View style={classes.buttonContainer}>
                <Button onPress={onSubmit}>Submit</Button>
            </View>
        </View>
    )
}

export default AddNewDelivery
