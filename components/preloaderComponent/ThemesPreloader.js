import { useEffect } from "react"
import { preloadImages } from "./PreloadThemes"
import { appThemes } from "../../themes/appThemes"

const ThemePreloader = () => {
	useEffect(() => {
		preloadImages(appThemes)
	}, [])

	return null
}

export default ThemePreloader
