import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ level, nextLevel, progress }) => {
  return (
    <View style={styles.container}>

      
      {/* <View style={styles.levelCircle}>
         probablement à supprimer  les deux cercles car possibilité de sauter des niveaux 
        <Text style={styles.levelText}>{level}</Text> 
      </View> */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      {/* <View style={styles.levelCircle}>   
        <Text style={styles.levelText}>{nextLevel}</Text> 
        probablement à supprimer les deux cercles car pas forcément level + 1 
      </View>  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  levelCircle: {
    width: 58,
    height: 58,
    borderRadius: 29, 
    backgroundColor: '#2b50c8',
    borderWidth:  1,
    borderColor: '#e8b923',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    color: '#e8b923',
    fontWeight: 'bold',
    fontSize : 19
  },
  progressBarContainer: {
    height: 30,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E7E3E3',
    marginHorizontal: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#e8b923',
  },
});

export default ProgressBar;
