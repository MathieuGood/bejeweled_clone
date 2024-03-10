import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { appThemes } from '../../themes/appThemes';
import FallingAnimation from '../animationComponents/FallingAnimation';
import HintAnimation from '../animationComponents/HintAnimation';

export default function GameTile({
    tileReference,
    firstPress,
    rowIndex,
    colIndex,
    theme,
    animate 
}) {
    const tileImages = appThemes.tiles[theme];
    const isFirstPress = firstPress ? firstPress[0] === rowIndex && firstPress[1] === colIndex : false;

    const content = animate ? (
        <HintAnimation>
            <Image source={tileImages[tileReference]} style={styles.tileImage} />
        </HintAnimation>
    ) : (
        // `FallingAnimation` s'exécute par défaut sans besoin de props spécifiques
        <Image source={tileImages[tileReference]} style={styles.tileImage} />
    );

    return (
        <View style={[styles.tileContainer, isFirstPress && styles.highlight]}>
            
            <FallingAnimation>
                {content}
            </FallingAnimation>
        </View>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: 'rgba(176, 141, 87, 0.5)',
    },
    tileImage: {
        width: '95%',
        height: '95%',
        resizeMode: 'contain',
    },
    highlight: {
        backgroundColor: 'red',
    },
});
