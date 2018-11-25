import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from 'react-native'

export class AppButton extends Component {
  render() {
      const {action, iconName, title, bgColor, iconColor} = this.props
      const {width} = Dimensions.get('window') // Ocupar el 100% del objeto window
    return (
        <Button
            onPress={action}
            buttonStyle={{
                backgroundColor: bgColor,
                height: 45,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
                marginBottom: 5,
                width: width
            }}
            title={title}
            icon={
                <Icon
                name={iconName}
                size={15}
                color={iconColor}
                />
            }
            text={title}
            // iconRight={true}
        >
        </Button>
    )
  }
}

export default AppButton
