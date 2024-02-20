import React, { useState } from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import TouchButton from '../components/TouchButton'
import ScoresModal from '../components/modalComponents/ScoresModal'
import LoginModal from '../components/modalComponents/LoginModal'
import RegisterModal from '../components/modalComponents/RegisterModal'
import { confirmLogout } from '../core/userEntryCheck'


export default function HomeScreen({ navigation, route }) {

    // Set the modal visibility to false
    const [isHighScoresModalvisible, setisHighScoresModalVisible] = useState(false)
    const [isLoginModalVisible, setisLoginModalVisible] = useState(false)
    const [isRegisterModalVisible, setisRegisterModalVisible] = useState(false)


    return (
        <View style={styles.mainContainer}>

            <ImageBackground
                source={require('../assets/essai3.png')}
                style={styles.background}
                resizeMode='cover'
            >

                {/* If the player is logged in, display his name */}
                {route.params
                    ? <Text>Welcome {route.params.player_name}</Text>
                    : <View>
                        <TouchButton
                            title='Create new account'
                            press={() => { setisRegisterModalVisible(true) }}
                        />
                    </View>
                }

                <TouchButton
                    title={route.params ? 'Log out ' : 'Log in'}
                    press={() => {
                        route.params
                            // On click on log out, ask for confirmation and if yes, reload HomeScreen with no parameters
                            ? confirmLogout(navigation)
                            // On click on log in , show LoginModal
                            : setisLoginModalVisible(true)
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



                {/* Modals */}

                {/* High scores Modal */}
                <ScoresModal
                    changeModalVisible={setisHighScoresModalVisible}
                    visible={isHighScoresModalvisible}
                    title='High scores'
                    endGame={false}
                />

                <LoginModal
                    changeModalVisible={setisLoginModalVisible}
                    visible={isLoginModalVisible}
                    title='Log in'
                    navigation={navigation}
                />

                <RegisterModal
                    changeModalVisible={setisRegisterModalVisible}
                    visible={isRegisterModalVisible}
                    title='Create new account'
                    navigation={navigation}
                />

            </ImageBackground>

        </View>
    )
}


let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
