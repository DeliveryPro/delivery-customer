import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import Input from '../components/Input'
import { MAIN } from '../constants/pages'
import STATUSES from '../constants/statuses'
import { createNewMessageToSupportAction } from '../redux/actions/support-action'
import { getCreateSupportMessageCreationStatusSelector } from '../redux/selectors/support-selector'
import { getUserDataSelector, getUserIdSelector } from '../redux/selectors/user-selector'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flex: 1,
	},
	itemContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	buttonContainer: {
		alignSelf: 'center',
		marginTop: 50,
		width: 200,
	},
}))

const SUPPORT_TYPES = {
	GOAL: {
		name: 'title',
		placeholder: 'Goal',
		title: '',
	},
	DESC: {
		name: 'question',
		placeholder: 'Description',
		title: '',
	},
}

const Support = ({navigation}) => {
	const classes = useStyles()
	const [data, setData] = useState({})

	const userId = useSelector(getUserIdSelector)
	const userData = useSelector(getUserDataSelector)
	const { isLoading, success } = useSelector(getCreateSupportMessageCreationStatusSelector)
	const dispatch = useDispatch()

	const onChange = (type) => (value) => {
		const d = { ...data }
		d[type] = value
		setData(d)
	}
	useEffect(() => {
		if (!isLoading && success) {
            ToastAndroid.show('Message send', ToastAndroid.SHORT)
            navigation.navigate(MAIN)
        }
	}, [isLoading, success])

	const onSubmit = () => {
		dispatch(createNewMessageToSupportAction({ userId, ...userData, status: STATUSES.NEW, ...data }))
	}

	return (
		<View style={classes.root}>
			<SafeAreaView>
				<View style={classes.itemContainer}>
					<Text>{SUPPORT_TYPES.GOAL.title}</Text>
					<Input
						placeholder={SUPPORT_TYPES.GOAL.placeholder}
						value={data[SUPPORT_TYPES.GOAL.name]}
						onChange={onChange(SUPPORT_TYPES.GOAL.name)}
					/>
				</View>
				<View style={classes.itemContainer}>
					<Text>{SUPPORT_TYPES.DESC.title}</Text>
					<Input
						placeholder={SUPPORT_TYPES.DESC.placeholder}
						value={data[SUPPORT_TYPES.DESC.name]}
						multiline
						numberOfLines={10}
						onChange={onChange(SUPPORT_TYPES.DESC.name)}
					/>
				</View>
				<View style={classes.buttonContainer}>
					<Button onPress={Object.keys(data).length && onSubmit} text="Submit" />
				</View>
			</SafeAreaView>
		</View>
	)
}

export default Support
