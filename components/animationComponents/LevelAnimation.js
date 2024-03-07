import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { appThemes } from '../../themes/appThemes'; 


const createParticleAnimation = () => ({
  x: new Animated.Value(0),
  y: new Animated.Value(0),
  opacity: new Animated.Value(1),
});

const backgroundImage = appThemes.tiles.detailed[4]; 

const LevelAnimation = ({ level }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (level > 1) {
      
      const newParticles = Array(5).fill(null).map(createParticleAnimation);
      setParticles(newParticles);

      // Animer les particules
      newParticles.forEach((particle) => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(particle.x, {
              toValue: Math.random() * 200 - 50, 
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(particle.y, {
              toValue: Math.random() * 200 - 50, 
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0, // Fade out
              duration: 700,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });

      // Animation de pulsation pour le changement de niveau
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [level]); 

  return (
    <View style={{ alignItems: 'center' }}>
      {particles.map((particle, index) => (
        <Animated.Image
          key={index}
          source={backgroundImage}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 5,
            opacity: particle.opacity,
            transform: [
              { translateX: particle.x },
              { translateY: particle.y },
            ],
          }}
        />
      ))}
      <Animated.Text style={[styles.text, { transform: [{ scale: scaleAnim }] }]}>
        Level: {level}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
 text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginTop: 50,

  },
});

export default LevelAnimation;
