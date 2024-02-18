import React from 'react'
import { Text, View } from 'react-native'


export default class Header extends React.Component {

  render() {

    const { title, style } = this.props

    return (

      <View>
        <Text style={style}>{title}</Text>
      </View>
    
    )
  }
}
