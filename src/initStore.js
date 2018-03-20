import { createStore } from 'redux';
import rootReducer from './reducers';
import { applyMiddleware } from 'redux'

export default (middleware) => {
  return createStore(rootReducer, applyMiddleware(middleware))
}
