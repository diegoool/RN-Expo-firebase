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
        title: 'Expo App'
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
					console.log(error)
					// Toast.showWithGravity('Error accediendo con facebook', Toast.LONG, Toast.BOTTOM);
				})
            } else if(type === "cancel") {
                console.log('cancel')
                // Toast.showWithGravity('Inicio de sesón cancelado', Toast.LONG, Toast.BOTTOM);
            } else {
                console.log('desconocido')
			// Toast.showWithGravity('Error desconocido', Toast.LONG, Toast.BOTTOM);
		}
	}

    // async facebook(){
    //     const {type, token} = await Expo.Facebook.logInWithReadPermissionsAssync(
    //         facebookConfig.config.application_id,
    //         { permissions: facebookConfig.config.permissions }
    //     )

    //     if(type === 'success'){
    //         const credentials = firebase.auth.FacebookAuthProvider.credential(token);
    //         firebase.auth().signInWithCredential(credentials)
    //         .catch((error)=>{

    //             Alert.alert(
    //                 'Error accediendo con Facebook',
    //                 'Reemplazar por un Toast',
    //                 [
    //                     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //                 ],
    //                 { cancelable: false }
    //             )   

    //         })
        
    //     } else if (type === 'cancel'){

    //         Alert.alert(
    //             'Inicio de sesion cancelado',
    //             'Reemplazar por un Toast',
    //             [
    //                 {text: 'OK', onPress: () => console.log('OK Pressed')},
    //             ],
    //             { cancelable: false }
    //         )   

    //     } else {

    //         Alert.alert(
    //             'Error desconocido',
    //             'Reemplazar por un Toast',
    //             [
    //                 {text: 'OK', onPress: () => console.log('OK Pressed')},
    //             ],
    //             { cancelable: false }
    //         )   

    //     }
    // }
  
    async google(){

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
                <AppButton
                    bgColor='rgba(255, 89, 90, 0.7)'
                    title='Google'
                    action={this.google.bind(this)}
                    iconName='google'
                    iconSize={30}
                    iconColor='white'
                />
            </View>
        </BackgroundImg>
        )
    }
}
