import React, {Component} from 'react';

class About extends Component{
	render(){
		return(
			<div>
			<h1 style={{textAlign: 'center'}}>about this site:</h1>
			<div style={{marginLeft: '20%',marginRight: '20%'}}>
			this site was developed as an experiment on triangulation of thunders via time delay of the thunder sound from multiple users. It takes the user position either via their gps or the adress bar under
			the button and intructions on the sidebar and sends it to a database. There it's compared with other reports drom the las 90 seconds and if it is within 20km and 1.5 seconds of one another
			(the light flash time) they are considered to be from the same thunder. And if 3 reports from the same thunder are reported, the thunder is triangulated and added to the list of succesful triangulations.
			Then it finally appears on the map.
			</div>
			<hr  style={{marginLeft: '20%',marginRight: '20%'}} />
			<div style={{marginLeft: '20%',marginRight: '20%'}}>
			This site was built using:
			<ul>
				<li>React</li>
				<li>node</li>
				<li>firebase</li>
			</ul>
			<hr  />
			Made by Ignacio Degregori in Mar del Plata, Argentina
			</div>
			<div style={{marginLeft: '20%',marginRight: '20%'}}>
			<ul>
			<li>Email: ignacio.degregori@gmai.com</li>
			<li>LinkedIn: <a href="https://www.linkedin.com/in/ignacio-degregori-389aa0109?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bmui6ZOblR5eLSu0mEab1Cg%3D%3D">linkedin.com/in/ignacio-degregori-389aa0109</a></li>
			<li>Facebook: I don't use facebook...</li>
			<li>github:<a href="https://github.com/idegre">https://github.com/idegre</a></li>
			</ul>
			</div>
			</div>
			)
	}
}
export default About;