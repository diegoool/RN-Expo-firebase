import React, { Component } from 'react'
import PreLoader from "../PreLoader"
import BackgroundImg from "../BackgroundImg"
import { View, StyleSheet, FlatList } from 'react-native'
import { Card, Divider, Text } from 'react-native-elements'
import * as firebase from 'firebase'
import NoComments from './NoComments'
import Comment from './Comment'

export default class CommentList extends Component {

    constructor(){
        super();
        this.state = {
            comments: [],
            loaded: false
        };
    }

    componentDidMount(){
        firebase.database().ref(`comments/${this.props.eventId}`).on('value', snapshot => {
            let comments = [];
            snapshot.forEach(row => {
                comments.push({
                    id: row.key,
                    rating: row.val().rating,
                    comment: row.val().comment
                });
            });
            this.setState({
                comments,
                loaded: true
            });
        })
    }

    render () {
        const {comments, loaded} = this.state;

        if(!loaded) {
            return( <PreLoader /> )
        }

        if(!comments.length) {
            return( <NoComments />
            )
        }
        
        return( 
            <View style={styles.container}>
                <Text style={styles.title}>Opinions</Text>
                <Divider style={styles.divider} />
                <Card>
                    <FlatList
                        data={comments}
                        renderItem={(data) => this.renderComments(data.item)}
                        keyExtractor={(data) => data.id}
                    />
                </Card>
            </View>
        );
    }

    renderComments(comment){
        return (
           <Comment comment={comment}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
    divider : {
        backgroundColor: 'red'
    }
})

