import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function TouchButton({ title, press, customStyle }) {

    // If customStyleSheet has been passed, use it, otherwise use the default styles
    const buttonStyle = customStyle ? StyleSheet.create(customStyle) : styles

    return (
        <View>
            <TouchableOpacity
                style={buttonStyle.buttonContainer}
                onPress={press}
            >
                <Text style={buttonStyle.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles =  StyleSheet.create({
    buttonText: {
        color: '#e8b923',
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    buttonContainer: {
        backgroundColor: '#2b50c8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 9,
        height: 50,
        alignSelf: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#e8b923',
        elevation: 50,

    }
})