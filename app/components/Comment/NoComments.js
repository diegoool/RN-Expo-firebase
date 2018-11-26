import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class NoComments extends Component {
  render() {
        return (
        <View style={styles.noCommentsView}>
            <Text style={styles.noCommentsText}>
                0 comments
            </Text>
        </View>
        )
  }
}

const styles = StyleSheet.create({
    noCommentsView: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    noCommentsText: {
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        padding: 20
    }

})
