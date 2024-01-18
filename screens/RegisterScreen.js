import React, { useState } from 'react'
import { StyleSheet, ImageBackground, View, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'
import { addPlayer, checkIfEmailDoesNotExist } from '../core/apiRequests'
import { checkEmailFormat, checkNameFormat, checkPasswordFormat } from '../core/userEntryCheck'


export default function RegisterScreen({ navigation }) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = state


    // Check if name, email and password have right format
    function checkUserEntryAndAddPlayer(name, email, password) {
        // Check if entered e-mail does not already exist in the database
        checkIfEmailDoesNotExist(email, () => {
            console.log('EMAIL TES$T OK')

            // Initalize errorMessage to empty string
            let errorMessage = ''

            // Run all entry check functions and feed errorMessage string if the return is false
            checkEmailFormat(email) ? errorMessage += '' : errorMessage += 'Wrong e-mail format.\n'
            checkPasswordFormat(password) ? errorMessage += '' : errorMessage += 'Wrong password format, it must contain at least 6 characters and no space.\n'
            checkNameFormat(name) ? errorMessage += '' : errorMessage += 'Wrong name format, it must contain at least one letter.\n'

            // If errorMessage is empty and all the checks went well
            if (errorMessage === '') {
                // Execute addPlayer() that sends API call to create new player in database
                // and navigate to PlayerScreen
                console.log('Adding player')
                addPlayer(name.trim(), email, password, navigation)
            } else {
                Alert.alert(
                    'Invalid entry',

                    errorMessage.slice(0, -2),
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }

            if (checkEmailFormat(email)
                && checkPasswordFormat(password)
                && checkNameFormat(name)) {
                console.log('Adding player')
                addPlayer(name.trim(), email, password, navigation)
            }
        })

    }


    return (
        <View style={styles.mainContainer}>

            <ImageBackground
                source={require('../assets/RegisterBK2.png')}
                style={styles.background}
                resizeMode='cover'
            >

                <View style={styles.form}>
                    {/* TextField behavior :
                    onChangeText -> update state with user entry and reinject the state as value */}
                    <TextField
                        placeholder='Name'
                        value={name}
                        onChangeText={text => setState(prevState => {
                            return { ...prevState, name: text }
                        })}
                        autoCapitalize='words'
                        secureTextEntry={false}
                    />
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
                        title='Create account'
                        press={() => checkUserEntryAndAddPlayer(name, email, password)}
                    />

                    <TouchButton
                        title='Back to home page'
                        press={() => {
                            navigation.navigate('HomeScreen')
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
    },
})
