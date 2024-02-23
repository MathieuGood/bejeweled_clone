import React, { useEffect, useState } from 'react'
import TouchButton from '../TouchButton'
import TextField from '../TextField'
import CustomModal from './CustomModal'
import { checkEmailAndPasswordMatch } from '../../core/userEntryCheck'

export default function LoginModal({
    changeModalVisible,
    visible,
    navigation,
    title,
}) {

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const { email, password } = state

    useEffect(() => {
        // Clear the fields when the modal is closed
        setState({ email: '', password: '' })
    },
        [visible])

    return (
        <CustomModal
            visible={visible}
            title={title}
            changeModalVisible={changeModalVisible}
        >

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
                    // On click, check if fields are not empty
                    // Then, check if e-mail and password match
                    checkEmailAndPasswordMatch(email, password, navigation, changeModalVisible)
                }}
            />

            <TouchButton
                title="Close"
                press={() => {
                    changeModalVisible(false)
                }}
            />

        </CustomModal>
    )

}
