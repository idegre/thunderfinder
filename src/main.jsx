import React, {Component} from 'react';
import './main.css';
import Sidebar from './components/sidebar'
import Mapcomp from './components/map'
import {geolocated} from 'react-geolocated';
import {Link} from 'react-router-dom';

class Main extends Component{
	chechPositionAvalavility(){
		if(this.props.isGeolocationAvailable&&(this.props.coords!=null)){
			return (
				<div className="abajo">
					<div className="map"><Mapcomp lat={this.props.coords.longitude} lon={this.props.coords.latitude} /></div>
					<div className="sidebar"><Sidebar lat={this.props.coords.longitude} lon={this.props.coords.latitude} /></div>
				</div>
			)
		} else {
			return (
				<div className="abajo">
					<div className="map"><Mapcomp  lat={-38.005880} lon={-57.543974}/></div>
					<div className="sidebar"><Sidebar lat={-38.005880} lon={-57.543974}/></div>
				</div>
				
			)}}

	render(){
		return(
			<div>
			<div>v0.5 BETA - only basic functionality has been implemented (also: bugs)</div>
			<div className="topbar">
				<h1>Thunderfinder</h1>
			</div>
			{this.chechPositionAvalavility()}
			<div className="bottombar">
				<div className="bottomabout"><Link to={'/About'}>about</Link></div>
				<div className="bottomcontact"><Link to={'/About'}>contact</Link></div>
			</div>
		</div>
		)
	}
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
}) (Main);