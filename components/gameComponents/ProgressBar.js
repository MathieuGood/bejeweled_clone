import React from "react"
import { View, StyleSheet } from "react-native"

export default function ProgressBar({ progress }) {
	return (
		<View style={styles.container}>
			<View style={styles.progressBarContainer}>
				<View style={[styles.progressBar, { width: `${progress}%` }]} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 20
	},
	progressBarContainer: {
		height: 35,
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#E7E3E3",
		marginHorizontal: 0,
		borderRadius: 10,
		overflow: "hidden"
	},
	progressBar: {
		height: "100%",
		backgroundColor: "#e8b923"
	}
})
