import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class NoEvents extends Component {
  render() {
      const {text} = this.props;
    return (
      <View style={styles.noEventsView}>
        <Text style={styles.noEventsText}>
            {text}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    noEventsView: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    noEventsText: {
        backgroundColor: 'rgba(10, 255, 10, 0.8)',
        color: 'white',
        textAlign: 'center',
        padding: 20
    }

})
