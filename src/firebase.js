import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBcZc9I4-mpPt-Jb5pi-WPsG8XtzNqGh_Q",
    authDomain: "thunderfinder-1511460978320.firebaseapp.com",
    databaseURL: "https://thunderfinder-1511460978320.firebaseio.com",
    projectId: "thunderfinder-1511460978320",
    storageBucket: "thunderfinder-1511460978320.appspot.com",
    messagingSenderId: "380678706011"
  };
 export const firebaseApp=firebase.initializeApp(config);
 export const rawDataRef =firebase.database().ref('rawData');
 export const ThundersRef=firebase.database().ref('Thunders');