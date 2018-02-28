import { combineReducers } from 'redux';
import movies from './movies';
import filters from './filters';

const moviesApp = combineReducers({
  movies,
  filters
})

export default moviesApp;
