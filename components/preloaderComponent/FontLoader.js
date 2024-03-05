// FontLoader.js
import React from 'react';
import { useFonts } from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Assassin: require("../../assets/fonts/Assassin$.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return children;
};

export default FontLoader;
   


//à voir comment l'intégrer