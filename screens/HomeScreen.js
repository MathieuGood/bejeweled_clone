import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, ImageBackground } from 'react-native'
import AppContext from '../providers/AppContext'
import TouchButton from '../components/TouchButton'
import ScoresModal from '../components/modalComponents/ScoresModal'
import LoginModal from '../components/modalComponents/LoginModal'
import RegisterModal from '../components/modalComponents/RegisterModal'
import SettingsModal from '../components/modalComponents/SettingsModal'
import UpdatePasswordModal from '../components/modalComponents/UpdatePasswordModal'
import Toast from '../components/modalComponents/Toast'
import { appThemes } from '../themes/appThemes'


export default function HomeScreen({ navigation, route }) {

    // Get selected theme from AppContext
    const { theme, setTheme } = useContext(AppContext)

    // Import background images from appThemes
    const backgroundImage = appThemes.backgrounds[theme]['HomeScreen']

    // Set the modals visibility to false
    const [isHighScoresModalvisible, setisHighScoresModalVisible] = useState(false)
    const [isLoginModalVisible, setisLoginModalVisible] = useState(false)
    const [isRegisterModalVisible, setisRegisterModalVisible] = useState(false)
    const [isSettingsModalVisible, setisSettingsModalVisible] = useState(false)
    const [isLogoutConfirmVisible, setIsLogoutConfirmVisible] = useState(false)
    const [isPasswordUpdateModalVisible, setIsPasswordUpdateModalVisible] = useState(false)


    // Rerender the screen when the theme changes
    useEffect(() => {
        console.log('Theme changed')
        console.log(route.params)
    }, [theme])



    return (
        <View style={styles.mainContainer}>

            <ImageBackground
                source={backgroundImage}
                style={styles.background}
                resizeMode='cover'
            >

                <SafeAreaView>

                    <View style={styles.topContainer}>

                        {/* If the player is logged in, display his name */}
                        {route.params
                            ? <TouchButton title={route.params.player_name}
                                customStyle={{
                                    buttonContainer: {
                                        width: 220,
                                    }
                                }}
                                press={() => {
                                    setIsPasswordUpdateModalVisible(true)
                                }}
                            />
                            : <TouchButton
                                title='Create account'
                                press={() => { setisRegisterModalVisible(true) }}
                            />
                        }

                        <TouchButton
                            // Change title regarding login status
                            title={route.params ? 'Log out ' : 'Log in'}
                            press={() => {
                                route.params
                                    //Modal replaces alert
                                    // On click on log out, ask for confirmation and if yes, reload HomeScreen with no parameters
                                    ? setIsLogoutConfirmVisible(true)

                                    // On click on log in , show LoginModal
                                    : setisLoginModalVisible(true)
                            }}

                        />

                    </View>


                    <View style={styles.centerContainer}>
                        <TouchButton
                            title='Play game'
                            customStyle={{
                                buttonText: {
                                    fontSize: 26,
                                },
                                buttonContainer: {
                                    height: 65,
                                    width: 200,
                                }
                            }}
                            press={() => {
                                route.params
                                    ? navigation.navigate('GameScreen', {
                                        player_id: route.params.player_id,
                                        player_name: route.params.player_name,
                                    })
                                    : navigation.navigate('GameScreen')
                            }}
                        />
                    </View>


                    <View style={styles.bottomContainer}>

                        <TouchButton
                            title='High scores'
                            press={() => { setisHighScoresModalVisible(true) }}
                        />

                        <TouchButton
                            title='Theme'
                            press={() => { setisSettingsModalVisible(true) }}
                        />

                    </View>

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


                    <UpdatePasswordModal
                        changeModalVisible={setIsPasswordUpdateModalVisible}
                        visible={isPasswordUpdateModalVisible}
                        title='Update your password'
                        navigation={navigation}
                        route={route}
                    />

                    <SettingsModal
                        changeModalVisible={setisSettingsModalVisible}
                        visible={isSettingsModalVisible}
                        title='Theme selection'
                        navigation={navigation}
                        route={route}
                    />

                    <Toast
                        visible={isLogoutConfirmVisible}
                        changeModalVisible={setIsLogoutConfirmVisible}
                        iconName="warning"
                        title="Confirm Logout"
                        buttonColor="orange"
                        iconBackgroundColor="orange"
                        warning="Are you sure you want to log out ?"
                        buttonText="Yes"
                        press={() => {
                            setIsLogoutConfirmVisible(false)
                            navigation.navigate('HomeScreen');
                        }}
                        showCancelButton="true"
                        widthButton='35%'
                    >
                    </Toast>

                </SafeAreaView>

            </ImageBackground>

        </View>
    )
}


let styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    centerContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
