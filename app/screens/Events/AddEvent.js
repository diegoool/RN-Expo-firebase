import React, {Component} from 'react';
import BackgroundImg from '../../components/BackgroundImg';
import AppButton from '../../components/AppButton';
import {View, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {options, Event} from '../../forms/event'
import t from 'tcomb-form-native';
import {Card} from 'react-native-elements';
const Form = t.form.Form;
import Toast from 'react-native-easy-toast';

export default class AddEvent extends Component {
    constructor (){
        super();
        this.state = {
            event: {
                name: '',
                address: '',
                capacity: 0,
                description: ''
            }
        };
    }

    save () {

        const validate = this.refs.form.getValue();
        if(validate){
            let data = {};
            const key = firebase.database().ref().child('events').push().key;
            // validate es = a decir this.state.event
            data[`events/${key}`] = this.state.event;
            firebase.database().ref().update(data)
            .then(()=>{
                this.refs.toast.show('Event published!', 800);
                this.props.navigation.navigate('ListEvents');
            });
        }

    }

    onChange (event){
        this.setState({event});
    }

    render (){
        const {event} = this.state;

        return (
            <BackgroundImg source={require('../../../assets/images/img3.png')}>
            <View style={styles.container}>
                <Card title='Event Form'>
                    <View>
                        <Form
                            ref='form'
                            type={Event}
                            options={options}
                            value={event}
                            onChange={(v) => this.onChange(v)}
                        />
                    </View>
                    <AppButton
                        bgColor='rgba(255, 38, 74, 0.7)'
                        title='Publish'
                        action={this.save.bind(this)}
                        iconName='plus'
                        iconSize={30}
                        iconColor='white'            
                    />
                </Card>
            </View>
            <Toast
                ref="toast"
                style={{backgroundColor:'green', padding:10}}
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
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        padding: 10
    }
})