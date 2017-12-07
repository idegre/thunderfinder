import {POSITION, CURRENT_THUNDER, INITIAL_PRESS,CHANGE_POS} from '../constants';//importo la variables

export const currentThunder=(active,timeDif)=>{
	const action={
		type:CURRENT_THUNDER,
		active,
		timeDif
	}
	return action;
}

export const initialPress=(active,timeDif)=>{
	const action={
		type:INITIAL_PRESS,
		active,
		timeDif
	}
	return action;
}

export const changePos=(position)=>{
	const action={
		type:CHANGE_POS,
		position
	}
	return action;
}
