import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const MovingAnimation = ({ children, startXY, endXY, setIsMoving }) => {
  const moveAnim = useRef(new Animated.ValueXY(startXY)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: endXY,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (setIsMoving) setIsMoving(false);
    });
  }, [endXY, moveAnim, setIsMoving]);

  const style = {
    transform: moveAnim.getTranslateTransform(),
  };

  return <Animated.View style={style}>{children}</Animated.View>;
};

export default MovingAnimation;
