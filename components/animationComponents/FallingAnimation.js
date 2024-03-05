import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const FallingAnimation = ({ children }) => {
    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        const delay = Math.random() * 200; 
        Animated.timing(translateY, {
            toValue: 0, 
            duration: 800 + delay, 
            delay, 
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ transform: [{ translateY }], width: '100%', height: '100%' }}>
        {children}
    </Animated.View>
    
    );
};

export default FallingAnimation;
//animation pour faire tomber les artefacts dans la grille