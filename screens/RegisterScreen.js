import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native'
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

    const { theme, name, email, password } = state

    
    //////////
    // TO DO
    // Implement alert if checkNameFormat is false
    //                 if checkPasswordFormat is false
    //                 if checkEmailFormat is false
    /////////

    // Checking if name, email and password have right format

    function checkUserEntryAndAddPlayer(name, email, password) {
        checkIfEmailDoesNotExist(email, () => {
            console.log('EMAIL TES$T OK')
            if (checkEmailFormat(email)
                && checkPasswordFormat(password)
                && checkNameFormat(name)) {
                console.log('Adding player')
                    // Then add new player to database and navigate to PlayerScreen
                addPlayer(name.trim(), email, password, navigation)
            }
        })

    }


    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text>Register screen</Text>
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

        </SafeAreaView>
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
