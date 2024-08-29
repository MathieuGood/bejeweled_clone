import { Asset } from "expo-asset"

const extractImages = (obj, images = []) => {
	Object.values(obj).forEach(value => {
		if (typeof value === "object") {
			extractImages(value, images)
		} else {
			images.push(value)
		}
	})
	return images
}

export async function preloadImages(appThemes) {
	const imagesToPreload = extractImages(appThemes)
	const cacheImages = imagesToPreload.map(image => {
		return Asset.fromModule(image).downloadAsync()
	})

	await Promise.all(cacheImages)
}
