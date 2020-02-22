/* Counter action creators */
export const incrementCounter = (value) => ({
    type: 'counter/increment',
    value
});

export const incrementAsyncCounter = (value) => ({
    type: 'counter/increment-async',
    value
});

export const decrementCounter = (value) => ({
    type: 'counter/decrement',
    value
});

/* User action creators */
export const fetchUsers = () => ({
    type: 'users/fetch',
    loading: true
})

export const setUsers = (users) => ({
    type: 'users/set',
    loading: false,
    users
})