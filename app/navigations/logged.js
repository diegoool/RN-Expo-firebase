import React from 'react'
import EventsScreen from '../screens/Events/Events'
import AddEventScreen from '../screens/Events/AddEvent'
import LogoutScreen from '../screens/Logout'

import {DrawerNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const navigationOptions = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'rgba(200, 38, 74, 1)'
        },
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold'
        }
    }
};

const leftIcon = (navigation, icon) => <Icon
        name={icon}
        style={{marginLeft: 20}}
        size={20}
        color='white'
        onPress={() => navigation.navigate('DrawerOpen')}
    />

    const rightIcon = (navigation, icon) => <Icon
        name={icon}
        style={{marginRight: 20}}
        size={25}
        color='white'
        onPress={() => navigation.navigate('ListEvents')}
    />

const eventsScreenStack = StackNavigator(
    {
        ListEvents: {
            screen: EventsScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Events',
                drawerIcon: ({tintColor}) => (<Icon name='home' size={24} style={{ color: tintColor}} />),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddEvent: {
            screen: AddEventScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Add Event',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    },
    navigationOptions
);

const logoutScreenStack = StackNavigator({
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Logout',
            drawerIcon: ({tintColor}) => (<Icon name='sign-out' size={24} style={{ color: tintColor}} />)
        })
    }
});

export default DrawerNavigator(
    {
        EventsScreen:{
            screen: eventsScreenStack
        },
        LogoutScreen:{
            screen: logoutScreenStack
        }
    },
    {
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions:{
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent' ,
            inactiveTintColor: 'white',
            itemsContainerStyle : {
                marginVertical: 0
            }
        }
    }
)