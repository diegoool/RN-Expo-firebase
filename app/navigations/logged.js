import React from 'react'
import EventsScreen from '../screens/Events/Events'
import AddEventScreen from '../screens/Events/AddEvent'
import DetailEventScreen from '../screens/Events/DetailEvent'
import EditEventScreen from '../screens/Events/EditEvent'
import LogoutScreen from '../screens/Logout'
import ProfileScreen from '../screens/Profile'

import {DrawerNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import {color} from '../themes/theme'

const navigationOptions = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: color.primaryColor,
            borderBottomWidth: 0
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
                drawerIcon: ({tintColor}) => (<Icon name='home' size={24} style={{ color: tintColor }} />),
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
        },
        DetailEvent: {
            screen: DetailEventScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Detail Event',
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home'),
                headerBackTitle: null
            })
        },
        EditEvent: {
            screen: EditEventScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Edit Event',
                headerRight: rightIcon(navigation, 'home'),
                headerTintColor: 'white'
            })
        }
    },
    navigationOptions
);

const profileScreenStack = StackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Profile',
                drawerIcon: ({tintColor}) => (<Icon name='user' size={24} style={{ color: tintColor }} />),
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
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
            drawerIcon: ({tintColor}) => (<Icon name='sign-out' size={24} style={{ color: tintColor }} />)
        })
    }
});

export default DrawerNavigator(
    {
        EventsScreen: {
            screen: eventsScreenStack
        },
        ProfileScreen: {
            screen: profileScreenStack
        },
        LogoutScreen: {
            screen: logoutScreenStack
        }
    },
    {
        drawerBackgroundColor: color.primaryColor,
        contentOptions:{
            color: 'white',
            activeTintColor: color.secondaryColor,
            inactiveTintColor: 'white',
            tintColor: 'white',
            activeBackgroundColor: 'transparent' ,
            itemsContainerStyle : {
                marginVertical: 0
            }
        }
    }
)