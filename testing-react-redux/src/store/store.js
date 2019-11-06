import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { geocodeReducer } from '../reducers/geocode-reducer';
import { statusReducer } from '../reducers/status-reducer';
import { weatherReducer } from '../reducers/weather-reducer';

const rootReducer = combineReducers({
	status: statusReducer,
	geocode: geocodeReducer,
	weather: weatherReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
