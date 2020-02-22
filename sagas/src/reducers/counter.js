export const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'counter/increment':
            return state + action.value;
        case 'counter/decrement':
            return state - action.value;
        default:
            return state;
    }
}