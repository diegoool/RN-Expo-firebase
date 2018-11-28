import React, { Component } from 'react'
import BackgroundImg from '../../components/BackgroundImg'
import AppButton from '../../components/AppButton'
import { StyleSheet, View } from 'react-native'
import { options, Event } from '../../forms/event'
import t from 'tcomb-form-native';
import {Card} from 'react-native-elements';
const Form = t.form.Form;
import Toast from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

import firebase from '../../utils/firebase'
const database = firebase.database();

export default class EditEvent extends Component {

    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            event: params.event
        };
    }

    update () {

        const validate = this.refs.form.getValue();
        if(validate){
            let data = Object.assign({},validate);
            const ref = database.ref().child(`events/${this.state.event.id}`);
            ref.update(data)
            .then(()=>{
                const navigateAction = NavigationActions.navigate({
                    routeName: 'DetailEvent',
                    params: {event: this.state.event}
                });
                this.props.navigation.dispatch(navigateAction);
                this.refs.toast.show('Event updated!', 800);
            });
        }

    }


    onChange (event) {
        this.setState({event})
    }

    render(){
        const {event} = this.state;
        return (
            <BackgroundImg  source={require('../../../assets/images/img3.png')} >
                <View style={styles.container}>
                    <Card title="Edit Event" >
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
                        bgColor='rgba(255, 38, 74, 0.9)'
                        title='Republish'
                        action={this.update.bind(this)}
                        iconName='pencil'
                        iconSize={30}
                        iconColor='white'            
                    />                    
                    </Card>

                </View>
            </BackgroundImg>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        padding: 10
    }
})