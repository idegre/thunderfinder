import {INITIAL_PRESS, CURRENT_THUNDER} from '../constants';//importo la variables

const thunder =(action)=>{
	return{
		active:action.active,
		radious:action.timeDif*0.343,
	}
}

const reducers=(state={},action)=>{
	switch(action.type){
		case CURRENT_THUNDER:
			console.log('current thunder', action);
			return thunder(action);

		case INITIAL_PRESS:
			console.log('initial press', action);
			return thunder(action);
		default:
			return state;
	}
}
export default reducers;