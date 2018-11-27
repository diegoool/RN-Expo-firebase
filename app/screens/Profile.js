import React, {Component} from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import {Card} from "react-native-elements";
import Toast from 'react-native-easy-toast';

import { FormInput } from 'react-native-elements'

import AppButton from "../components/AppButton";
// import Toast from 'react-native-simple-toast';

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				name: '',
				age: ''
			}
		}
	}

	componentDidMount () {
		this.fetch().then(() => {
			this.refs.toast.show('Saved data', 800);
		})
	}

	updateName (val) {
		let state = this.state.user;
		this.setState({
			user: Object.assign({}, state, {
				name: val
			})
		});
	}

	updateAge (val) {
		let state = this.state.user;
		this.setState({
			user: Object.assign({}, state, {
				age: val
			})
		});
	}

	render () {
		const {user} = this.state;
		return (
			<BackgroundImg source={require('../../assets/images/img2.png')}>
				<Card>
					<FormInput
						placeholder="Nombre del usuario"
						shake={true}
						value={user.name}
						onChangeText={(val) => this.updateName(val)}
					/>
					<FormInput
						placeholder="Edad del usuario"
						shake={true}
						value={user.age}
						onChangeText={(val) => this.updateAge(val)}
					/>
					<View style={{marginTop: 12}}>
						<AppButton
							bgColor="rgba(203, 78, 72, 0.9)"
							title="Guardar en local"
							action={this.save.bind(this)}
							iconName="save"
							iconSize={30}
							iconColor="#fff"
						/>
					</View>
				</Card>
				<Toast
					ref="toast"
					style={{backgroundColor:'gray', padding:10}}
					position='bottom'
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{color:'white'}}
				/>
			</BackgroundImg>
		);
	}

	async save () {
		try {
			const user = {
				name: this.state.user.name,
				age: this.state.user.age
			};
			await AsyncStorage.setItem('user', JSON.stringify(user));
			this.refs.toast.show('User saved', 800);
		} catch (error) {
			this.refs.toast.show('Error saving', 800);
		}
	}
	
	async fetch () {
		try {
			let user = await AsyncStorage.getItem('user');
			if(user) {
				let parsed = JSON.parse(user);
				this.setState({user: parsed});
			}
		} catch (error) {
			this.refs.toast.show('Error getting user', 800);
		}
	}
}