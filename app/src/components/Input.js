import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'

export const inputStyles = StyleSheet.create((theme) => ({
	inputLabel: {
		color: PRIMARY_COLOR,
	},
	textInputDefault: {
		display: 'flex',
		borderWidth: 1,
		borderRadius: 4,
		minHeight: 40,
		padding: 10,
		borderColor: SECONDARY_COLOR,
        textAlignVertical:'top',
	},
	inputContainer: {
		display: 'flex',
		position: 'relative',
		margin: 10,
	},
	textInput: {
		backgroundColor: '#eee',
		borderColor: SECONDARY_COLOR,
		borderWidth: 1,
	},
	container: {
		marginTop: 15,
		marginBottom: 40,
		borderColor: SECONDARY_COLOR,
	},
	active: {
		borderColor: PRIMARY_COLOR,
	},
	smallPadding: {
		margin: 0,
	},
    whiteBackground:{
        backgroundColor:'#fff'
    }
}))

const Input = ({
	value = '',
	label = '',
	placeholder = '',
	contentType = 'nickname',
	onChange,
	smallPadding,
	white,
    multiline,
    numberOfLines,
	...props
}) => {
	const classes = inputStyles()
	const [focused, setFocused] = useState(false)

	let inputStyle = { ...classes.textInputDefault }
	let inputContainer = { ...classes.inputContainer }

	if (focused) inputStyle = { ...inputStyle, ...classes.active }
	if (smallPadding) inputContainer = { ...inputContainer, ...classes.smallPadding }
	if (white) inputStyle = { ...inputStyle, ...classes.whiteBackground }

	const changeFocus = () => setFocused(!focused)

	return (
		<View style={inputContainer}>
			<Text style={classes.inputLabel}>{label}</Text>
			<TextInput
				onFocus={changeFocus}
				onEndEditing={changeFocus}
				style={inputStyle}
				textContentType={contentType}
				placeholder={placeholder}
				onChangeText={onChange}
				value={value}
                multiline={multiline}
                numberOfLines={numberOfLines}
				{...props}
			/>
		</View>
	)
}

export default Input
