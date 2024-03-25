import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import TouchButton from '../TouchButton'
import IconButton from '../IconButton'
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
        password: '',
        passwordConfirmation: ''

    })

    const { name, email, password, passwordConfirmation } = state

    // Clear the fields when the modal is closed
    useEffect(() => {
        setState({ name: '', email: '', password: '', passwordConfirmation: '' })
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

            <TextField
                placeholder='Password confirmation'
                value={passwordConfirmation}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, passwordConfirmation: text }
                })}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <Text
                style={styles.privacyPolicy}
                onPress={() => { Alert.alert('Privacy Policy and GDPR Consent', privacyPolicy.privacyPolicy) }}
            >
                Click here to read our privacy policy
            </Text>

            <TouchButton
                title='Create account'
                press={() => checkUserEntryAndAddPlayer(name, email, password, passwordConfirmation, navigation, changeModalVisible)}
            />


            <View style={{ position: 'absolute', top: -26, right: -37 }}>
                <IconButton
                    iconName="close"
                    iconSize={39}
                    press={() => {
                        changeModalVisible(false);
                    }}
                />
            </View>

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