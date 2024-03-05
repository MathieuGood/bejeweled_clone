import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useSound } from './SoundEffects'; 
import FontLoader from '../preloaderComponent/FontLoader'; // la font enlevée, à réessayer

const ScoreAnimation = ({ score }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; 
  const playScoreSound = useSound(require('../../assets/Sounds/ScoreSound.mp3'));

  useEffect(() => {
    // Jouer le son à chaque changement de score
    if (score > 0) {
      playScoreSound();
    }
  }, [score]);

  useEffect(() => {
    // Cycle d'animation pour l'effet de pulsation
    if (score > 0) {

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, // Agrandir légèrement
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Revenir à la taille normale
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  }
  }, [score]); 

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.text}>Score: {score}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginTop: 50,
  },
})

export default ScoreAnimation;
