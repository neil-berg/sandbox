export const statusInitialState = {
	loading: false,
	error: false,
	success: false
}

export const statusReducer = (state = statusInitialState, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
				error: false,
				success: false
			}
		case 'SET_ERROR':
			return {
				...state,
				loading: false,
				error: true,
				success: false
			}
		case 'SET_SUCCESS':
			return {
				...state,
				loading: false,
				error: false,
				success: true
			}
		default:
			return state
	}
}