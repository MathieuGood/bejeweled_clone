// FontLoader.js
import { useFonts } from "expo-font"

const FontLoader = ({ children }) => {
	const [fontsLoaded] = useFonts({
		Assassin: require("../../assets/fonts/Assassin.ttf"),
		felix: require("../../assets/fonts/FELIX.ttf")
	})

	if (!fontsLoaded) {
		return null
	}

	return children
}

export default FontLoader
