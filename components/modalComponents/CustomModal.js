import React from 'react'
import { Modal, StyleSheet, Dimensions, View } from 'react-native'
import { BlurView } from 'expo-blur'
import Header from '../Header'


export default function CustomModal({
    children,
    visible,
    changeModalVisible,
    title
}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => changeModalVisible(false)}
        >

            <BlurView
                style={styles.blur}
                tint='dark'
                intensity={20}
            >

                <View style={styles.modal}>

                    <Header title={title} />

                    {children}

                </View>

            </BlurView>

        </Modal >
    )
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    blur: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    modal: {
        alignItems: 'center',
        marginVertical: '30%',
        width: windowWidth - 50,
        padding: 20,
        borderWidth: 2,
        borderColor: '#d4af37',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(244, 232, 193, 0.95)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})