import {combineReducers} from 'redux';
import {assoc} from "ramda";
import {
    FETCH_MOVIES,
    FETCH_MOVIES_SLUG,
    FETCH_FAIL,
    FETCH_FAIL_SLUG,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_SLUG_SUCCESS,
    FETCH_CAROUSEL_MOVIES_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS,
    POST_MOVIE_SUCCESS,
    FETCH_POST,
    FETCH_AUTOCOMPLETE_MOVIES_SUCCESS,
    CLEAR_MOVIES_AUTOCOMPLETE
} from '../helpers/actionTypes';

const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return {...state, ...action.movies};
        case POST_MOVIE_SUCCESS:
            console.log("post", state, action);
            return {...state, ...action.movies};
        default:
            return state;
    }
};
const bySlug = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SLUG_SUCCESS:
            return {...state, ...action.movies};
        case FETCH_FAIL_SLUG:
            return action;
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return [
                ...state,
                ...action.ids
            ].filter((el, i, arr) => arr.indexOf(el) === i);
        default:
            return state;
    }
};

const carouselleMovies = (state = {popular: [], soon: []}, action) => {
    switch (action.type) {
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return {...state, [action.label]: action.ids};
        default:
            return state;
    }
};

const scheduleMoviesIds = (state = [], action) => {
    switch (action.type) {
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
            return [...action.ids];
        default:
            return state;
    }
};

const moviesAutocomplete = (state = [], action) => {
    switch (action.type) {
        case FETCH_AUTOCOMPLETE_MOVIES_SUCCESS:
            return [...action.movies]
        case CLEAR_MOVIES_AUTOCOMPLETE:
            return []
        default:
            return state;
    }
}

const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return assoc(action.id, true, state);
        case FETCH_MOVIES_SLUG:
            return assoc(action.slugName, true, state);
        case FETCH_POST:
            return assoc(action.movie, true, state);
        case FETCH_FAIL:
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return assoc(action.id, false, state);
        case FETCH_FAIL_SLUG:
        case FETCH_MOVIES_SLUG_SUCCESS:
            return assoc(action.slugName, false, state);
        case POST_MOVIE_SUCCESS:
            console.log("after post:", action);
            return assoc(action.movie, false, state);
        default:
            return state;
    }
};

export const getAllMoviesIds = (state) => state.allIds;

export const isMovieFetching = (id, state) => state.fetching[id];
export const isMovieFetchingSlug = (slugName, state) => state.fetching[slugName];

export const getCarouselleMovies = (state, label) => state.carouselleMovies[label];

export const getScheduleMoviesIds = (state) => state.scheduleMoviesIds;

export const getMovieById = (state, id) => state.byId[id];
export const getMovieBySlug = (state, slugName) => state.bySlug[slugName];
export const getMoviesAutocomplete = (state) => state.moviesAutocomplete;

export default combineReducers({
    byId,
    bySlug,
    allIds,
    fetching,
    carouselleMovies,
    scheduleMoviesIds,
    moviesAutocomplete
});
