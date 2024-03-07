import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useSound = (soundFile) => {
  const [sound, setSound] = useState();

  useEffect(() => {
    // Charger le son
    const loadSound = async () => {
      console.log('Loading sound');
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setSound(sound);
    };

    loadSound();

    return () => {
      // Nettoyage : décharger le son quand le hook est démonté
      console.log('Unloading sound');
      sound?.unloadAsync();
    };
  }, [soundFile]);

  // Fonction pour jouer le son
  const playSound = async () => {
    if (sound) {
      await sound.setPositionAsync(0); // Remet le son au début
      await sound.playAsync();
    }
  };

  return playSound;
};
