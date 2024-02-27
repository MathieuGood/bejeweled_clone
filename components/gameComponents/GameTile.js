import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { appThemes } from '../../themes/appThemes'


export default function GameTile({
    tileReference,
    firstPress,
    rowIndex,
    colIndex,
    theme
}) {

    const tileImages = appThemes.tiles[theme]

    const isFirstPress = firstPress ? firstPress[0] === rowIndex && firstPress[1] === colIndex : false;

    return (

        <View style={[styles.tileContainer, isFirstPress && styles.highlight]}>

            <Image
                source={tileImages[tileReference]}
                style={styles.tileImage}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    tileContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: 'rgba(176, 141, 87, 0.5)'
    },
    tileImage: {
        width: '95%',
        height: '95%',
        resizeMode: 'contain',
    },
    highlight: {
        backgroundColor: 'red'
    }
})