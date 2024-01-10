import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'

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


    // Check if e-mail and password match the entry in the databse
    function checkCredentials(email, password) {
        const bodyData = {
            player_email: email,
            player_password: password
        };

        fetch('http://mathieubon.com:3001/checklogin', {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => response.json())
            .then((json) => {
                // If credentials are valid, navigate to PlayerScreen
                if (json) {
                    console.log('Password OK')
                    navigation.navigate('PlayerScreen')
                } else {
                    console.log('Password wrong')
                    Alert.alert(
                        'Error',
                        'E-mail or password are incorrect',
                        [
                            { text: 'OK' }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
                checkCredentials(email, password)
            }}
            />

            <TouchButton title='Create account' press={() => {
                navigation.navigate('RegisterScreen')
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
