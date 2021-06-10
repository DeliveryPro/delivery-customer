import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Package from '../assets/package.svg'
import { PRIMARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import Minus from '../assets/minus.svg'
import { DELIVERY_INFO } from '../constants/pages'
import { useDispatch } from 'react-redux'
import { getDeliveryDataAction } from '../redux/actions/delivery-action'
import STATUSES from '../constants/statuses'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		height: 110,
		margin: 5,
		marginBottom: 0,
		padding: 10,
		borderWidth: 0,
		borderBottomWidth: 1.5,
		borderRadius: 5,
		borderColor: PRIMARY_COLOR,
		backgroundColor: '#ccc',
	},
	pathContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 0,
		paddingRight: 20,
	},
	text: {
		color: PRIMARY_COLOR,
	},
	id: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	idContainer: {
		flexDirection: 'row',

		paddingLeft: 0,
	},
    statusContainer:{
        alignSelf:'flex-end'
    },
	item: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingBottom: 5,
	},
	inactive: {
		color: UNDERLAY_COLOR,
		backgroundColor: '#eee',
	},
	description: {
		color: PRIMARY_COLOR,
	},
}))

const PackageItem = ({
	data: {
		status = '',
		address_from: {
			details: { formatted_address: from },
		},
		address_to: {
			details: { formatted_address: to },
		},
		description,
	},
	id,
	navigation,
}) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	if (status === STATUSES.COMPLETED) {
		classes.root = { ...classes.root, ...classes.inactive }
		classes.text = { ...classes.text, ...classes.inactive }
	}

	const codeSplitter = (text) => (text?.length > 35 ? `${text.substr(0, 35).trim()} ...` : text)

	const toPage = (page) => () => {
		dispatch(getDeliveryDataAction(id))
		navigation.navigate(page)
	}

	return (
		<TouchableOpacity onPress={toPage(DELIVERY_INFO)}>
			<View style={classes.root}>
				<View style={classes.item}>
					<View style={{ ...classes.idContainer }}>
						<Package stroke={PRIMARY_COLOR} width={20} />
						<Text style={{ ...classes.id, ...classes.text }}>{id}</Text>
					</View>

					<View style={classes.pathContainer}>
						<Text style={classes.text}>{codeSplitter(from)}</Text>
						<Minus width={60} />
						<Text style={classes.text}>{codeSplitter(to)}</Text>
					</View>
				</View>
				<View style={classes.idContainer}>
					<Text style={{ ...classes.description, ...classes.text }}>{codeSplitter(description)}</Text>
				</View>
				<View style={classes.statusContainer}>
					<Text style={classes.text}>{status}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default PackageItem
