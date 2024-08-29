import React from "react"
import { StyleSheet, TextInput } from "react-native"

export default function TextField({
	value,
	placeholder,
	onChangeText,
	autoCapitalize,
	secureTextEntry
}) {
	return (
		<TextInput
			style={styles.field}
			placeholder={placeholder}
			placeholderTextColor="#000"
			value={value}
			onChangeText={onChangeText}
			autoCorrect={false}
			autoCapitalize={autoCapitalize}
			secureTextEntry={secureTextEntry}
		/>
	)
}

const styles = StyleSheet.create({
	field: {
		height: 40,
		width: "85%",
		margin: 12,
		borderWidth: 1,
		borderColor: "#d4af37",
		padding: 10,
		backgroundColor: "white"
	}
})
