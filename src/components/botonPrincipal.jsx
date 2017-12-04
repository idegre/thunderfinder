import React, {Component} from 'react';
import {rawDataRef} from '../firebase';
import * as firebase from 'firebase';
import {currentThunder, initialPress} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

class BotonPrincipal extends Component{
	constructor(props){
	super(props);
	this.state={btnColor:'#D7C738',
		flash:0,
		flashTime:null,};
	}
	
	logEvent(){
		let flashTime=null;
		let timeDif=null;
		if (this.state.flash===0) {
			this.setState({flash:1,btnColor:'#848484'});
			/*marco el tiempo inicial en una variable*/
			flashTime=Date.now();
			console.log('flash recorded',flashTime);
			this.setState({flashTime})
			this.props.initialPress(1,0)
			//me falta la logica de hacer que cansele el trueno dsps de un tiempo
		}
		else {
			this.setState({flash:0,btnColor:'#D7C738'});
			/*obtengo la diferencia ahsta el trueno*/
			timeDif=Date.now()-this.state.flashTime;
			this.setState({timeDif});
			console.log('thunder recorded',timeDif);
			/*hago una funcion que suba los datos y capaz calcule la distacia en el sidebar*/
			//the createdAt key is replaced at the server for the server time
			rawDataRef.push({flashtime:this.state.flashTime,timedif:timeDif,createdAt:firebase.database['ServerValue']['TIMESTAMP'],pos:{lat:this.props.lat,lon:this.props.lon}});
			this.props.currentThunder(0,timeDif);
			this.setState({flashTime:null});
			/*aca podria tirar la dif de tiempo y el tipo final en el redux y agarrarlo en otra parte*/
		}
	}

	ComponentDidMount(){
		rawDataRef.on('value',snap=>{
			snap.forEach(entry=>{console.log('entry',entry.time)})
		});
	}
	render(){
		return(
			<button 
				className="btn btn-success"
				style={{
					width:'100%',
					height:'60px',
					background:this.state.btnColor}}
					onClick={()=>this.logEvent()}
				>{(this.state.flash==0)?'saw the flash':'heard the thunder'}</button>
		)
	}
}


export default connect(null,{currentThunder, initialPress})(BotonPrincipal);