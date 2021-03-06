const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var geodist = require('geodist')//https://www.npmjs.com/package/geodist
var Math = require( 'math');

function intersection(x0, y0, r0, x1, y1, r1) {//thanks to 01AutoMonkey (heavily modified by me)
        var a, dx, dy, d, h, rx, ry;
        var x2, y2;

        /* dx and dy are the vertical and horizontal distances between
         * the circle centers.
         */

        //quick and dirty estimate that 111,111 meters (111.111 km) in the y direction is 1 degree (of latitude) and 111,111 * cos(latitude) meters in the x direction is 1 degree (of longitude).

        dx = (x1 - x0)*(111132.954 * Math.cos ( y0 ));
        dy = (y1 - y0)*(111132.954 - 559.822 * Math.cos( 2 * y0 ) + 1.175 * Math.cos( 4 * y0));

        /* Determine the straight-line distance between the centers. */
        d = geodist({lat:x0,lon:y0},{lat:x1,lon:y1},{exact: true, unit: 'meters'})//Math.sqrt((dy*dy) + (dx*dx));
        console.log('d:',d);

        /* Check for solvability. */
        if (d > (r0 + r1)) {
            /* no solution. circles do not intersect. */
            console.log('los circulos no se tocan',r0,r1,d);
            return false;
        }
        if (d < Math.abs(r0 - r1)) {
            /* no solution. one circle is contained in the other */
            console.log('los circulos estan uno en el otro',r0,r1,d);
            return false;
        }

        /* 'point 2' is the point where the line through the circle
         * intersection points crosses the line between the circle
         * centers.  
         */

         /*Length in meters of 1° of latitude(y) = always 111.32 km
			Length in meters of 1° of longitude (x)= 40075 km * cos( latitude ) / 360
			(40075000*Math.cos(y0)/360)
		*/

        /* Determine the distance from point 0 to point 2. */
        a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;
        console.log('a:',a);

        /* Determine the coordinates of point 2. */
        x2 = x0*(111132.954 * Math.cos ( y0 )) + (dx * a/d);
        y2 = y0*(111132.954 - 559.822 * Math.cos( 2 * y0 ) + 1.175 * Math.cos( 4 * y0)) + (dy * a/d);

        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        h = Math.sqrt((r0*r0) - (a*a));

        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        rx = -dy * (h/d);
        ry = dx * (h/d);

        /* Determine the absolute intersection points. */
        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        return [xi/(111132.954 * Math.cos ( y0 )), xi_prime/(111132.954 * Math.cos ( y0 )), yi/(111132.954 - 559.822 * Math.cos( 2 * y0 ) + 1.175 * Math.cos( 4 * y0)), yi_prime/(111132.954 - 559.822 * Math.cos( 2 * y0 ) + 1.175 * Math.cos( 4 * y0))];
    }

//agarro 2 de los circulos, los intersecto y me fijo cual de los puntos funciona mejor con el 3ro. capas si lo hago 3 veces y saco el medio queda mejor
function triangulate(pos,distance){//aca va la funcion de multilateration...
	let candidates = intersection(pos[0].lat,pos[0].lon,distance[0],pos[2].lat,pos[2].lon,distance[2]);
	console.log(pos[0].lat,pos[0].lon,distance[0],pos[2].lat,pos[2].lon,distance[2]);
	if (candidates==false){console.log('no hay interseccion')}else{console.log('interceccion obtenida',candidates);}
	
	let cand1pos = {lat:candidates[0],lon:candidates[2]};
	let cand2pos = {lat:candidates[1],lon:candidates[3]};//this is for simplicity and becasuse the nex fnction requiresit like that
	
	console.log(candidates);
	console.log('cand1:',cand1pos,'cand2:',cand2pos);
	console.log('se tienen candidatos, eliminadno uno');
	if(Math.abs(geodist(cand1pos,pos[1],{exact: true, unit: 'meters'})-distance[1])<=Math.abs(geodist(cand2pos,pos[1],{exact: true, unit: 'meters'})-distance[1])){//comparo las diferencias entre el radio y los candidatos
		return cand1pos;
	}else{
		return cand2pos;
	}
}

var currentSightings=[];//my list of raw data before it gets old (after it got old it gets deleted(or sent somewhere else))
var currentThunders=[];//this are not-yet-old thunders right before getting saved on the procesed thunders database

const thunderRef = functions.database.ref('thunders')

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

    			currentSightings.push({pos:pos,createdAt:createdAt,distace:distace,key:serverKey,timedif:sighting.timedif});//lo agrego al array
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
						}else{console.log('no se encontro par y se elimino el elemento', serverKey)}
	    		},60000);
	    		let matches=[];
    			currentSightings.map(el=>{//ahora le busco un par
    				
    				console.log('distacia:',geodist(el.pos,pos,{exact: true, unit: 'km'}),'   tiempo:',(el.createdAt-el.timedif)-(sighting.createdAt-sighting.timedif));

	    			if(
	    				(geodist(el.pos,pos,{exact: true, unit: 'km'})<20)&&                                     /*la distacia tiene que ser menor a 10km*/
	    				Math.abs((el.createdAt-el.timedif)-(sighting.createdAt-sighting.timedif))<1500)
	    				{                                                                                        /*y la diferencia entre el sighting del flash menor a 1.5 seg*///tener el cuenta que el flashtime se estima con el tiempo del servidor para sincronizar
	    				matches.push(el);//lo agrego a la lista de matches
	    				console.log('agregado a la lista de matches',matches.length);
	    				if(matches.length==2){//cuando tengo 2 matches validos trato de trangular(es == a 2 para qeu si hay mas de 3 sightings no hace dobles truenos)
	    					console.log('triangulando');
	    					let thunderpos=triangulate([pos,matches[0].pos,matches[1].pos],[distace+10,matches[0].distace+10,matches[1].distace+10]);
	    					console.log(thunderpos);
	    					admin.database().ref('/thunders').push({pos:thunderpos});
	    				}
	    			}
	    		});
    		} else {/*lo que haria con los viejos(?)*/}
    	});
});