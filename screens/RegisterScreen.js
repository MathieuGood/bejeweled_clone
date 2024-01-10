import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'

export default function RegisterScreen({ navigation }) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { count, theme, email, password } = state

    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text>Register screen</Text>
            <TextField
                placeholder='Name'
                value={email}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, name: text }
                })}
                autoCapitalize='none'
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
                press={() => console.log('Create account PRESSED')}
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
