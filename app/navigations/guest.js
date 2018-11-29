import React from 'react';
import {createStackNavigator} from 'react-navigation';
import StartScreen from '../screens/Start';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

import {color} from '../themes/theme'

export default createStackNavigator(
    {
        Start: {
            screen: StartScreen,
        },
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        }
    },
    {
        initialRouteName: 'Start',
        navigationOptions: {
            headerStyle: {
                backgroundColor: color.primaryColor,
                borderBottomWidth: 0
            },
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 20,
                color: 'white',
                fontWeight: '300',
            },
            headerTintColor:'white'
        }
    }
)