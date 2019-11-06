export const geocodeInitialState = {
	city: '',
	lat: null,
	lon: null
}

export const geocodeReducer = (state = geocodeInitialState, action) => {
	switch (action.type) {
		case "SET_CITY":
			return {
				...state,
				city: action.city
			}
		case "SET_COORDS":
			return {
				...state,
				lat: action.lat,
				lon: action.lon
			}
		default:
			return state
	}
}