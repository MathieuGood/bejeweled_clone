import React from 'react'
import { Modal, StyleSheet, Dimensions, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'


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

                    <Text style={styles.modalText}>{title}</Text>

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
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#1E201C',
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: "uppercase",
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 15
    },
})