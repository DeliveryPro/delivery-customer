import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Tabs from '../components/Tabs'
import { QR_CODE_SCANNER } from '../constants/pages'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
    },
}))

const QRCodeScanner = (props) => {
    const classes = useStyles()
    return (
        <View style={classes.root}>
            <Tabs activeScreen={QR_CODE_SCANNER} {...props} />
        </View>
    )
}

export default QRCodeScanner
