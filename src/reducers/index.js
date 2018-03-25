import {combineReducers} from 'redux';
import movies, * as fromMovies from './movies';
import filters, * as fromFilters from './filters';
import actors, * as fromActors from './actors';


import { routerReducer } from 'react-router-redux';

const moviesApp = combineReducers({
    movies,
    filters,
    actors,
    router: routerReducer
});

export default moviesApp;


export const getAllMovies = (state) => fromMovies.getAllMovies(state.movies);

export const getSelectedMovie = (state) => fromMovies.getSelectedMovie(state.movies);
//ACTOR
export const getSelectedActor = (state) => fromActors.getSelectedActor(state.actors);

export const getAllFilters = (state) => fromFilters.getAllFilters(state.filters);

export const isMovieFetching = (id, state) => fromMovies.isMovieFetching(id, state.movies);

export const getPopularMovies = (state) => fromMovies.getPopularMovies(state.movies);

export const getComingsoonrMovies = (state) => fromMovies.getComingsoonrMovies(state.movies);

