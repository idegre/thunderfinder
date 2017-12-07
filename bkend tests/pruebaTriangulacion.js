var geodist = require('geodist')//https://www.npmjs.com/package/geodist
var Math = require( 'math');

var LatLon = require('geodesy').LatLonSpherical;

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

var thunderpos={
lat:-38.015005699999996,
lon:-57.581600300000005};

trueno=new LatLon(thunderpos.lat,thunderpos.lon);

var userpos=[];
var distance=[];

for(i=0;i<2;i++){
	let angle=Math.random()*360;
	let dist=Math.random()*9000;
	userpos.push(trueno.destinationPoint(distance, angle));
	distance.push(dist);
	console.log('sim user:',i,'is in',userpos[i].lat,'<>',userpos[i].lon,'/',distance[i],'/',angle);
	if(isNaN(userpos[i].lat)){i--;dist=5000;};
}


userpos.push({lat:-37.96565981070231,lon:-57.6555144821553});
distance.push(8489.068344907279);
console.log('sim user:',2,'is in',userpos[2].lat,'<>',userpos[2].lon,'/',distance[2]);


console.log('triangulando');
let test=triangulate([userpos[0],userpos[1],userpos[2]],[distance[0],distance[1],distance[2]]);
console.log(test);
process.exit(0);