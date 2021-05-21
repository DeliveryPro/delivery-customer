import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'

import ImagePicker from 'react-native-image-crop-picker'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/screen'

import Camera from '../assets/camera.svg'
import Folder from '../assets/folder.svg'
import User from '../assets/profile.svg'
import Input from '../components/Input'
import Button from '../components/Button'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
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
        padding: 10,
        alignItems: 'center',
    },
    dateContainer: {
        display: 'flex',
        borderWidth: 1,
        margin: 10,
        marginBottom: 0,
        borderRadius:4,
        borderColor: SECONDARY_COLOR,
    },
    text: {
        padding: 10,
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

const NAME = 'name'
const BIRTH_DATE = 'birth_date'
const ADDRESS = 'address'

const Profile = ({ route }) => {
    const [modalAvatarSourcePicker, setModalAvatarSourcePicker] = useState(false)
    const [avatarSource, setAvatarSource] = useState(null)
    const [image, setImage] = useState(null)
    const [birth, setBirth] = useState(new Date())
    const [visibleModalDatePicker, setVisibleModalDatePicker] = useState(new Date())
    const [name, setName] = useState(null)
    const [address, setAddress] = useState(null)

    const classes = useStyles()
    const modalCallAvatar = () => setModalAvatarSourcePicker(!modalAvatarSourcePicker)
    const modalCallDate = () => setVisibleModalDatePicker(!visibleModalDatePicker)
    const setImageGetterSource = (source) => () => setAvatarSource(source)

    const folderImagePicker = async () => {
        const img = await ImagePicker.openPicker(CAMERA_VARIABLES)
        setImage(img)
        modalCallAvatar()
    }
    const cameraImagePicker = async () => {
        const img = await ImagePicker.openCamera(CAMERA_VARIABLES)
        setImage(img)
        modalCallAvatar()
    }

    useEffect(() => {
        if (!!avatarSource) {
            if (avatarSource === CAMERA) cameraImagePicker()
            if (avatarSource === FILES) folderImagePicker()
        }
    }, [avatarSource])

    const setValue = (type) => (value) => {
        if (type === NAME) setName(value)
        if (type === BIRTH_DATE) {
            console.log('value', value)
            setBirth(value)
        }
        if (type === ADDRESS) setAddress(value)
    }

    return (
        <View style={classes.root}>
            <ModalContent
                visible={modalAvatarSourcePicker}
                closeModal={modalCallAvatar}
                selectItem={setImageGetterSource}
            />
            <TouchableHighlight onPress={modalCallAvatar}>
                <View style={classes.avatarContainer}>
                    {image?.path ? (
                        <Image style={classes.logo} source={{ uri: `data:${image.mime};base64,${image.data}` }} />
                    ) : (
                        <View style={classes.logo}>
                            <User width={IMAGE_SIZE / 1.2} height={IMAGE_SIZE / 1.2} />
                        </View>
                    )}
                </View>
            </TouchableHighlight>
            <View style={classes.inputContainer}>
                <Input placeholder="Name/Surname" contentType="" onChange={setValue(NAME)} value={name} />
            </View>
            <View style={classes.inputContainer}>
                <TouchableHighlight onPress={modalCallDate}>
                    <View style={classes.dateContainer}>
                        <Text style={classes.text}>{birth.toString().substr(0, 15)}</Text>
                    </View>
                </TouchableHighlight>
                <ModalDatePicker
                    birth={birth}
                    visible={visibleModalDatePicker}
                    closeModal={modalCallDate}
                    setTime={setValue}
                />
            </View>
            <View style={classes.inputContainer}>
                <Input placeholder="Address" onChange={setValue(ADDRESS)} value={address} />
            </View>

            <Text>total send</Text>
            <Text>total received</Text>
        </View>
    )
}

const ModalDatePicker = ({ visible, birth, closeModal, setTime }) => {
    const classes = useStyles()
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
            <View style={classes.modal}>
                <DatePicker mode="date" style={{ maxWidth: '100%' }} date={birth} onDateChange={setTime(BIRTH_DATE)} />
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
