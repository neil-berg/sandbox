import axios from 'axios';

import { setLoading, setError, setSuccess } from './status-actions'
import { setCity, setCoords } from './geocode-actions';
import { setSummary, setTemperature, setPrecip } from './weather-actions';

export const fetchWeather = city => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_GEOCODE_ACCESS_TOKEN}&limit=1`;
		const { data: { features } } = await axios.get(url1);
		const [lon, lat] = features[0].center;
		dispatch(setCity(city));
		dispatch(setCoords(lat, lon));

		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const url2 = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/${lat},${lon}`;
		const { data: { currently } } = await axios.get(proxy + url2);
		const { summary, temperature, precipProbability: precip } = currently;
		dispatch(setSummary(summary));
		dispatch(setTemperature(temperature));
		dispatch(setPrecip(precip))
		dispatch(setSuccess());
	} catch (error) {
		dispatch(setError(error))
	}
}