import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet} from 'react-native';
import { useSound } from './SoundEffects'; 


const TriesLeftAnimation = ({ attempts }) => {
  const opacityAnim = useRef(new Animated.Value(1)).current; 
  const playScoreSound = useSound(require('../../assets/Sounds/wrong.mp3'));


  useEffect(() => {
    if (attempts === 2 || attempts === 1) {
      playScoreSound();


      const blinkAnimation = Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(blinkAnimation, { iterations: 3 }).start();
    } else {
      // Réinitialisation de l'opacité à 1 si le nombre d'attempts est supérieur à 2
      opacityAnim.setValue(1);
    }
  }, [attempts, opacityAnim]);

  return (
    <Animated.Text style={[styles.text, { opacity: opacityAnim }]}>
      Tries left: {attempts}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 50,
  },
});

export default TriesLeftAnimation;
