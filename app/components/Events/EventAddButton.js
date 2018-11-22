import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import AppButton from 'react-native'

export default class EventAddButton extends Component {
  render() {
      const {addEvent} = this.props;
    return (
      <View style={styles.buttonContainer}>
        <AppButton
            bgColor='rgba(255, 38, 74, 0.6)'
            title='Add event'
            action= {addEvent}
            iconName='plus'
            iconSize={30}
            iconColor='#fff'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0
    }
})
