import { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { firebaseConfig } from './constants';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

const messaging = firebase.messaging();

export const getMessagingToken = async () => {
	let currentToken = '';
	if (!messaging) return;
	try {
		currentToken = await messaging.getToken({
			vapidKey:
				'BGSM5AvK6FeyKjbE4jma40XoC-u2DzvUyuDPiH5HExYzFQEDrMgnO2m5QKJyD6Ah3FAwDWMN113ApBDBB9Ok28w',
		});
		console.log('FCM registration token', currentToken);
	} catch (error) {
		console.log('An error occurred while retrieving token. ', error);
	}
	return currentToken;
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		messaging.onMessage((payload) => {
			resolve(payload);
		});
	});
