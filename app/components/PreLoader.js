import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native'
import BackgroundImg from './BackgroundImg'

const {height} = Dimensions.get('window').height // Tomar la altura del dispositivo

export default class PreLoader extends Component {
    render(){
        return(
            <BackgroundImg 
                source={require('../../assets/splash.png')}
                style={[styles.preloader]}
            >
                <ActivityIndicator style={{height:80, color: '#fff'}} size="large" />
            </BackgroundImg>
        )
    }
}

const styles = StyleSheet.create({
    preloader:{
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height: height,
        backgroundColor: '#4353FF'
    }
})