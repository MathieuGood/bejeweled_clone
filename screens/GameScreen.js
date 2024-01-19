import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TouchButton from '../components/TouchButton'

export default function GameScreen({navigation}) {

    return (
        <View style={styles.mainContainer}>
        
            <Text>GameScreen</Text>

            <TouchButton
                title='Back to player screen'
                press={() => {
                    navigation.navigate('PlayerScreen')
                }}
            />
        
        </View>
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
