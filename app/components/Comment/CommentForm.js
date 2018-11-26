import React, { Component } from 'react'
import AppButton from "../AppButton"
import {options, Comment} from '../../forms/comment'
import t from 'tcomb-form-native'
const Form = t.form.Form
import {Card} from 'react-native-elements'
import { View } from 'react-native'
import * as firebase from 'firebase'
import Toast from 'react-native-easy-toast'

export default class CommentForm extends Component {
    constructor(){
        super();
        this.state = {
            comment: {
                comment: '',
                rating: 1
            }
        };
    }

    addComment(){
        const validate = this.refs.form.getValue();
        if(validate){
            let data = {};
            let comment = Object.assign({}, validate);
            let ref = firebase.database().ref().child('comments');
            const key = ref.push().key;

            data[`${this.props.eventId}/${key}`] = comment;

            ref.update(data)
            .then(()=>{
                this.setState((prevState, props)=>{
                    return {
                        comment: {
                            comment: '',
                            rating: 1
                        }
                    }
                });
                this.refs.toast.show('Comment published!', 800);
            })
        }
        
    }
    
    onChange (comment) {
        this.setState({comment})

    }

  render() {
      const {comment} = this.state;
    return (
      <Card title='Comment on this event'>
        <View>
            <Form
                ref='form'
                type={Comment}
                options={options}
                value={comment}
                onChange={(v) => this.onChange(v)}
            />
        </View>
        <AppButton
            bgColor="rgba(255, 38, 74, 0.9)"
            title="Publish comment"
            action={this.addComment.bind(this)}
            iconName="comments"
            iconSize={30}
            iconColor="#fff"
        />
        <Toast
                ref="toast"
                style={{backgroundColor:'green', padding:10}}
                position='top'
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:'white'}}
            />
      </Card>
    )
  }
}
