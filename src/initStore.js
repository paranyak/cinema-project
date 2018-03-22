import { createStore } from 'redux';
import rootReducer from './reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default (middleware) => {
  return createStore(rootReducer, applyMiddleware(middleware,thunk,logger))
}
