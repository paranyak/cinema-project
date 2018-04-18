import { createStore } from 'redux';
import rootReducer from './reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default (middleware) => {
  return createStore(rootReducer,
                     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                     applyMiddleware(middleware,thunk))
}
