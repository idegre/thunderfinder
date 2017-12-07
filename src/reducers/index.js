import {INITIAL_PRESS, CURRENT_THUNDER, CHANGE_POS} from '../constants';//importo la variables

const thunder =(action)=>{
	return{
		active:action.active,
		radious:action.timeDif*0.343,
	}
}

const newpos=(action)=>{
	return{
		pos:action
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

		case CHANGE_POS:
			console.log('changin position', action);
			return newpos(action);

		default:
			return state;
	}
}
export default reducers;