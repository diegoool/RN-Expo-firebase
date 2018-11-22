import React, { Component } from 'react'
import * as firebase from 'firebase';

export default class Logout extends Component {
  
  componentDidMount(){
    firebase.auth().signOut()
    .then(()=>{
        console.log('Logout');
    })
    .catch(error => {
        console.log('Error Logout');
    })
  }

  render() {
    return null
  }
}
