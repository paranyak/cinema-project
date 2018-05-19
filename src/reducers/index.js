import {combineReducers} from 'redux';
import movies, * as fromMovies from './movies';
import filters, * as fromFilters from './filters';
import actors, * as fromActors from './actors';
import auth, * as fromAuth from './auth';


import {routerReducer} from 'react-router-redux';

const moviesApp = combineReducers({
    movies,
    filters,
    actors,
    auth,
    router: routerReducer
});

export default moviesApp;


export const getAllMoviesSlugs = (state) => fromMovies.getAllMoviesSlugs(state.movies);

export const getMoviesCount = (state) => fromMovies.getMoviesCount(state);

export const getAllActorsSlugs = (state) => fromActors.getAllActorsSlugs(state.actors);

export const getActorBySlug = (slugName, state) => fromActors.getActorBySlug(slugName, state.actors);

export const getAllFilters = (state) => fromFilters.getAllFilters(state.filters);

export const isMovieFetchingSlug = (slugName, state) => fromMovies.isMovieFetchingSlug(slugName, state.movies);

export const isActorFetchingSlug = (slugName, state) => fromActors.isActorFetchingSlug(slugName, state.actors);

export const getLabeledMovies = (label, state) => fromMovies.getLabeledMovies(label, state.movies);

export const getUnpublishedMovies = (state) => fromMovies.getUnpublishedMovies(state.movies);

export const getUnpublishedActors = (state) => fromActors.getUnpublishedActors(state.actors);

export const getMoviesAutocomplete = (state) => fromMovies.getMoviesAutocomplete(state.movies);

export const getMovieBySlug = (slugName, state) => fromMovies.getMovieBySlug(slugName, state.movies);

export const getCheckedNameActor =(state) => fromActors.getCheckedNameActor(state.actors);

export const getIsLoading = (state) => fromAuth.getIsLoading(state.auth);

export const getCurrentUser = (state) => fromAuth.getCurrentUser(state.auth);

export const getAuthError = (state) => fromAuth.getAuthError(state.auth);
