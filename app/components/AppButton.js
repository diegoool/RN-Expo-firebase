import React, { Component } from 'react'
import { Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'
import {Dimensions, StyleSheet} from 'react-native';

export default class AppButton extends Component {
  render() {
      const {action, iconName, title, bgColor, iconColor} = this.props
    return (
        <Button
            raised
            title={title}
            onPress={action}
            rightIcon={{name:iconName, color:iconColor, type:'font-awesome', size: 20}}
            buttonStyle= {styles.buttonStyle}
            backgroundColor={bgColor}
        >
        </Button>
       
    )
  }
}

const {width} = Dimensions.get('window').width;

const styles = StyleSheet.create({
    
    buttonStyle: {
        padding: 10,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        marginBottom: 5,
        width: width
    }
})
