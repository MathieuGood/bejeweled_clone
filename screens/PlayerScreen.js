import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TouchButton from '../components/TouchButton'

export default function PlayerScreen({ navigation, route }) {

    // Get player_id and player_name from route parameters
    const { player_id, player_name } = route.params

    return (
        <View style={styles.mainContainer}>

            <Text>Welcome {player_name} number {player_id}</Text>
            <TouchButton
                title='Play game'
                press={() => {
                    navigation.navigate('GameScreen', { player_id: player_id, player_name: player_name })
                }}
            />
            <TouchButton
                title='Log out'
                press={() => {
                    navigation.navigate('HomeScreen')
                }}
            />

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
