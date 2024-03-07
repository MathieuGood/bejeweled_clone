import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const MovingAnimation= ({ children, startXY, endXY }) => {
  const moveAnim = useRef(new Animated.ValueXY(startXY)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: endXY,
      duration: 500,
      useNativeDriver: true, // Maintenant cela fonctionne car nous utilisons transform
    }).start();
  }, [endXY, moveAnim]);

  // Utilisation de transform pour animer
  const style = {
    transform: moveAnim.getTranslateTransform(),
  };

  return <Animated.View style={style}>{children}</Animated.View>;
};

export default MovingAnimation;
