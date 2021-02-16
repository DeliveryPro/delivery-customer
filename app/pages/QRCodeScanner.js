import React from 'react'
import { StyleSheet, Text, View, AppRegistry, TouchableHighlight, Linking } from 'react-native'
import Tabs from '../components/Tabs'
import { QR_CODE_SCANNER } from '../constants/pages'
import QRCode from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { UNDERLAY_COLOR } from '../constants/colors'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
}))


const QRCodeScanner = (props) => {
    const classes = useStyles()

    const onSuccess = (e) => {
        Linking.openURL(e.data).catch((err) => console.error('An error occured', err))
    }

    return (
        <View style={classes.root}>
         <QRCode
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text style={classes.centerText}>
                        Go to <Text style={classes.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan
                        the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableHighlight underlayColor={UNDERLAY_COLOR} style={classes.buttonTouchable}>
                        <Text style={classes.buttonText}>OK. Got it!</Text>
                    </TouchableHighlight>
                }
            />
            <Tabs activeScreen={QR_CODE_SCANNER} {...props} />
        </View>
    )
}

export default QRCodeScanner
