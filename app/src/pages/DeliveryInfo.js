import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { MAP } from '../constants/pages'
import STATUSES from '../constants/statuses'
import { subscribeToCourierPositionAction } from '../redux/actions/delivery-action'
import { getPackageDataStateSelector } from '../redux/selectors/delivery-selector'
import QRCode from 'react-native-qrcode-svg'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: 10,
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 10,
		marginTop: 0,
		borderBottomWidth: 1,
	},
	textTitle: {
		fontWeight: 'bold',
		fontSize: 23,
		marginRight: 10,
		minWidth: 55,
	},
	text: {
		fontSize: 23,
		marginRight: 10,
	},
	textSmall: {
		fontSize: 18,
		marginRight: 10,
	},

	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	qrCodeContainer: {
		alignSelf: 'center',
	},
}))

const DeliveryInfo = ({ navigation }) => {
	const { data, isLoading } = useSelector(getPackageDataStateSelector)

	const dispatch = useDispatch()
	const classes = useStyles()
	const { id, address_from, address_to, status, receiver, sender, courierId } = data || {}

	if (isLoading)
		return (
			<View>
				<Text>...loading</Text>
			</View>
		)

	const toPage = (page) => navigation.navigate(page)

	const toMap = () => {
		dispatch(subscribeToCourierPositionAction(courierId))
		toPage(MAP)
	}

	return (
		<View style={classes.root}>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>Id</Text>
				<Text style={classes.textSmall}>{id}</Text>
			</View>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>From</Text>
				<Text style={classes.textSmall}>{address_from?.details?.formatted_address}</Text>
			</View>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>To</Text>
				<Text style={classes.textSmall}>{address_to?.details?.formatted_address}</Text>
			</View>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>Status</Text>
				<Text style={classes.text}>{status}</Text>
			</View>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>Receiver</Text>
				<Text style={classes.text}>{receiver?.name}</Text>
			</View>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>Sender</Text>
				<Text style={classes.text}>{sender?.name}</Text>
			</View>
			<View style={classes.qrCodeContainer}>
				{id && <QRCode value={`package: ${id}`} size={200} logoBackgroundColor="transparent" />}
			</View>
			{status === STATUSES.IN_PROGRESS && (
				<View style={classes.buttonContainer}>
					<Button text="View on map" onPress={toMap} />
				</View>
			)}
		</View>
	)
}

export default DeliveryInfo
