import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Tabs from '../components/Tabs'
import { MAP } from '../constants/pages'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
    },
}))

const Map = (props) => {
    const classes = useStyles()
    return (
        <View style={classes.root}>
            <Tabs activeScreen={MAP} {...props} />
        </View>
    )
}

export default Map
