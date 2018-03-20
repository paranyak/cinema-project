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


export const getAllMovies = (state) => fromMovies.getAllMovies(state.movies);

export const getById = (state, id) => fromMovies.getById(state.movies, id);

export const getFeedbackById = (state, id) => fromFeedbacks.getFeedbackById(state.feedbacks, id);

export const getAllFilters = (state) => fromFilters.getAllFilters(state.filters);
