import React from 'react';
import PreLoader from './app/components/PreLoader';
// Firebase
import firebase from './app/utils/firebase';
const auth = firebase.auth();

import GuestNavigation from './app/navigations/guest';
import LoggedNavigation from './app/navigations/logged';

console.disableYellowBox = true;

export default class App extends React.Component {

  constructor(){
    super();

    this.state = {
      isLogged: false,
      loaded: false
    }
  }

  async componentDidMount (){
    await auth.onAuthStateChanged((user) => {
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
          return ( <LoggedNavigation /> );
        } else {
          return( <GuestNavigation /> );
        }

  }
}

