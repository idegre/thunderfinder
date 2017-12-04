import React, {Component} from 'react';
import Radio from './radio';
import BotonPrincipal from './botonPrincipal';

class Sidebar extends Component{


	render(){
		return(
			<div>
				<BotonPrincipal lat={this.props.lat} lon={this.props.lon} />
				<div >
				{console.log('sidebarporps',this.props)}
				</div>
				<div>lat:{this.props.lon}</div>
				<div>lon:{this.props.lat}</div>
				/*aca va el lighting data*/
				/*y opciones del mapa*/
				{console.log('props',this.props)}
			</div>
		)
	}
}

export default Sidebar;