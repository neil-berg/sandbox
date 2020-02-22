import axios from 'axios';
import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import { incrementCounter, setUsers } from '../actions'


const delay = (ms) => new Promise(res => setTimeout(() => {
    res()
}, (ms)))

export function* helloSaga() {
    console.log('Hello sagas!')
}

// Worker saga: perform the async increment task
export function* incrementAsync() {
    yield delay(1000);
    yield put(incrementCounter(1));
}

// Watcher saga: spawn a new incrementAsync task
// when every 'button/increment-async is intercepted
export function* watchIncrementAsync() {
    yield takeEvery('counter/increment-async', incrementAsync);
}

// Watcher saga: spawn a new fetchAsync user task when
// latest users/fetch action type is intercepted
export function* watchFetchAsyncUsers() {
    yield takeLatest('users/fetch', fetchAsyncUsers)
}

// Worker saga: perform async user fetching
export function* fetchAsyncUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    try {
        yield delay(2000);
        const { data } = yield axios.get(url);
        yield put(setUsers(data));
    } catch (e) {
        console.log(e);
    }
}

export function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchFetchAsyncUsers()
    ])
}