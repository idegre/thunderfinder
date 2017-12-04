import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Radio from './radio';

class Mapcomp extends Component{
	

	constructor(props){
		super(props);
		this.state={
			zoom:14
		}
	}

	render(){
		const defaultZoom=14;
		/*muy importante la clase de css aca arriba por que el mapa hereda el tamaño, sino colapsa a 0*/
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
export default Mapcomp;