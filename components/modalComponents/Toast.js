import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';

export default function Toast({
    visible,
    changeModalVisible,
    title,
    iconName = "close",
    buttonText = "OK",
    buttonText2 = "No",
    iconColor = 'white',
    buttonColor = 'red',
    iconBackgroundColor = 'red',
    showCancelButton = false,
    widthButton = "70%",
    warning,
    press

}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => changeModalVisible(false)}
        >
            <BlurView
                style={styles.centeredView}
                tint="dark"
                intensity={50}
            >
                <View style={styles.modalView}>
                    <View style={[styles.icon, { backgroundColor: iconBackgroundColor }]}>
                        <MaterialIcons name={iconName} size={65} color={iconColor} />
                    </View>

                    <Text style={styles.modalText}>{title}</Text>
                    <Text style={styles.warning}>{warning}</Text>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={[styles.Button, { backgroundColor: buttonColor }, { width: widthButton }]}
                            onPress={() => {
                                changeModalVisible(false)
                                press && press()
                            }}
                        >
                            <Text style={styles.textStyle}>{buttonText}</Text>
                        </TouchableOpacity>

                        {showCancelButton && (
                            <TouchableOpacity
                                style={[styles.Button, { backgroundColor: "grey" }, { width: widthButton }]}
                                onPress={() => changeModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>{buttonText2}</Text>

                            </TouchableOpacity>
                        )}
                    </View>

                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%'
    },
    modalText: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 50
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: 'center',
        position: 'absolute',
        top: -45,
        elevation: 5,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    Button: {
        padding: 10,
        margin: 20,
        borderRadius: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20
    },
    warning: {
        textAlign: 'center',
        margin: 20
    }
});
