import {combineReducers} from 'redux';
import movies, * as fromMovies from './movies';
import filters, * as fromFilters from './filters';
import feedbacks, * as fromFeedbacks from './feedbacks';
import { routerReducer } from 'react-router-redux';

const moviesApp = combineReducers({
    movies,
    filters,
    feedbacks,
    router: routerReducer
});

export default moviesApp;


export const getAllMoviesIds = (state) => fromMovies.getAllMoviesIds(state.movies);

export const getFeedbackById = (state, id) => fromFeedbacks.getFeedbackById(state.feedbacks, id);

export const getAllFilters = (state) => fromFilters.getAllFilters(state.filters);

export const isMovieFetching = (id, state) => fromMovies.isMovieFetching(id, state.movies);

export const getPopularMoviesIds = (state) => fromMovies.getPopularMoviesIds(state.movies);

export const getComingsoonrMoviesIds = (state) => fromMovies.getComingsoonrMoviesIds(state.movies);

export const getScheduleMoviesIds = (state) => fromMovies.getScheduleMoviesIds(state.movies);

export const getMovieById = (state, id) => fromMovies.getMovieById(state.movies, id);
