import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ScoreBoard = ({ score, level, attempts }) => {
  return (
    <View style={styles.mainContainer}>

      <View style={styles.buttonContainer}>
        <Text style={styles.text}> Level : {level} </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Score : {score}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.text}> Tries left : {attempts} </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: '#2b50c8',
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e8b923',
  },
})

export default ScoreBoard
