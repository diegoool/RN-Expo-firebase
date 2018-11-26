import React, { Component } from 'react'
import BackgroundImg from '../../components/BackgroundImg'
import PreLoader from '../../components/PreLoader'
import { StyleSheet, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation'
import NoEvents from '../../components/Events/NoEvents'
import EventAddButton from '../../components/Events/EventAddButton'

export default class Events extends Component {
    constructor(){
        super();

        this.state = {
            events: [],
            loaded: false,
            logo_event: require('../../../assets/images/logo_event.png')
        };

        this.refEvents = firebase.database().ref().child('events');
    }

    componentDidMount(){
        this.refEvents.on('value', snapshot => {
            let events = [];
            snapshot.forEach(row => {
                events.push({
                    id: row.key,
                    name: row.val().name,
                    address: row.val().address,
                    capacity: row.val().capacity,
                    description: row.val().description
                })
            });

            this.setState({
                events,
                loaded: true
            });
        })
    }

    addEvent () {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddEvent'
        });
        this.props.navigation.dispatch(navigateAction);
    }
    
    eventDetails (event) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailEvent',
            params: {event: event}
        });
        this.props.navigation.dispatch(navigateAction);
    }
    
    renderEvent (event) {
        return(
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${event.name} (Capacidad: ${event.capacity})`}
                avatar= {this.state.logo_event}
                onPress={() => this.eventDetails(event)}
                rightIcon={{name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle}}
            />
        )

    }
   
    render() {
        const { loaded, events } = this.state;
        
        if(!loaded){
            return (
            <PreLoader />
            )
        }

        if(!events.length){
            return (
            <BackgroundImg source={require('../../../assets/images/img3.png')}>
                <NoEvents text='No events' />
                <EventAddButton addEvent={this.addEvent.bind(this)} />
            </BackgroundImg>
            );
        }
        
        return (
            <BackgroundImg source={require('../../../assets/images/img3.png')}>
                <FlatList
                    data={events}
                    renderItem={(data) => this.renderEvent(data.item)}
                />
                <EventAddButton addEvent={this.addEvent.bind(this)} />
            </BackgroundImg>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: '#rgba(255, 38, 74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: '#rgba(206, 206, 206, 0.6)'
    },
})
