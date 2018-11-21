import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import formValidation from '../utils/validation';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';

const Form = t.form.Form;

export default class Register extends Component {
    constructor() {
        super();

        this.state= {
            user: {
                email: '',
                password: ''
            }
        }

        this.samePassword = t.refinement(t.String, (s) => {
            return s === this.state.user.password
        })

        this.user = t.struct({
            email: formValidation.email,
            password: formValidation.password,
            password_confirmation: this.samePassword
        });

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
                },
                password_confirmation:{
                    help: 'Repite tu password',
                    error: 'Password no coincide',
                    password: true,
                    secureTextEntry: true
                }
            }
        };

        this.validate = null;
    }

    register(){
        if(this.validate){
            firebase.auth().createUserWithEmailAndPassword(
                this.validate.email,
                this.validate.password
            )
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
            .catch((error)=>{
                const errorMessage = error.message;

                Alert.alert(
                    errorMessage,
                    'Reemplazar por un Toast',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )   

            })
        }
    }

    onChange (user){
        this.setState({user});
        this.validate = this.refs.form.getValue();
    }

  render() {
    return (
        <BackgroundImg source={require('../../assets/images/img3.png')} >
            <View>
            <Card wrapperStyle={{paddingLeft: 10, paddingRight: 10}} title="Registrate" >
                    <Form
                        ref="form"
                        type={this.user}
                        options={this.options}
                        onChange={(v) => this.onChange(v)}
                        value={this.state.user}
                    />
                    <AppButton
                    bgColor='rgba(60, 208, 156, 0.7)'
                    title='Registrarme'
                    action={this.register.bind(this)}
                    iconName='user-plus'
                    iconSize={30}
                    iconColor='white'            
                />
                </Card>
            </View>
        </BackgroundImg>
    )
  }
}

