import React from 'react';
import { Provider } from 'react-redux';

import CityForm from './components/CityForm';
import { store } from './store/store';

import './index.css';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CityForm />
			</div>
		</Provider>
	)
}

export default App;