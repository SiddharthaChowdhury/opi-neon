import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
const initialState = {},
middlewares = [thunk];

var store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

export default store;