import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function Header({ title}) {

    return (

      <View>
        <Text style={styles.header}>{title}</Text>
      </View>

    )
}

const styles = StyleSheet.create({
  header: {
    color: '#2b50c8',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20
},
})

