import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-easy-toast';
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
                    this.refs.toast.show('Login error facebook', 800);
				})
            } else if(type === "cancel") {
                this.refs.toast.show('Login canceled', 800);
            } else {
                this.refs.toast.show('Unknown error', 800);
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
            <Toast
                ref="toast"
                style={{backgroundColor:'red', padding:10}}
                position='top'
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:'white'}}
            />
        </BackgroundImg>
        )
    }
}
