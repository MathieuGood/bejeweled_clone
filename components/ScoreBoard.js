import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ScoreBoard = ({ score, level, attempts }) => {
  return (
    <View style={styles.mainContainer}>

      <View style={styles.Container}>
        <Text style={styles.info}> Level : {level} </Text>
      </View>

      <View style={styles.Container}>
        <Text style={styles.info}>Score : {score}</Text>
      </View>

      <View style={styles.Container}>
        <Text style={styles.info}> Tries left : {attempts} </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Container: {
    backgroundColor: '#2b50c8',
    borderRadius: 5,
    padding: 10,
    bottom: 10,
    right: 10,
    margin: 5
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e8b923',
  },
});

export default ScoreBoard
