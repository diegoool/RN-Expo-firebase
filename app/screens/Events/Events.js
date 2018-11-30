import React, { Component } from 'react'
import BackgroundImg from '../../components/BackgroundImg'
import PreLoader from '../../components/PreLoader'
import { StyleSheet, FlatList } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import NoEvents from '../../components/Events/NoEvents'
import EventAddButton from '../../components/Events/EventAddButton'

import firebase from '../../utils/firebase'
const database = firebase.database();

export default class Events extends Component {
    constructor(){
        super();

        this.state = {
            events: [],
            loaded: false,
            logo_event: require('../../../assets/images/logo_event.png'),
            search: ''
        };

    }
    
    componentDidMount(){
        const {search} = this.state;
        
        if (!search){
            this.refEvents = database.ref().child('events');
        } else {
            this._filterEvents(search)
        }

        this._loadFirebaseEvents();
        
    }

    _loadFirebaseEvents (){
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

    searchEvents (search){
        this.setState({
            search: search.charAt(0).toUpperCase() + search.slice(1)
        });
        
        if(search.length >= 3){
            this._filterEvents(search);
            setTimeout(() => {
                this._loadFirebaseEvents();
            }, 800);
        } else if (search.length == 0) {
            this.resetSearch();
        }
    }
   
    resetSearch (){
        this.setState({
            search: ''
        });
        this.refEvents = database.ref().child('events');
        setTimeout(() => {
            this._loadFirebaseEvents();
        }, 800);
    }

    _filterEvents (search) {
        this.refEvents = database.ref().child('events')
            .orderByChild('name')
            .startAt(search)
            .endAt(`${search}\uf8ff`);
    }
   
    render() {
        const { loaded, events } = this.state;
        
        const searchBar = (
            <SearchBar
                platform="ios"
                showLoading
                cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                placeholder='Sök event...'
                onChangeText={(text)=> this.searchEvents(text)}
                onClear={this.resetSearch.bind(this)}
                value={this.state.search}
            />
        )

        if(!loaded){
            return (
            <BackgroundImg source={require('../../../assets/images/img3.png')}>
            {searchBar}
            <PreLoader />
            </BackgroundImg>
            )
        }

        if(!events.length){
            return (
            <BackgroundImg source={require('../../../assets/images/img3.png')}>
                {searchBar}
                <NoEvents text='No events' />
                <EventAddButton addEvent={this.addEvent.bind(this)} />
            </BackgroundImg>
            );
        }
        
        return (
            <BackgroundImg source={require('../../../assets/images/img3.png')}>
                {searchBar}
                <FlatList
                    data={events}
                    renderItem={(data) => this.renderEvent(data.item)}
                    keyExtractor={(data) => data.id}
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
