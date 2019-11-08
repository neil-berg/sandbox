/* eslint-disable import/first */
jest.mock('axios', () => ({
	get: () => jest.fn(() => {
		throw new Error('axios.get not mocked')
	})
}));

import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { geocodeReducer } from '../reducers/geocode-reducer';
import { statusReducer } from '../reducers/status-reducer';
import { weatherReducer } from '../reducers/weather-reducer';
import * as fetchingActions from '../actions/fetching-actions';

function trackActions(ctx) {
	ctx.actions = [];
	return store => next => action => {
		ctx.actions.push(action);
		return next(action);
	};
}

function createTrackedStore(rootReducer, middleware = [thunk]) {
	const ctx = {};
	const store = createStore(rootReducer, applyMiddleware(...middleware, trackActions(ctx)));
	return Object.assign(store, {
		getActions: () => ctx.actions,
		getFirstAction: () => ctx.actions[0],
		getNthAction: (n) => n > ctx.actions.length ? new Error('out of bounds') : ctx.actions[n - 1],
		getLastAction: () => ctx.actions[ctx.actions.length - 1],
		clearActions: () => ctx.actions = [],
	});
}

const rootReducer = combineReducers({
	status: statusReducer,
	geocodeReducer: geocodeReducer,
	weather: weatherReducer
})

const testData = {
	city: 'Baltimore',
	geocode: {
		data: {
			features: [
				{
					center: [100, 100]
				}
			]
		}
	},
	weather: {
		data: {
			currently: {
				summary: 'testSummary',
				temperature: 100,
				precipProbability: .5
			}
		}
	},
	error: new Error('test-error')
}

describe('fetchWeather() action creator', () => {

	describe('Success fetching geocode and weather', () => {

		let store;
		beforeAll(() => {
			jest.spyOn(axios, 'get')
				.mockResolvedValueOnce(testData.geocode)
				.mockResolvedValueOnce(testData.weather)
			store = createTrackedStore(rootReducer);
			store.dispatch(fetchingActions.fetchWeather(testData.city));
		})

		it('dispatches SET_LOADING', () => {
			expect(store.getFirstAction()).toEqual({
				type: 'SET_LOADING'
			})
		})

		it('calls axios.get() twice', async () => {
			expect(axios.get).toHaveBeenCalledTimes(2);
		})

		it('dispatches SET_CITY with correct city', () => {
			expect(store.getNthAction(2)).toEqual({
				type: 'SET_CITY',
				city: testData.city
			})
		})

		it('dispatches SET_COORDS with correct lat/lon', () => {
			const [lon, lat] = testData.geocode.data.features[0].center;
			expect(store.getNthAction(3)).toEqual({
				type: 'SET_COORDS',
				lat,
				lon
			})
		})

		it('dispatches SET_SUMMARY with correct summary', () => {
			expect(store.getNthAction(4)).toEqual({
				type: 'SET_SUMMARY',
				summary: testData.weather.data.currently.summary
			})
		})

		it('dispatches SET_TEMPERATURE with correct temperature', () => {
			expect(store.getNthAction(5)).toEqual({
				type: 'SET_TEMPERATURE',
				temperature: testData.weather.data.currently.temperature
			})
		})

		it('dispatches SET_PRECIP with the correct precip probability', () => {
			expect(store.getNthAction(6)).toEqual({
				type: 'SET_PRECIP',
				precip: testData.weather.data.currently.precipProbability
			})
		})

		it('dispatches SET_SUCCESS', () => {
			expect(store.getLastAction()).toEqual({
				type: 'SET_SUCCESS'
			})
		})

		afterAll(() => {
			axios.get.mockRestore();
			store.clearActions();
		})
	})

	describe('Failure - error fetching geocode data', () => {
		let store;
		beforeAll(() => {
			jest.spyOn(axios, 'get')
				.mockRejectedValue(testData.error)
			store = createTrackedStore(rootReducer);
			store.dispatch(fetchingActions.fetchWeather(testData.city));
		})

		it('dispatches SET_LOADING', () => {
			expect(store.getFirstAction()).toEqual({
				type: 'SET_LOADING'
			})
		})

		it('calls axios.get() once', () => {
			expect(axios.get).toHaveBeenCalledTimes(1);
		})

		it('dispatches SET_ERROR with error message', () => {
			expect(store.getLastAction()).toEqual({
				type: 'SET_ERROR',
				error: testData.error
			})
		})

		afterAll(() => {
			axios.get.mockRestore();
			store.clearActions();
		})
	})

	describe('Failure - error fetching weather data', () => {
		let store;
		beforeAll(() => {
			jest.spyOn(axios, 'get')
				.mockResolvedValueOnce(testData.geocode)
				.mockRejectedValueOnce(testData.error)
			store = createTrackedStore(rootReducer);
			store.dispatch(fetchingActions.fetchWeather(testData.city));
		})

		it('dispatches SET_LOADING', () => {
			expect(store.getFirstAction()).toEqual({
				type: 'SET_LOADING'
			})
		})

		it('calls axios.get() twice', async () => {
			expect(axios.get).toHaveBeenCalledTimes(2);
		})

		it('dispatches SET_CITY with correct city', () => {
			expect(store.getNthAction(2)).toEqual({
				type: 'SET_CITY',
				city: testData.city
			})
		})

		it('dispatches SET_COORDS with correct lat/lon', () => {
			const [lon, lat] = testData.geocode.data.features[0].center;
			expect(store.getNthAction(3)).toEqual({
				type: 'SET_COORDS',
				lat,
				lon
			})
		})

		it('dispatches SET_ERROR with error message', () => {
			expect(store.getLastAction()).toEqual({
				type: 'SET_ERROR',
				error: testData.error
			})
		})

		afterAll(() => {
			axios.get.mockRestore();
			store.clearActions();
		})
	})

})
