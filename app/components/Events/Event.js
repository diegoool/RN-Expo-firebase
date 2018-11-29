import React, {Component} from 'react';

import AppButton from "../AppButton";
import {Card, Text} from "react-native-elements";
import EventRating from "./EventRating";

export default class Event extends Component {
	render () {
		const {editEvent, goHome, event} = this.props;
		return (
			<Card
				title={event.name}
				image={require('../../../assets/images/event.png')}
			>
				<EventRating eventId={event.id} />

				<Text style={{marginBottom: 10, marginTop: 10}}>
					{event.description}
				</Text>

				<AppButton
					bgColor="rgba(255, 38, 74, 0.8)"
					title="Edit Event"
					action={editEvent}
					iconName="pencil"
					iconSize={30}
					iconColor="#fff"
				/>

				<AppButton
					bgColor="rgba(28, 25, 21, 0.7)"
					title="Go Back"
					action={goHome}
					iconName="arrow-left"
					iconSize={30}
					iconColor="#fff"
				/>

			</Card>
		)
	}
}