import React, {Component} from 'react';
import Radio from './radio';
import BotonPrincipal from './botonPrincipal';
import {changePos} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

var geocoder = require('geocoder');

class Sidebar extends Component{

	constructor(props){
		super(props);
		this.state={
			addres:'',
			pos:{}
		}
	}

	geocode(){
		var poslocal=null;
		geocoder.geocode(this.state.addres,( err, data )=> {
			//poslocal=data.results[0].geometry.location;
			this.props.changePos(data.results[0].geometry.location);
		});
		setTimeout(()=>{},500);
	}

	componentDidUpdate(prevProps,prevState){
		if(this.state.pos=prevState.pos){
			
		}
	}

	
	render(){
		return(
			<div>
				<BotonPrincipal lat={this.props.lat} lon={this.props.lon} />
				<div >
				Instructions:
				<ul>
				<li>Press the button above when you see the light from a thunder.</li>
				<li>press it again once you heat the thunder.</li>
				<li>the red circle you see on the map is the distance to the thunder.</li>
				</ul>
				</div>
				<hr />
				<div>This website attempts to triangulate the thunder using the distance and position from 3 different users.
				if the thunder was triangulated it will appear on the map.
				</div>
				<hr />
				<div className="form-group">
					<input
						type="text"
						placeholder="your address"
						className="form-control"
						style={{}}
						onChange={event=>this.setState({addres:event.target.value})}
						onKeyPress={event=>{if (event.key==='Enter') {this.geocode()}}}
						/>
					<button
						className="btn btn-success"
						type="button"
						onClick={()=>{this.geocode()}}>set position</button>
				</div>
				<div>lat:{this.props.lon}</div>
				<div>lon:{this.props.lat}</div>
			</div>
		)
	}
}
export default connect(null,{changePos})(Sidebar);