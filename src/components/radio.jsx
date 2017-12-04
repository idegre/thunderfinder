import React, {PropTypes,Component} from 'react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import '../main.css'
import {currentThunder, initialPress} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

var a=null;
//voy a hacer un componente radio qeu este en el medio y se pueda definir su tamaño via prop
class Radio extends Component{

	constructor(props) {
    	super(props);
    	this.state={
    		size:0,
    		timer:500,
    		wasactive:0
    	}
 	}

 	componentDidUpdate(){
 		/*setTimeout(()=>{
 			if(this.props.thunder.active!==1){
 				this.setState({timer:500,wasactive:0});
 				if (this.state.wasactive===1)
 					{this.setState({size:this.props.thunder.radious*2});}
 				this.forceUpdate();
 			}else{
 				if(this.state.wasactive==1){
 				this.setState({size:this.state.size+14.52});}
 				else{this.setState({timer:20,wasactive:1,size:0})}
 			}
 		},this.state.timer);*/
 		/*setInterval(()=>{this.setState({size:this.props.thunder.radios*2});this.forceUpdate();},500)*/
 		if(this.state.size!=0&&this.state.wasactive==0&&this.props.thunder.active==1){this.setState({size:0});clearTimeout(a);a=null;}
 		a=setTimeout(()=>{
 			if(this.props.thunder.active!=1){
 				if(this.state.wasactive==1){this.setState({wasactive:0,size:this.props.thunder.radious*2})}
 			}else{
 				var presize=this.state.size;
 				this.setState({wasactive:1,size:presize+3.63})
 			}
 		},5)
 	}//after 20ms it does ()=>this...
	render(){
		const { w, h } = meters2ScreenPixels(this.state.size, {lat:this.props.lat,lng:this.props.lng} /* marker coords*/, this.props.zoom /* map zoom*/);
	 	const styletest = {
	  		position: 'absolute',
	  		width: w,
	  		height: h,
	  		left: -w / 2,
	  		top: -h / 2,
	  		background:'red',
	  		opacity:'0.3',
	  		borderRadius: w/2
		}//THATS HOW YOU CENTER IT!!!!!
		const stylered={background: 'red'}
		const styleblue={background: 'blue' }
		let style=styletest;
		return(
			<div
				className="circulo"
				style={style}
				onMouseOver={()=>style=styleblue}
				onMouseLeave={()=>style=stylered}
				></div>
		)/*no se hoverea asi, cuando hoveres le pasan un prop y usas ese para cambiar entre 2 style sheets*/
	}
}

function mapStateToProps(state){
	return{
		thunder:state
	}
}
export default connect(mapStateToProps,{currentThunder, initialPress})(Radio);//aca no tengo nada en el otro por que estoy reciviendo