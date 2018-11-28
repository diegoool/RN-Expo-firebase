import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { Card } from 'react-native-elements'
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';

import facebook from '../utils/fb';

export default class Start extends Component  {

    static navigationOptions ={
        title: ''
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
        <BackgroundImg source={require('../../assets/images/img2.png')} style={{alignItems:'stretch', flex:1}}>
                <Image source={require('../../assets/title.png')} style={{alignSelf:'center', marginBottom : 30}}/>
                <Card containerStyle={styles.container}>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 24, fontWeight:'bold', color: 'white'}} h1>Välkommen</Text>
                    <View style={{justifyContent:'center', flexDirection: 'column', alignContent: 'flex-end',}}>
                    <View style={{height: 150}} >
                        <AppButton
                            bgColor='rgba(60, 208, 156, 0.7)'
                            title='Logga In'
                            action={this.login.bind(this)}
                            iconName='sign-in'
                            iconSize={30}
                            iconColor='white'            
                        />
                    </View>
                    <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 18, color: 'white'}}>
                        Har du inget konto?
                    </Text>
                    <View style={{height: 70, flexDirection: 'row'}} >
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
                    </View>
                </Card>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 0,
        padding: 20
    }
})
