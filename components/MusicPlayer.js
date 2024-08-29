import React, { useEffect, useState } from "react"
import { Audio } from "expo-av"
import { View, Switch, StyleSheet, Text } from "react-native"
import IconButton from "./IconButton"

const MusicPlayer = ({ shouldPlayAutomatically, musicSwitchEnabled, setMusicSwitchEnabled }) => {
	const [sound, setSound] = useState(null)

	useEffect(() => {
		async function loadSound() {
			try {
				console.log("Loading sound")
				const { sound: newSound } = await Audio.Sound.createAsync(
					require("../assets/Sounds/Sound2.mp3"),
					{ shouldPlay: false, isLooping: true }
				)
				setSound(newSound)
			} catch (error) {
				console.error("Error loading sound:", error)
			}
		}

		loadSound()

		return () => {
			console.log("Unloading sound")
			sound?.unloadAsync()
		}
	}, [])

	useEffect(() => {
		const controlSound = async () => {
			if (shouldPlayAutomatically && musicSwitchEnabled) {
				console.log("Playing sound")
				await sound?.playAsync()
			} else {
				console.log("Stopping sound")
				await sound?.stopAsync()
			}
		}

		if (sound) {
			controlSound()
		}
	}, [shouldPlayAutomatically, musicSwitchEnabled, sound])

	const toggleSwitch = () => {
		setMusicSwitchEnabled(previousState => !previousState)
	}

	return (
		<View style={styles.container}>
			<IconButton
				iconName={musicSwitchEnabled ? "music-note" : "music-note-off"}
				iconColor={musicSwitchEnabled ? "#2b50c8" : "#2b50c8"}
				iconSize={40}
				title="Music"
				press={toggleSwitch}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingRight: 10
	}
})

export default MusicPlayer
