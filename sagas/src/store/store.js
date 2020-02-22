import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import { counterReducer } from '../reducers/counter';
import { userReducer } from '../reducers/user';
import { rootSaga } from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    count: counterReducer,
    users: userReducer
})

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga);