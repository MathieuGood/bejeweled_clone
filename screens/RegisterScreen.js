import React, { useState } from 'react'
import { StyleSheet, ImageBackground, View, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import TextField from '../components/TextField'
import { checkUserEntryAndAddPlayer } from '../core/userEntryCheck'
import Header from '../components/Header'


export default function RegisterScreen({ navigation }) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = state


    return (
        <View style={styles.mainContainer}>

            <ImageBackground
                source={require('../assets/RegisterBK2.png')}
                style={styles.background}
                resizeMode='cover'
            >

                <View style={styles.form}>
                <Header style={styles.header} title='Create new account'/>

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
                            navigation.navigate('LoginScreen')
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
