import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import Tabs from '../components/Tabs'
import { QR_CODE_SCANNER } from '../constants/pages'
// import QRCode from 'react-native-qrcode-scanner'

import QRCode from 'react-native-qrcode-svg'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDataSelector, getUserIdSelector } from '../redux/selectors/user-selector'
import { getUserDataAction } from '../redux/actions/user-action'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		position: 'relative',
		padding: 10,
	},
	qrCodeContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	textTitle: {
		fontWeight: 'bold',
		fontSize: 25,
	},
	textItem: {
		margin: 3,
	},
	text: {
		fontSize: 18,
	},
}))

const QRCodeScanner = (props) => {
	const classes = useStyles()

	const dispatch = useDispatch()
	const uid = useSelector(getUserIdSelector)

	const userData = useSelector(getUserDataSelector)

	const { email, name } = userData || {}

	useEffect(() => {
		!Object.keys(userData).length && dispatch(getUserDataAction(uid))
	}, [userData])
	console.log(`userData`, userData)

	return (
		<View style={classes.root}>
			<View style={classes.textContainer}>
				<Text style={classes.textTitle}>User Info</Text>
				<View style={classes.textItem}>
					<Text style={classes.text}>User ID:</Text>
					<Text>{uid}</Text>
				</View>
				<View style={classes.textItem}>
					<Text style={classes.text}>Email:</Text>
					<Text>{email}</Text>
				</View>
				<View style={classes.textItem}>
					<Text style={classes.text}>Name:</Text>
					<Text>{name}</Text>
				</View>
			</View>
			<View style={classes.qrCodeContainer}>
				{uid && <QRCode value={uid} size={200} logoBackgroundColor="transparent" />}
			</View>

			<Tabs activeScreen={QR_CODE_SCANNER} {...props} />
		</View>
	)
}

export default QRCodeScanner
