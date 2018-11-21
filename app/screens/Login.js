import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import formValidation from '../utils/validation';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';

const Form = t.form.Form;

import Toast from 'react-native-root-toast';

export default class Login extends Component{

    constructor(){
        super();

        this.user = t.struct({
            email: formValidation.email,
            password: formValidation.password
        });

        this.state = {
            visible: false
        };

        this.options = {
            fields: {
                email: {
                    help: 'introduce tu email',
                    error: 'Email incorrecto',
                    autoCapitalize: 'none'
                },
                password:{
                    help: 'introduce tu password',
                    error: 'Password incorrecto',
                    password: true,
                    secureTextEntry: true
                }
            }
        };
    }

    login () {
        const validate = this.refs.form.getValue();
        if (validate) {
            firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
            .then(()=>{
                Alert.alert(
                    'Welcome!',
                    'Reemplazar por un Toast',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )   
            })
            .catch((error)=> {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/wrong-password'){
                    Alert.alert(
                        'Password Incorrecto',
                        'Reemplazar por un Toast',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )   
                } else {
                    Alert.alert(
                        errorMessage,
                        'Reemplazar por un Toast',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )   

                }
            })
        }

    }

    render (){

        return(
            <BackgroundImg source={require('../../assets/images/img1.png')} >
            <View>
                <Card wrapperStyle={{paddingLeft: 10, paddingRight: 10}} title="Iniciar Sesion" >
                    <Form
                        ref="form"
                        type={this.user}
                        options={this.options}
                    />
                    <AppButton
                    bgColor='rgba(60, 208, 156, 0.7)'
                    title='Login'
                    action={this.login.bind(this)}
                    iconName='sign-in'
                    iconSize={30}
                    iconColor='white'            
                />
                </Card>
            </View>
            </BackgroundImg>
        )
    }
}