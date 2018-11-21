import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'

export default class BackgroundImg extends Component {
  render() {
      const { source, children } = this.props
    return (
      <ImageBackground 
        source={source}
        style={{flex:1, width:null, height:null}}
      >
      {children}
      </ImageBackground>
    )
  }
}
