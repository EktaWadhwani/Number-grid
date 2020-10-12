import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import eventReducer from './reducers';

const rootReducer = combineReducers({
  event: eventReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;