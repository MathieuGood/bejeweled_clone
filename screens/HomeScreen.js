import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'
import { checkCredentials } from '../core/apiRequests'

export default function HomeScreen({ navigation }) {

    const [state, setState] = useState({
        theme: 'light',
        email: '',
        password: ''
    })

    const { theme, email, password } = state
    const [emailStatus, setEmailStatus] = useState('Click the button to show e-mail')

    // For debug : know when component renders
    // useEffect(() => {
    //     console.log('Component HomeScreen render')
    // })


    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text>Bejeweled Clone HomeScreen</Text>

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

            <TouchButton title='Login' press={() => {
                // On click, check if e-mail and password match
                checkCredentials(email, password, navigation)
            }}
            />

            <TouchButton title='Create account' press={() => {
                navigation.navigate('RegisterScreen')
            }}
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
