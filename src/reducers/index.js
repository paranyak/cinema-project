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


export const getAllMoviesIds = (state) => fromMovies.getAllMoviesIds(state.movies);

export const getFeedbackById = (state, id) => fromFeedbacks.getFeedbackById(state.feedbacks, id);

export const getSelectedActor = (state) => fromActors.getSelectedActor(state.actors);

export const getAllFilters = (state) => fromFilters.getAllFilters(state.filters);

export const isMovieFetching = (id, state) => fromMovies.isMovieFetching(id, state.movies);

export const getCarouselleMovies = (state, label) => fromMovies.getCarouselleMovies(state.movies, label);

export const getScheduleMoviesIds = (state) => fromMovies.getScheduleMoviesIds(state.movies);

export const getMovieById = (state, id) => fromMovies.getMovieById(state.movies, id);
