import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { appThemes } from '../../themes/appThemes'


export default function GameTile({ tileReference, theme }) {

    const tileImages = appThemes.tiles[theme]

    return (

        <View style={styles.artifactContainer}>

            <Image
                source={tileImages[tileReference]}
                style={styles.tileImage}
            />

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
    tileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})