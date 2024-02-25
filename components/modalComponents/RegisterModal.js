import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text } from 'react-native'
import TouchButton from '../TouchButton'
import TextField from '../TextField'
import CustomModal from './CustomModal'
import { checkUserEntryAndAddPlayer } from '../../core/userEntryCheck'
import privacyPolicy from '../../assets/privacyPolicy'


export default function RegisterModal({
    changeModalVisible,
    visible,
    navigation,
    title,
}) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = state

    // Clear the fields when the modal is closed
    useEffect(() => {
        setState({ name: '', email: '', password: '' })
    },
        [visible])

    return (
        <CustomModal
            visible={visible}
            title={title}
            changeModalVisible={changeModalVisible}
        >

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

            <Text
                style={styles.privacyPolicy}
                onPress={() => {Alert.alert('Privacy Policy and GDPR Consent', privacyPolicy.privacyPolicy)}}
                >
                Click here to read our privacy policy
            </Text>

            <TouchButton
                title='Create account'
                press={() => checkUserEntryAndAddPlayer(name, email, password, navigation, changeModalVisible)}
            />

            <TouchButton
                title='Close'
                press={() => {
                    changeModalVisible(false)
                }}
            />

        </CustomModal>
    )

}

const styles = StyleSheet.create({
    privacyPolicy: {
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 10
    }
})