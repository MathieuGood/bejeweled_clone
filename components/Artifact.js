import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'

export default function Artifact({ artifactNumber, press }) {

    const artifactsImages = {
        '': require('../assets/brickwall.png'),
        0: require('../assets/1.png'),
        1: require('../assets/2.png'),
        2: require('../assets/3.png'),
        3: require('../assets/4.png'),
        4: require('../assets/9.png'),
        5: require('../assets/6.png'),
        6: require('../assets/40.png'),
        7: require('../assets/30.png'),
    }


    function onCellPress(row, col) {
        console.log(`Cell pressed: ${row}, ${col}`);
    }

    return (

        <View style={styles.artifactContainer}>

            <Image source={artifactsImages[artifactNumber]} style={styles.artifactImage} />

        </View>
    )
}


const styles = StyleSheet.create({
    artifactContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'rgba(176, 141, 87, 0.5)'
    },
    artifactImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})