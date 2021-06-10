import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image, FlatList } from 'react-native'
import DatePicker from 'react-native-date-picker'

import ImagePicker from 'react-native-image-crop-picker'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/screen'

import Camera from '../assets/camera.svg'
import Folder from '../assets/folder.svg'
import User from '../assets/profile.svg'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataSelector, getUserIdSelector } from '../redux/selectors/user-selector'
import { getUserDataAction, updateUserAction, updateUserPhotoAction } from '../redux/actions/user-action'
import { logOutUserAction } from '../redux/actions/auth-action'
import AddressField from '../components/AddressField'
import { SUPPORT } from '../constants/pages'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flex: 1,
		padding: 10,
	},
	logo: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		borderRadius: 5,
		backgroundColor: SECONDARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#eee',
		marginTop: SCREEN_HEIGHT / 3,
		marginLeft: SCREEN_WIDTH / 7,
		marginRight: SCREEN_WIDTH / 7,
		borderRadius: 5,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	modalItem: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#eee',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderColor: PRIMARY_COLOR,
	},
	modalItemText: {
		fontSize: 18,
		color: PRIMARY_COLOR,
	},
	avatarContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: SCREEN_HEIGHT / 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		display: 'flex',
	},
	buttonContainer: {
		display: 'flex',
		paddingTop: 10,
        alignSelf:'center',
        width: 200,
	},
	dateContainer: {
		display: 'flex',
		borderWidth: 1,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,
		marginTop: 15,
		borderRadius: 4,
		borderColor: SECONDARY_COLOR,
	},
	text: {
		padding: 10,
	},
	timePickerItem: {
		display: 'flex',
		alignItems: 'center',
		padding: 5,
	},
	inputPadding: {
		padding: 0,
	},
	supportButton: {
		position: 'absolute',
        width: '100%',
		bottom: 15,
        left:10,
        // padding:10,
	},
}))

const CAMERA = 'camera'
const FILES = 'files'

const IMAGE_SIZE = 80

const CAMERA_VARIABLES = {
	width: 300,
	height: 400,
	cropping: true,
	includeBase64: true,
}

const PROFILE_FIELDS = {
	NAME: {
		name: 'name',
	},
	EMAIL: {
		name: 'email',
	},
	BIRTH_DATE: {
		name: 'birth_date',
	},
	ADDRESS: {
		name: 'address',
	},
	TIME: {
		name: 'time',
	},
	IMAGE: {
		name: 'photo',
	},
}

const TIME_OPTIONS = {
	time0: '8:00-9:59 AM',
	time1: '10:00-11:59 AM',
	time2: '12:00-1:59 PM',
	time3: '2:00-3:59 PM',
	time4: '4:00-5:59 PM',
	time5: '6:00-7:59 PM',
}

