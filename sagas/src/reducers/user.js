const userInitialState = {
    loading: false,
    users: []
}

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case 'users/fetch': {
            return { ...state, loading: true }
        }
        case 'users/set':
            return { ...state, loading: false, users: action.users }
        default:
            return { ...state }
    }
}