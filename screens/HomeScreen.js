import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'

export default function HomeScreen({navigation}) {

    const [state, setState] = useState({
        count: 4,
        theme: 'light',
        email: '',
        password: ''
    })

    const { count, theme, email, password } = state
    const [emailStatus, setEmailStatus] = useState('Click the button to show e-mail')


    function testing() {
        if (count > 24) {
            setState(prevState => {
                return { ...prevState, count: prevState.count + 400 }
            })
            styles = StyleSheet.compose({
                mainContainer: {
                    backgroundColor: 'lightyellow',
                    flex: 1
                }
            })
        }
    }

    // changeCount()

    function changeCount() {
        setState(prevState => {
            return { ...prevState, count: prevState.count + 4 }
        })
    }

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
                console.log('Start login check function')
            }}
            />

            <TouchButton title='Create account' press={() => {
                navigation.navigate('GameScreen')
            }}
            />

            <Text>{emailStatus}</Text>
            <Text>-</Text>
            <Text>E-mail VALUE : {email}</Text>
            <Text>Password VALUE : {password}</Text>

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
