import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import ScoresModal from '../components/modalComponents/ScoresModal'


export default function HomeScreen({ navigation, route }) {

    // Set the modal visibility to false
    const [isHighScoresModalvisible, setisHighScoresModalVisible] = useState(false)
    const [isLoginModalVisible, setisLoginModalVisible] = useState(false)

    const confirmLogout = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel' },
                { text: 'Log out', onPress: () => navigation.navigate('HomeScreen') }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.mainContainer}>

            {/* If the player is logged in, display his name */}
            {route.params
                ? <Text>Welcome {route.params.player_name}</Text>
                : null
            }

            <TouchButton
                title={
                    route.params
                        ? 'Log out '
                        : 'Log in'
                }
                press={() => {
                    route.params
                        // On click on log out, ask for confirmation and if yes, reload HomeScreen with no parameters
                        ? confirmLogout()
                        // On click on log in , navigate to the LoginScreen
                        : navigation.navigate('LoginScreen')
                }}
            />

            <TouchButton
                title='Start game'
                press={() => {
                    route.params
                        ? navigation.navigate('GameScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
                        : navigation.navigate('GameScreen')
                }}
            />

            {/* High scores button */}
            {/* Makes ScoresModal visible*/}
            <TouchButton
                title='High scores'
                press={() => { setisHighScoresModalVisible(true) }}
            />

            {/* High scores Modal (hidden by default*/}
                <ScoresModal
                    changeModalVisible={setisHighScoresModalVisible}
                    visible={isHighScoresModalvisible}
                    title = 'High scores'
                    endGame={false}
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
