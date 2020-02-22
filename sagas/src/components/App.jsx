import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    incrementCounter,
    incrementAsyncCounter,
    decrementCounter,
    fetchUsers
} from '../actions';

export const App = () => {
    const dispatch = useDispatch();
    const count = useSelector(state => state.count);
    return (
        <div style={{ maxWidth: '300px', margin: '0 auto', border: '2px lightpink solid', borderRadius: '5px', padding: '1rem' }}>
            <p>Current count {count}</p>
            <button onClick={() => dispatch(incrementAsyncCounter(1))}>
                Increment Async
            </button>
            <button onClick={() => dispatch(incrementCounter(1))}>
                Increment
            </button>
            <button onClick={() => dispatch(decrementCounter(1))}>
                Decrement
            </button>
            <button onClick={() => dispatch(fetchUsers())}>
                Fetch Users
            </button>
        </div>
    )
}