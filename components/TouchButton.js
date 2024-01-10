import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function TouchButton({ title, press }) {

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={press}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonText: {
        color: '#FF004D',
        alignSelf: 'center',
        fontWeight: '800',
        fontSize: 14,
        letterSpacing: 0.9
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '85%',
        borderRadius: 5,
        backgroundColor: '#FAEF5D',
        paddingVertical: 10,
        marginVertical: 5
    }
})