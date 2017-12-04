import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBcZc9I4-mpPt-Jb5pi-WPsG8XtzNqGh_Q",
    authDomain: "thunderfinder-1511460978320.firebaseapp.com",
    databaseURL: "https://thunderfinder-1511460978320.firebaseio.com",
    projectId: "thunderfinder-1511460978320",
    storageBucket: "thunderfinder-1511460978320.appspot.com",
    messagingSenderId: "380678706011"
  };

const firebaseApp=firebase.initializeApp(config);

const rawDataRef =firebase.database().ref('rawData');
const ThundersRef=firebase.database().ref('Thunders');

currentSightings=[];//my list of raw data before it gets old (after it got old it gets deleted(or sent somewhere else))
currentThunders=[];//this are not-yet-old thunders right before getting saved on the procesed thunders database

rawDataRef.on('value',snap=>{
	let {pos,createdAt}= goal.val();
	let distace=goal.val().timedif*0.343;
	let serverKey = goal.key;
	currentSightings.push({pos,createdAt,distace,serverKey});//lo agrego al array
	rawDataRef.child(serverKey).remove();//los saco de la mesade entrada
	/*eval $serverkey=setTimeout(()=>{

	},3)*///creo un timer con su ID unico de 3 segundos(ese es el timepo que tiene para encontrar otro sighting)
	currentThunders.push({pos,createdAt,distace,serverKey})
})