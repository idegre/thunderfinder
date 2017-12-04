import ReactDOM from 'react-dom';
import React from 'react';
import Main from './main';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers'

const stor =createStore(reducer);//casi me olvido que necesitava una store general aca arriba

ReactDOM.render(
	<Provider store={stor}>
		<Main />
	</Provider>,document.getElementById('root')
	)