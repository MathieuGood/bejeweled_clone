import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { View, Switch, StyleSheet, Text } from 'react-native';

const MusicPlayer = ({ shouldPlayAutomatically, musicSwitchEnabled, setMusicSwitchEnabled }) => {
    const [sound, setSound] = useState(null);

    // Load and prepare the sound
    useEffect(() => {
        async function loadSound() {
            try {
                console.log('Loading sound');
                const { sound: newSound } = await Audio.Sound.createAsync(
                    require('../assets/Sounds/Sound2.mp3'),
                    { shouldPlay: false, isLooping: true }
                );
                setSound(newSound);
            } catch (error) {
                console.error('Error loading sound:', error);
            }
        }

        loadSound();

        // Cleanup: unload the sound when the component is unmounted
        return () => {
            console.log('Unloading sound');
            sound?.unloadAsync();
        };
    }, []);

    // Control playback based on props
    useEffect(() => {
        const controlSound = async () => {
            if (shouldPlayAutomatically && musicSwitchEnabled) {
                console.log('Playing sound');
                await sound?.playAsync();
            } else {
                console.log('Stopping sound');
                await sound?.stopAsync(); 
            }
        };

        if (sound) {
            controlSound();
        }
    }, [shouldPlayAutomatically, musicSwitchEnabled, sound]);

    // Update playback status when the switch is toggled
    const toggleSwitch = () => {
        setMusicSwitchEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <Text>Music: {musicSwitchEnabled ? 'On' : 'Off'}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={musicSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={musicSwitchEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MusicPlayer;
