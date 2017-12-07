import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Radio from './radio';
import {ThundersRef} from '../firebase';

import {changePos} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

class Mapcomp extends Component{

	constructor(props){
		super(props);
		this.state={
			zoom:14,
			thunders:[],
			pos:{}
		}
	}

	componentDidMount(){
		ThundersRef.on('value',snap=>{
			let thunderstemp=[];
			snap.forEach(thunder=>{
				console.log('snap:',thunder.val());
				let pos={lat:thunder.val().pos.lat,lon:thunder.val().pos.lon};
				thunderstemp.push(pos);
				console.log('array:',thunderstemp);
			});
			this.setState({thunders:thunderstemp},function(){console.log('state 1:',this.state.thunders);});
		});
		console.log('state 1:',this.state.thunders);
	}

	shouldComponentUpdate(nextProps) {
    	const thunderlength = this.state.thunders.length!=0;
    	return thunderlength;
    }

	render(){
		const defaultZoom=14;
		/*muy importante la clase de css aca arriba por que el mapa hereda el tamaño, sino colapsa a 0*/
		const Thunders = this.state.thunders.map((thunder,index)=>(
			<span class="glyphicon glyphicon-flash casa"
				lat={thunder.lat}
				lng={thunder.lon}
				style={{
				color:'#F1C31F',
        position: 'absolute',
				width: 40,
				height: 40,
				left: -40 / 2,
				top: -40 / 2}}
				></span>
			));


		return(
			<div className="mapa">
				<GoogleMapReact
					bootstrapURLKeys={{key:'AIzaSyBVPXoOll9COvPv2SLCU0_VscNQPHv0GGg'}}
					defaultCenter={{lat:this.props.lat, lng: this.props.lon}} 
					defaultZoom={defaultZoom}
					onChange={event=>this.setState({zoom:event.zoom})}
					>
					<div class="glyphicon glyphicon-home casa"
					 	lat={this.props.lon}
          	lng={this.props.lat}
          	style={{
          		position: 'absolute',
					  	width: 40,
					  	height: 40,
					  	left: -40 / 2,
					  	top: -40 / 2}}
					></div>
					{Thunders}
					<Radio 
						zoom={this.state.zoom}
          	lat={this.props.lon}
          	lng={this.props.lat} />
				</GoogleMapReact>
			</div>
		)
		/*bootstrapURLKeys={{key:'AIzaSyBVPXoOll9COvPv2SLCU0_VscNQPHv0GGg',language: 'en'}}*/
		/*aparentemente el problema estaba en esa linea con la api, capaz el problema era con la api misma no se*/
	}
}

function mapStateToProps(state){
	console.log('en el map state:',state)
	return{
		position:state
	}
}

export default connect(mapStateToProps,null)(Mapcomp);