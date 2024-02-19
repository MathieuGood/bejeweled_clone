import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { getHighScores } from '../core/apiRequests'

export default function HighScores() {

  // Set high scores to null by default
  const [highScores, setHighScores] = useState(null)


  // Retrieve high scores when component is mounted
  useEffect(() => {
    getHighScores(setHighScores)
  }, [])

  return (

    <View style={styles.mainContainer}>

      <Text style={{
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 10,
      }}>
        TOP 6
      </Text>

      <FlatList
        data={highScores}
        keyExtractor={(item, index) => {
          `${item.rank}-${item.score}-${item.player_name}-${index}`
        }}
        renderItem={({ item }) => (
          <View style={styles.flatListRow}>
            <Text style={[styles.flatListCol, styles.leftCol]}>{item.score}</Text>
            <Text style={[styles.flatListCol, styles.rightCol]}>{item.player_name}</Text>
          </View>
        )}
        onEndReachedThreshold={0.5}
      />

    </View>

  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f2f2f2',
    width: '80%',
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 12,
    marginBottom: 20,
  },
  flatListRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  flatListCol: {
    flex: 1,
    // justifyContent: 'center',
  },
  leftCol: {
    // width: '45%',
    textAlign: 'right',
    marginEnd: 5
  },
  rightCol: {
    // width: '55%',
    textAlign: 'left',
    marginStart: 5
  }
})
