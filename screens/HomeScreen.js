import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ImageBackground } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'
import Header from '../components/Header'
import { checkCredentials } from '../core/apiRequests'

export default function HomeScreen({ navigation }) {

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const { email, password } = state

    // For debug : know when component renders
    // useEffect(() => {
    //     console.log('Component HomeScreen mounted')
    // })

    // QUESTIONS
    // - Move component styles to each component file ?


    return (
        <View style={styles.mainContainer}>

            <ImageBackground
                source={require('../assets/essai3.png')}
                style={styles.background}
                resizeMode='cover'
            >
                <View style={styles.form}>

                    <Header style={styles.header} title='Welcome' />

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
                            // On click, check if e-mail and password match
                            checkCredentials(email, password, navigation)
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
    },
    header: {
        color: '#2b50c8',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    },
})
