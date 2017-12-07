var firebase = require( 'firebase');
var LatLon = require('geodesy').LatLonSpherical;
var math = require( 'math');

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

var thunderpos={
lat:-38.015005699999996,
lon:-57.581600300000005};
var userpos=[];
var usertimedelay=[];

trueno=new LatLon(thunderpos.lat,thunderpos.lon);
console.log(trueno.lat,' ',trueno.lon);

var i;

for(i=0;i<=2;i++){
	let angle=math.random()*360;
	let distance=math.random()*9000;
	userpos.push(trueno.destinationPoint(distance, angle));
	usertimedelay[i]=distance*2.7548;
	console.log('sim user:',i,'is in',userpos[i].lat,'<>',userpos[i].lon,'/',distance,angle,'/',usertimedelay[i]);
}
i=0
for(i=0;i<=2;i++){
	let delay= usertimedelay[i];
	var a = setTimeout(function(userpos,delay,ii){
		rawDataRef.push({timedif:delay,createdAt:firebase.database['ServerValue']['TIMESTAMP'],pos:{lat:userpos.lat,lon:userpos.lon}},()=>{
			console.log('el usuario ',ii,' ah apretado el boton',delay,{timedif:delay,pos:{lat:userpos.lat,lon:userpos.lon}});
		});
		console.log('el timer de ',ii,' termino');
	},usertimedelay[i],userpos[i],usertimedelay[i],i);
}
setTimeout(()=>{console.log('el trueno deberia aparecer en el mapa pronto');process.exit(0)},math.max(...usertimedelay)+500);


