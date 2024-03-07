import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomModal2 ({
    visible,
    changeModalVisible,
    title,
    children,
})  {
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
                  <View style={styles.icon}>
                    <MaterialIcons  name="close" size={65} color= 'white' />
                  </View>   
                    <Text style={styles.modalText}>{title}</Text>
                    {children}
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={() => changeModalVisible(false)}
                    >
                        <Text style={styles.textStyle}>OK</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'red',
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        alignItems:"center",
        justifyContent : 'center',
        position:'absolute',
        top:  -45,
        elevation: 5,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    Button: {
        backgroundColor: "red",
        padding: 10,
        margin: 20,
        width: '70%',
        borderRadius: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:20
    }
});
