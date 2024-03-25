import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import TouchButton from '../TouchButton'
import IconButton from '../IconButton'
import TextField from '../TextField'
import CustomModal from './CustomModal'
import { checkUserEntryAndUpdatePassword } from '../../core/userEntryCheck'


export default function UpdatePasswordModal({
    changeModalVisible,
    visible,
    navigation,
    title,
    route
}) {

    const [state, setState] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
    })

    const { currentPassword, newPassword, newPasswordConfirmation } = state

    // Clear the fields when the modal is closed
    useEffect(() => {
        setState({ currentPassword: '', newPassword: '', newPasswordConfirmation: '' })
    },
        [visible])

    return (
        <CustomModal
            visible={visible}
            title={title}
            changeModalVisible={changeModalVisible}
        >

            <TextField
                placeholder='Current password'
                value={currentPassword}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, currentPassword: text }
                })}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <TextField
                placeholder='New password'
                value={newPassword}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, newPassword: text }
                })}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <TextField
                placeholder='New password confirmation'
                value={newPasswordConfirmation}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, newPasswordConfirmation: text }
                })}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <TouchButton
                title='Update password'
                press={() => checkUserEntryAndUpdatePassword(route.params.player_id, currentPassword, newPassword, newPasswordConfirmation, navigation, changeModalVisible)}
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