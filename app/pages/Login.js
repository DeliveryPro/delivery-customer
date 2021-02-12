import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { OutlinedTextField } from 'rn-material-ui-textfield'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        display: 'flex',
        width: '80%',
        margin: 10,
        padding: 10,
        flexDirection: 'row',
    },
}))

const Login = () => {
    const classes = useStyles()
    const [email, setEmail] = useState()

    const fieldRef = React.createRef()

    const onChange = () => {
        const { current } = fieldRef
        console.log(current.value())
        setEmail(current.value())
    }

    const onSubmit = () => {
        let { current: field } = fieldRef

        console.log(field.value())
        // setEmail(field.value())
    }

    const formatText = (text) => {
        return text.replace(/[^+\d]/g, '')
    }
    return (
        <View style={classes.root}>
            <Text>Login</Text>
            <OutlinedTextField
                label="Email"
                inputContainerStyle={classes.input}
                onSubmitEditing={onSubmit}
                onChangeText={onChange}
                ref={fieldRef}
            />
            <OutlinedTextField
                label="Password"
                inputContainerStyle={classes.input}
                formatText={formatText}
                onSubmitEditing={onSubmit}
                ref={fieldRef}
            />
        </View>
    )
}

export default Login
