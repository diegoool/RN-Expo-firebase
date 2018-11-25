import React, {Component} from 'react';

import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native';
import BackgroundImg from '../../components/BackgroundImg';

export default class DetailEvent extends Component{
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            event: params.event
        };

    }

    editEvent () {
        
    }
    
    goHome () {

    }

    render (){
        const { event } = this.state;
        return(
        <BackgroundImg source={require('../../../assets/images/img3.png')}>
            <ScrollView>
                
            </ScrollView>
        </BackgroundImg>
        )
    }
    
}