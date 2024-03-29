import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function TouchButton({ title, press, customStyle }) {

    const defaultStyle = {
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
    }

// If cutomStyle is passed, merge it with the defaultStyle
    if (customStyle) {
        defaultStyle.buttonText = { ...defaultStyle.buttonText, ...customStyle.buttonText }
        defaultStyle.buttonContainer = { ...defaultStyle.buttonContainer, ...customStyle.buttonContainer }
    }
    
    const styles = StyleSheet.create(defaultStyle)

    
    return (
        <View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={press}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}