const Profile = ({ navigation }) => {
	const [modalAvatarSourcePicker, setModalAvatarSourcePicker] = useState(false)
	// const [visibleModalDatePicker, setVisibleModalDatePicker] = useState(false)
	const [visibleModalTimePicker, setVisibleModalTimePicker] = useState(false)

	const [avatarSource, setAvatarSource] = useState(null)
	const [data, setData] = useState({})
	const [changed, setChanged] = useState(false)

	const classes = useStyles()
	const modalCallAvatar = () => setModalAvatarSourcePicker(!modalAvatarSourcePicker)
	// const modalCallDate = () => setVisibleModalDatePicker(!visibleModalDatePicker)
	const modalCellTime = () => setVisibleModalTimePicker(!visibleModalTimePicker)

	const setImageGetterSource = (source) => () => setAvatarSource(source)

	const dispatch = useDispatch()
	const uid = useSelector(getUserIdSelector)
	const userData = useSelector(getUserDataSelector)

	useEffect(() => {
		if (uid) dispatch(getUserDataAction(uid))
	}, [uid])

	useEffect(() => {
		if (userData) setData(userData)
	}, [userData])

	const folderImagePicker = async () => {
		const img = await ImagePicker.openPicker(CAMERA_VARIABLES)
		// setValue(PROFILE_FIELDS.IMAGE.name)(img)
		dispatch(updateUserPhotoAction(uid, img))
		modalCallAvatar()
	}
	const cameraImagePicker = async () => {
		const img = await ImagePicker.openCamera(CAMERA_VARIABLES)
		// setValue(PROFILE_FIELDS.IMAGE.name)(img)
		dispatch(updateUserPhotoAction(uid, img))
		modalCallAvatar()
	}

	useEffect(() => {
		if (!Boolean(avatarSource)) return
		if (avatarSource === CAMERA) cameraImagePicker()
		if (avatarSource === FILES) folderImagePicker()
	}, [avatarSource])

	const setValue = (type) => (value) => {
		const d = { ...data }
		d[type] = value
		setData(d)
		setChanged(true)
	}

	const onSave = () => {
		if (typeof data[PROFILE_FIELDS.IMAGE.name] !== 'string') delete data[PROFILE_FIELDS.IMAGE.name]
		data[PROFILE_FIELDS.BIRTH_DATE.name] = new Date(data[PROFILE_FIELDS.BIRTH_DATE.name]).toDateString()
		dispatch(updateUserAction(uid, data))
		setChanged(false)
		dispatch(getUserDataAction(uid))
	}

	const logOut = () => dispatch(logOutUserAction())

	const toSupport = () => navigation.navigate(SUPPORT)

	return (
		<View style={classes.root}>
			<ModalContent
				visible={modalAvatarSourcePicker}
				closeModal={modalCallAvatar}
				selectItem={setImageGetterSource}
			/>
			<TouchableHighlight onPress={modalCallAvatar}>
				<View style={classes.avatarContainer}>
					{data[PROFILE_FIELDS.IMAGE.name] ? (
						<Image
							style={classes.logo}
							source={{
								uri: data[PROFILE_FIELDS.IMAGE.name]?.data
									? `data:${data[PROFILE_FIELDS.IMAGE.name].mime};base64,${
											data[PROFILE_FIELDS.IMAGE.name].data
									  }`
									: data[PROFILE_FIELDS.IMAGE.name],
							}}
						/>
					) : (
						<View style={classes.logo}>
							<User width={IMAGE_SIZE / 1.2} height={IMAGE_SIZE / 1.2} />
						</View>
					)}
				</View>
			</TouchableHighlight>
			<View style={classes.inputContainer}>
				<Input
					placeholder="Name/Surname"
					contentType="name"
					smallPadding
					onChange={setValue(PROFILE_FIELDS.NAME.name)}
					value={data[PROFILE_FIELDS.NAME.name]}
				/>
			</View>
			<View style={classes.inputContainer}>
				<Input
					placeholder="Email"
					contentType="emailAddress"
					smallPadding
					onChange={setValue(PROFILE_FIELDS.EMAIL.name)}
					value={data[PROFILE_FIELDS.EMAIL.name]}
				/>
			</View>

			<View style={classes.inputContainer}>
				<TouchableHighlight onPress={modalCellTime}>
					<View style={classes.dateContainer}>
						{data[PROFILE_FIELDS.TIME.name] ? (
							<Text style={classes.text}>{data[PROFILE_FIELDS.TIME.name] || TIME_OPTIONS.time0}</Text>
						) : (
							<Text style={classes.text}>Select preferred time</Text>
						)}
					</View>
				</TouchableHighlight>
				<ModalTimePicker
					birth={data[PROFILE_FIELDS.TIME.name]}
					visible={visibleModalTimePicker}
					closeModal={modalCellTime}
					setTime={setValue(PROFILE_FIELDS.TIME.name)}
				/>
			</View>
			{/* <AddressField
				placeholder={PROFILE_FIELDS.ADDRESS.placeholder}
				onChange={setValue(PROFILE_FIELDS.ADDRESS.name)}
			/> */}
			<View style={classes.buttonContainer }>
				<Button onPress={toSupport} text="Support" />
			</View>

			{changed && (
				<View style={classes.buttonContainer}>
					<Button onPress={onSave} text="Submit" />
				</View>
			)}

			{/* <Text>Total send: {totalSendCount}</Text> */}
			{/* <Text>total received: {totalReceivedCount}</Text> */}

			<View style={{...classes.buttonContainer, ...classes.supportButton}}>
				<Button onPress={logOut} text="Log out" />
			</View>
		</View>
	)
}

const ModalDatePicker = ({ visible, birth, closeModal, setDate }) => {
	const classes = useStyles()
	const dateNow = new Date()
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
			<View style={classes.modal}>
				<DatePicker mode="date" style={{ maxWidth: '100%' }} date={birth || dateNow} onDateChange={setDate} />
				<View style={classes.buttonContainer}>
					<Button onPress={closeModal} />
				</View>
			</View>
		</Modal>
	)
}

const ModalTimePicker = ({ visible, closeModal, setTime }) => {
	const classes = useStyles()

	const setNewTime = (item) => () => {
		setTime(item)
		closeModal()
	}
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
			<View style={classes.modal}>
				<FlatList
					data={Object.keys(TIME_OPTIONS)}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<TouchableHighlight onPress={setNewTime(TIME_OPTIONS[item])}>
							<View style={classes.timePickerItem}>
								<Text style={classes.text}>{TIME_OPTIONS[item]}</Text>
							</View>
						</TouchableHighlight>
					)}
				/>
				<View style={classes.buttonContainer}>
					<Button onPress={closeModal} />
				</View>
			</View>
		</Modal>
	)
}

const ModalContent = ({ visible, closeModal, selectItem }) => {
	const classes = useStyles()
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
			<View style={classes.modal}>
				<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(FILES)}>
					<View style={classes.modalItem}>
						<Folder width={30} />
						<Text style={classes.modalItemText}>Folder</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(CAMERA)}>
					<View style={classes.modalItem}>
						<Camera width={30} />
						<Text style={classes.modalItemText}>Camera</Text>
					</View>
				</TouchableHighlight>
			</View>
		</Modal>
	)
}

export default Profile
