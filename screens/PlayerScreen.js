import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TouchButton from '../components/TouchButton'

export default function PlayerScreen({ navigation, route }) {

    return (
        <View style={styles.mainContainer}>

            {/* <Text>Welcome {player_name} number {player_id}</Text> */}
            <TouchButton
                title='Play game'
                press={() => {
                    route.params 
                    ? navigation.navigate('GameScreen', { player_id: route.params.player_id, player_name: route.params.player_name }) 
                    : navigation.navigate('GameScreen')
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
