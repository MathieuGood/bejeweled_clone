import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TouchButton from '../components/TouchButton'
import Artifact from '../components/Artifact'

export default function PlayerScreen({ navigation }) {

    return (
        <View style={styles.mainContainer}>

            <Text>Player screen</Text>
            <TouchButton
                title='Play game'
                press={() => {
                    navigation.navigate('GameScreen')
                }}
            />
            <TouchButton
                title='Back to home screen'
                press={() => {
                    navigation.navigate('HomeScreen')
                }}
            />

            <Artifact artifactNumber={0} />

        </View>
    )
}

let styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'lightgray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
