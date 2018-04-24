import {combineReducers} from 'redux';
import movies, * as fromMovies from './movies';
import filters, * as fromFilters from './filters';
import actors, * as fromActors from './actors';
import auth, * as fromAuth from './auth';


import { routerReducer } from 'react-router-redux';

const moviesApp = combineReducers({
    movies,
    filters,
    actors,
    auth,
    router: routerReducer
});

export default moviesApp;


export const getAllMoviesIds = (state) => fromMovies.getAllMoviesIds(state.movies);

export const getAllActorsIds = (state) => fromActors.getAllActorsIds(state.actors);

export const getActorById = (state, id) => fromActors.getActorById(state.actors, id);

export const getSelectedActor = (state) => fromActors.getSelectedActor(state.actors);

export const getAllFilters = (state) => fromFilters.getAllFilters(state.filters);

export const isMovieFetching = (id, state) => fromMovies.isMovieFetching(id, state.movies);

export const getCarouselleMovies = (state, label) => fromMovies.getCarouselleMovies(state.movies, label);

export const getScheduleMoviesIds = (state) => fromMovies.getScheduleMoviesIds(state.movies);

export const getMovieById = (state, id) => fromMovies.getMovieById(state.movies, id);

export const getIsLoading = (state) => fromAuth.getIsLoading(state.auth);

export const getCurrentUser = (state) => fromAuth.getCurrentUser(state.auth);

export const getAuthError = (state) => fromAuth.getAuthError(state.auth);
