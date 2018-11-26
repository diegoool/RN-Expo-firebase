import React, {Component} from 'react';

import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native';
import BackgroundImg from '../../components/BackgroundImg';
import Event from '../../components/Events/Event';
import CommentForm from '../../components/Comment/CommentForm';
import CommentList from '../../components/Comment/CommentList'

export default class DetailEvent extends Component{
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            event: params.event
        };

    }

    editEvent () {
        const navigateAction = NavigationActions.navigate({
            routeName: 'EditEvent',
            params: {event: this.state.event}
        });
        this.props.navigation.dispatch(navigateAction);
        
    }
    
    goHome () {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ListEvents'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render (){
        const { event } = this.state;
        return(
        <BackgroundImg source={require('../../../assets/images/img3.png')}>
            <ScrollView>
                <Event
                    goHome={this.goHome.bind(this)}
                    editEvent={this.editEvent.bind(this)}
                    event={event}
                />
                <CommentForm eventId={event.id} />

                <CommentList eventId={event.id} />
            </ScrollView>
        </BackgroundImg>
        )
    }
    
}