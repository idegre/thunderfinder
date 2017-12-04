import React, {Component} from 'react';
import './main.css';
import Sidebar from './components/sidebar'
import Mapcomp from './components/map'
import {geolocated} from 'react-geolocated';

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
			<div>v0.3 ALPHA - only basic functionality has been implemented (also: bugs)</div>
			<div className="topbar">
				<h1>thunder finder</h1>
			</div>
			{this.chechPositionAvalavility()}
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