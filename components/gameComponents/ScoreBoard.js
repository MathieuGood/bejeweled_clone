import React from "react"
import { StyleSheet, ImageBackground, View } from "react-native"
import ScoreAnimation from "../animationComponents/ScoreAnimation"
import LevelAnimation from "../animationComponents/LevelAnimation"
import TriesLeftAnimation from "../animationComponents/TriesAnimation"
import { appThemes } from "../../themes/appThemes"

const ScoreBoard = ({ score, level, attempts }) => {
	const backgroundImage = appThemes.tiles.others[8]

	return (
		<View style={styles.mainContainer}>
			<ImageBackground source={backgroundImage} style={styles.container}>
				<LevelAnimation level={level} />
			</ImageBackground>

			<ImageBackground source={backgroundImage} style={styles.container}>
				<ScoreAnimation score={score} />
			</ImageBackground>

			<ImageBackground source={backgroundImage} style={styles.container}>
				<TriesLeftAnimation attempts={attempts} />
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingHorizontal: 5
	},
	container: {
		width: 200,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 5
	}
})

export default ScoreBoard
