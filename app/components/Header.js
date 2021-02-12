import React from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import Logo from '../assets/logo.svg'
import Add from '../assets/add.svg'
import Profile from '../assets/profile.svg'

import { PROFILE } from '../constants/pages'
import { NEW_PACKAGE } from '../constants/pages'
import { UNDERLAY_COLOR } from '../constants/colors'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    add: {
        backgroundColor: 'red',
    },
    profile: {
        color: 'red',
    },
}))

const Header = ({ navigation }) => {
    const classes = useStyles()

    const to = (page) => () => navigation.navigate(page)

    return (
        <View style={classes.root}>
            <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={to(NEW_PACKAGE)}>
                <Add width={50} height={50} />
            </TouchableHighlight>

            <Logo width={50} height={50} />

            <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={to(PROFILE)}>
                <Profile />
            </TouchableHighlight>
        </View>
    )
}
export default Header
