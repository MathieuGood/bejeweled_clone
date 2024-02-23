import React, { useState, useEffect } from 'react'
import TouchButton from '../TouchButton'
import TextField from '../TextField'
import CustomModal from './CustomModal'
import { checkUserEntryAndAddPlayer } from '../../core/userEntryCheck'


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