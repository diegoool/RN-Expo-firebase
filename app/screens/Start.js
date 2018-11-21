import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
// import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';

import facebook from '../utils/fb';

export default class Start extends Component  {

    static navigationOptions ={
        title: 'Woo App'
    }

    login(){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login'
        })
        this.props.navigation.dispatch(navigateAction)

    }
    
    register(){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Register'
        })
        this.props.navigation.dispatch(navigateAction)

    }
    

    async facebook () {
		const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
			facebook.config.application_id,
			{ permissions: facebook.config.permissions }
		);

		if(type === "success") {
			const credentials = firebase.auth.FacebookAuthProvider.credential(token);
			firebase.auth().signInAndRetrieveDataWithCredential(credentials)
				.catch(error => {
					Alert.alert(
                        'Error accediendo con facebook',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )   
				})
            } else if(type === "cancel") {
                Alert.alert(
                    'Inicio de sesion cancelado',
                    'Reemplazar por un Toast',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )   
            } else {
                Alert.alert(
                    'Error desconocido',
                    'Reemplazar por un Toast',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )   
		}
	}
  
    
    render(){
        return(
        <BackgroundImg source={require('../../assets/images/img2.png')}>
            <View style={{justifyContent:'center', flex:1}}>
                <AppButton
                    bgColor='rgba(60, 208, 156, 0.7)'
                    title='Enter'
                    action={this.login.bind(this)}
                    iconName='sign-in'
                    iconSize={30}
                    iconColor='white'            
                />
                <AppButton
                    bgColor='rgba(240, 163, 16, 0.7)'
                    title='Register'
                    action={this.register.bind(this)}
                    iconName='user-plus'
                    iconSize={30}
                    iconColor='white'
                />
                <AppButton
                    bgColor='rgba(47, 118, 194, 0.7)'
                    title='Facebook'
                    action={this.facebook.bind(this)}
                    iconName='facebook'
                    iconSize={30}
                    iconColor='white'
                />
            </View>
        </BackgroundImg>
        )
    }
}
