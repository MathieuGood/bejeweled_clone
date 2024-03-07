import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { appThemes } from '../../themes/appThemes';
import FallingAnimation from '../animationComponents/FallingAnimation';
import HintAnimation from '../animationComponents/HintAnimation';
import MovingAnimation from '../animationComponents/MovingAnimation'; // Assurez-vous que le chemin d'importation est correct

export default function GameTile({
    tileReference,
    firstPress,
    rowIndex,
    colIndex,
    theme,
    animate,
    moving // Ajout de la prop pour déterminer si l'animation de déplacement doit être appliquée
}) {
    const tileImages = appThemes.tiles[theme];
    const isFirstPress = firstPress ? firstPress[0] === rowIndex && firstPress[1] === colIndex : false;

    // Décider quelle animation enveloppe le contenu de la tuile
    const content = (
        <Image source={tileImages[tileReference]} style={styles.tileImage} />
    );

    const AnimatedContent = animate ? (
        <MovingAnimation startXY={{ x: 0, y: 0 }} endXY={{ x: 100, y: 100 }}>{content}</MovingAnimation> // Utilisation conditionnelle de MovingAnimation

    ) : moving ? (
        <HintAnimation>{content}</HintAnimation>
    ) : (
        <FallingAnimation>{content}</FallingAnimation> // FallingAnimation appliquée par défaut
    );

    return (
        <View style={[styles.tileContainer, isFirstPress && styles.highlight]}>
            {AnimatedContent}
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
