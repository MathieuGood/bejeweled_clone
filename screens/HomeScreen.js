import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import TouchButton from '../components/TouchButton'

export default function HomeScreen() {

    return (
        <SafeAreaView style={styles.mainContainer}>

            <Text>Bejeweled Clone HomeScreen</Text>
            <TouchButton title='Test button' press={() => console.log("test button has been pressed")} />

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor: 'gray',
        flex: 1
    }
})
