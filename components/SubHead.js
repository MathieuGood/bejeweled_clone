import React from "react"
import { Text, StyleSheet } from "react-native"

const SubHead = ({ title, style }) => {
	return <Text style={[styles.subHeadStyle, style]}>{title}</Text>
}

const styles = StyleSheet.create({
	subHeadStyle: {
		fontSize: 18,
		color: "#0A1247",
		fontWeight: "500",
		marginBottom: 10,
		textAlign: "center",
		backgroundColor: "rgba(255, 254, 234, 0.69)",
		width: "95%",
		height: "8%",
		padding: 10,
		fontFamily: "felix"
	}
})

export default SubHead
