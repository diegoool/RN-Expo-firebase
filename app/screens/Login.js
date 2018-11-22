import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import formValidation from '../utils/validation';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';

const Form = t.form.Form;

import Toast from 'react-native-easy-toast';

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
                this.refs.toast.show('Welcome!', 800);
            })
            .catch((error)=> {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/wrong-password'){
                    this.refs.toast.show('Incorrect Password', 800);
                } else if (errorCode === 'auth/email-already-in-use'){
                    this.refs.toast.show('This email is already registered.', 800);
                } else {
                    this.refs.toast.show(errorMessage, 800);
                }
            })
        }

    }

    render (){

        return(
            <BackgroundImg source={require('../../assets/images/img1.png')}>
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