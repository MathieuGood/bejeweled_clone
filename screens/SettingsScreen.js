import React from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'

export default function SettingsScreen({navigation}) {

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text>Game settings</Text>
        </SafeAreaView>
    )
}

let styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'lightgray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
