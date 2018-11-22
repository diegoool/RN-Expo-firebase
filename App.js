import React from 'react';
import {Text} from 'react-native';
import GuestNavigation from './app/navigations/guest';

import PreLoader from './app/components/PreLoader';

// Firebase
import firebaseConfig from './app/utils/firebase';
import * as firebase from 'firebase';
import NoEvents from './app/components/Events/NoEvents';

firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {

  constructor(){
    super();

    this.state = {
      isLogged: false,
      loaded: false
    }
  }
  
  // componentDidMount(){
  //   firebase.auth().signOut()
  // }

  async componentDidMount (){
    await firebase.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        this.setState({
          isLogged: true,
          loaded: true
        });
      } else {
          this.setState({
            isLogged: false,
            loaded: true
          });

      }
    })
  }

  render() {
        const {isLogged, loaded} = this.state;
        
        if(!loaded){
          return ( <PreLoader /> );
        }
        
        if(isLogged){
          return ( <NoEvents text="No hay eventos"/> );
        } else {
          return( <GuestNavigation /> );
        }

  }
}

