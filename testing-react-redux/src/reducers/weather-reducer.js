export const weatherInitialState = {
	summary: '',
	temperature: null,
	precip: null
}

export const weatherReducer = (state = weatherInitialState, action) => {
	switch (action.type) {
		case 'SET_SUMMARY':
			return {
				...state,
				summary: action.summary
			}
		case 'SET_TEMPERATURE':
			return {
				...state,
				temperature: action.temperature
			}
		case 'SET_PRECIP':
			return {
				...state,
				precip: action.precip
			}
		default:
			return state
	}
}