import React, { useState } from 'react'
import { StyleSheet, View, Alert, ImageBackground } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'
import Header from '../components/Header'
import { checkCredentials } from '../core/apiRequests'
import { checkEmailFormat, checkIfStringIsNotEmpty, checkPasswordFormat } from '../core/userEntryCheck'

export default function LoginScreen({ navigation }) {

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const { email, password } = state


    return (
        <View style={styles.mainContainer}>

            <ImageBackground
                source={require('../assets/essai3.png')}
                style={styles.background}
                resizeMode='cover'
            >
                <View style={styles.form}>

                    <Header style={styles.header} title='Log into your account' />

                    <TextField
                        placeholder='E-mail'
                        value={email}
                        onChangeText={text => setState(prevState => {
                            return { ...prevState, email: text }
                        })}
                        autoCapitalize='none'
                        secureTextEntry={false}
                    />
                    <TextField
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setState(prevState => {
                            return { ...prevState, password: text }
                        })}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />

                    <TouchButton
                        title='Login'
                        press={() => {
                            // On click, check if fields are not empty
                            // Check if e-mail and password match
                            if (
                                checkIfStringIsNotEmpty(email) &&
                                checkIfStringIsNotEmpty(password) &&
                                checkEmailFormat(email) &&
                                checkPasswordFormat(password)
                            ) {
                                checkCredentials(email, password, navigation)
                            } else {
                                console.log('E-mail or password wrong')
                                Alert.alert(
                                    'Error',
                                    'E-mail or password are incorrect',
                                    [
                                        { text: 'OK' }
                                    ],
                                    { cancelable: false }
                                );
                            }
                        }}
                    />

                    <TouchButton
                        title='Create account'
                        press={() => {
                            navigation.navigate('RegisterScreen')
                        }}
                    />

                </View>

            </ImageBackground>

        </View>
    )

}

let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        backgroundColor: 'rgba(244, 232, 193, 0.8)',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#d4af37', // Doré
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    }
})
