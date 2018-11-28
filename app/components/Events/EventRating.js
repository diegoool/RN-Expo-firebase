import React, { Component } from 'react';
import {Rating, Text} from 'react-native-elements';
import { View } from 'react-native';

import firebase from '../../utils/firebase'
const database = firebase.database();


export default class EventRating extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating: 0
        };
        const {eventId} = props;
        this.commentsRef = database.ref(`comments/${eventId}`);
    }

    componentDidMount(){
        this.commentsRef.on('child_added', snapshot => {
            this.commentsRef.on('value', snap => {
                let comments = [];
                snap.forEach(row => {
                    comments.push(parseInt(row.val().rating));
                });
                this.setState({
                    /* Saber la media de los ratings */
                    rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
                });

                this.refs.rating.setCurrentRating(
                    /* Para ser actualizado el componente rating */
                    comments.reduce((previous, current) => previous + current, 0) / comments.length
                );
            })
        });
    }

    render() {
        const {rating} = this.state;
        return (
            <View>
                <Rating
                    ref='rating'
                    imageSize={20}
                    readonly
                    startingValue={rating}
                />
            </View>
        )
    }
}