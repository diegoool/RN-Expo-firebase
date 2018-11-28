import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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
                epost: '',
                lösenord: ''
            }
        }

        this.samePassword = t.refinement(t.String, (s) => {
            return s === this.state.user.password
        })

        this.user = t.struct({
            epost: formValidation.email,
            lösenord: formValidation.password,
            password_confirmation: this.samePassword
        });

        this.options = {
            fields: {
                epost: {
                    help: 'Skriv in din epost',
                    error: 'Felaktig epost',
                    autoCapitalize: 'none'
                },
                lösenord:{
                    help: 'Skriv in ditt lösenord',
                    error: 'Minst sex (6) tecken',
                    password: true,
                    secureTextEntry: true
                },
                password_confirmation:{
                    help: 'Bekräfta lösenord',
                    error: 'Lösenordet matchar inte',
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
                    this.refs.toast.show('Denna epostadress är redan registrerad.', 800);
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
        <BackgroundImg source={require('../../assets/images/img2.png')} >
            <View>
            <Card wrapperStyle={styles.container} title="Skapa ett konto" >
                    <Form
                        ref="form"
                        type={this.user}
                        options={this.options}
                        onChange={(v) => this.onChange(v)}
                        value={this.state.user}
                    />
                    <AppButton
                    bgColor='rgba(60, 208, 156, 0.7)'
                    title='Skapa'
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 0,
        paddingLeft: 10, paddingRight: 10
    }
})