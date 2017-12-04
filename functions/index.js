const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//import * as firebase from 'firebase';

/*const config = {
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

	},3)//creo un timer con su ID unico de 3 segundos(ese es el timepo que tiene para encontrar otro sighting)
	currentThunders.push({pos,createdAt,distace,serverKey})
})*/

var geodist = require('geodist')//https://www.npmjs.com/package/geodist

var currentSightings=[];//my list of raw data before it gets old (after it got old it gets deleted(or sent somewhere else))
var currentThunders=[];//this are not-yet-old thunders right before getting saved on the procesed thunders database

exports.sightingMatcher=functions.database.ref('rawData')//esto va a tener que ser una entry table que se fije si es nuevo y dsps ahaga lo demas
    .onWrite(event => {
    	console.log('triggered');
    	event.data.forEach(deltaSnap =>{
    		if(deltaSnap.changed()){
    			let sighting = deltaSnap.val();
    			console.log('new sighting',sighting);
    			let pos= sighting.pos;
    			let createdAt = sighting.createdAt;
    			let distace=(sighting.timedif)*0.343;
    			let timedif=sighting.timedif;
    			let serverKey = deltaSnap.key;
				console.log('datos sacados',pos,createdAt,distace,serverKey);
    			currentSightings.push({pos:pos,createdAt:createdAt,distace:distace,key:serverKey});//lo agrego al array
    			console.log('array: ',currentSightings);
				//rawDataRef.child(serverKey).remove();//los saco de la mesade entrada
				//console.log('sighting removed from entry table');
				/*dynaTimer = serverKey + `=setTimeout(()=>{
				if(currentSightings.splice(currentSightings.indexOf({` + serverKey + `}),1)==[]){
					console.log('no se encontro par y no se puedo eliminar` + serverKey +`')
				} else{console.log('no se encontro par y se elimino el elemento `+ serverKey +`)}
				}`+',4);';*///creo un timer con su ID unico de 4 segundos(ese es el timepo que tiene para encontrar otro sighting)
	    		//eval(dynaTimer);//todo lo anterios es una string y aca la ejecuto, entonces me quedan los server keys como variables metidos ahi
	    		//dynaTimer=null;//devuelvo dyantimer a null para volver a usarla//all of this useless
	    		let timer=setTimeout(()=>{
	    				if(currentSightings.splice(currentSightings.indexOf({key:serverKey}),1)==[]){
							console.log('no se encontro par y no se puedo eliminar', serverKey)
						}else{console.log('no se encontro par y se elimino el elemento'+ serverKey)}
	    		},60000);
    			currentSightings.map(el=>{//ahora le busco un par
	    			if((geodist(el.pos,pos,{exact: true, unit: 'km'})>10/*la distacia tiene que ser menor a 10km*/)&&
	    				abs((el.createdAt-el.timedif)-(createdAt-timedif))<1500/*y la diferencia entre el sighting del flash menor a 1.5 seg*/){//tener el cuenta que el flashtime se estima con el tiempo del servidor para sincronizar

	    			}
	    		});
    		} else {/*lo que haria con los viejos(?)*/}
    	});
});
