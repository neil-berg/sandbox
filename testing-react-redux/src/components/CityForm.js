import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchWeather } from '../actions/fetching-actions';

const CityForm = () => {

	const [city, setCity] = useState('');

	const loading = useSelector(state => state.status.loading);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(fetchWeather(city))
	}

	return (
		<Container>
			<form onSubmit={e => handleSubmit(e)}>
				<label htmlFor="city">City</label>
				<input type="text" name="city" id="city" value={city} onChange={e => setCity(e.target.value)} />
				<button>Get weather!</button>
			</form>
		</Container>
	)
}

const Container = styled.div`
	height: 50vh;
	width: 100vw;
	background: green;
`

export default CityForm;