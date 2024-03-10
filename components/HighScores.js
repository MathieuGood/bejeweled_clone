import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { getHighScores } from '../core/apiRequests'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function HighScores() {

  // Set high scores to null by default
  const [highScores, setHighScores] = useState(null)


  // Retrieve high scores when component is mounted
  useEffect(() => {
    getHighScores(setHighScores)
  }, [])

  return (

    <View style={styles.mainContainer}>

      {/* TODO : Adjust style to display scroll image */}

      {/* <View style={styles.scrollImageContainer}>
        <Image source={
          require('../assets/modal/topScroll.png')}
          style={styles.scrollImage}
        />
      </View> */}
        <View style={{flexDirection: 'row', gap: 10, justifyContent:'center'}}>
          <Text style={{
            textAlign: 'center',
            fontWeight: '700',
            marginBottom: 10,
            fontSize:17,
          }}>
            TOP 6 
          </Text>
          <Icon 
                name="trophy"
                size={20}
                color={'#e8b923'}
              />
          </View>

      <FlatList
        data={highScores}
        keyExtractor={(item, index) => {
          return `${item.rank}-${item.score}-${item.player_name}-${index}`
        }}
        renderItem={({ item }) => (
          <View style={styles.flatListRow}>
            
            <Text style={[styles.flatListCol, styles.rightCol]}> {item.rank}. {item.player_name}</Text>
            <Text style={[styles.flatListCol, styles.leftCol]}>{item.score} pts</Text>

          </View>
        )}
        onEndReachedThreshold={0.5}
      />

      {/* <View style={styles.scrollImageContainer}>
        <Image source={
          require('../assets/modal/bottomScroll.png')}
          style={styles.scrollImage}
        />
      </View> */}

    </View>

  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fdf7aa',
    width: '89%',
    paddingTop: 15,
    paddingBottom: 30,
    marginTop: 5,
    marginBottom:30
  },
  flatListRow: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#e8b923',
    opacity: 0.7,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',

    
  },
  flatListCol: {
    flex: 1,
    // justifyContent: 'center',
  },
  leftCol: {
    // width: '45%',
    textAlign: 'right',
    // marginEnd: 5,
    fontSize:17,
    fontFamily: 'Assassin'

  },
  rightCol: {
    // width: '55%',
    textAlign: 'left',
    marginStart: 5,
    fontSize:17,
    fontFamily: 'Assassin'

  },
})
