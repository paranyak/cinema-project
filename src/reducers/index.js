import { combineReducers } from 'redux';
import movies from './movies';
import filters from './filters';

const rootReducer = combineReducers({
  movies,
  filters
});

export default rootReducer;
