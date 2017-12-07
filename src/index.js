import ReactDOM from 'react-dom';
import React from 'react';
import Main from './main';
import About from './components/about';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers'

import {Router,Route} from 'react-router';
import {createBrowserHistory,createHashHistory,createMemoryHistory} from 'history';

const stor =createStore(reducer);//casi me olvido que necesitava una store general aca arriba

const browserHistory = createBrowserHistory();



ReactDOM.render(
	<Provider store={stor}>
		<Router path="/" history={browserHistory}>
		<div>
		<Route path="/app" component={Main} />
		<Route path="/about" component={About} />
		</div>
		</Router>
	</Provider>,document.getElementById('root')
	)

browserHistory.push('app');