import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import formValidation from '../utils/validation';
import {Card} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
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
                this.refs.toast.show('Welcome', 800);            
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/email-already-in-use'){
                    this.refs.toast.show('This email is already registered.', 800);
                } else {
                    this.refs.toast.show(errorMessage, 800);  
                }     

            })
        }
    }

    onChange (user){
        this.setState({user});
        this.validate = this.refs.form.getValue();
    }

  render() {
    return (
        <BackgroundImg  source={require('../../assets/images/img3.png')} >
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

