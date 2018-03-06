import { combineReducers } from 'redux';
import movies, * as fromMovies from './movies';
import filters from './filters';

const moviesApp = combineReducers({
  movies,
  filters
});

export default moviesApp;


export const getAllMovies = (state) => fromMovies.getAllMovies(state.movies);

export const getById = (state, id) => fromMovies.getById(state.movies, id);
