import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './actions/types';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const tokenMiddleware = storeAPI => next => action => {
    const {type, payload} = action;
    if (type === LOGIN_SUCCESS) {
        localStorage.setItem('access', payload.access);
        localStorage.setItem('refresh', payload.refresh);
    } else if (type === LOGIN_FAIL || type === LOGOUT) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
    return next(action);
};

const initialState = {};

const middleware = [thunk, tokenMiddleware];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;