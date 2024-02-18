import React from 'react'
import { Text, View } from 'react-native'


export default function Header({ title, style }) {

    return (

      <View>
        <Text style={style}>{title}</Text>
      </View>

    )
}
