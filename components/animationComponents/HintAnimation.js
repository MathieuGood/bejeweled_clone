import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const HintAnimation = ({ children }) => {
  const animation = useRef(new Animated.Value(1)).current;
  const repeatCount = useRef(0); // Compteur pour le nombre de répétitions
  const maxRepeats = 3; // Nombre maximum de répétitions souhaitées

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(animation, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]);

    const animatedLoop = Animated.loop(
      sequence,
      {
        iterations: maxRepeats 
      }
    );

    animatedLoop.start(() => {
    });

    return () => animatedLoop.stop(); // Nettoyage
  }, [animation]);

  return (
    <Animated.View style={{ opacity: animation }}>
      {children}
    </Animated.View>
  );
};

export default HintAnimation;
