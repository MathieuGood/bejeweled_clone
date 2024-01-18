import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function TouchButton({ title, press }) {

    return (
        <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={press}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonText: {
        color: '#e8b923',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        //fontFamily: 'Egyptian Hieroglyphs Bold' (voir comment l'intégrer cf module caméra, la logique est à peu près identique)
    },
    buttonContainer: {
        backgroundColor: '#2b50c8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        width: 250,
        height: 61,
        alignSelf: 'center',
        margin: 5
    }
})