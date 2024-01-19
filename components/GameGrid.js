import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Artifact from './Artifact'

export default function GameGrid({ gridContent, press }) {

    return (
        <View>

            <TouchableOpacity style={styles.buttonContainer} onPress={press}>
                <Image source='' style={styles.artifactImage} />
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    artifactImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})