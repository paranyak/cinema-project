import {combineReducers} from 'redux';
import {assoc} from "ramda";
import {
    FETCH_MOVIES_SLUG,
    FETCH_FAIL_SLUG,
    FETCH_MOVIES_SLUG_SUCCESS,
    FETCH_MOVIES_LABEL_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS,
    POST_MOVIE_SUCCESS,
    FETCH_POST,
    FETCH_AUTOCOMPLETE_MOVIES_SUCCESS,
    CLEAR_MOVIES_AUTOCOMPLETE,
    EDITING_MOVIE_SUCCESS,
    EDITING_MOVIE_START,
    FETCH_MOVIES_COUNT_SUCCESS,
    FETCH_MOVIE_DELETE_SUCCESS
} from '../helpers/actionTypes';

const bySlug = (state = {}, action) => {
    switch (action.type) {
        // case FETCH_MOVIES_SLUG:
        case FETCH_MOVIES_SLUG_SUCCESS:
            return {...state, ...action.movies};
        case POST_MOVIE_SUCCESS:
            let newSt = {...state, ...action.movies};
            console.log('newSt in byslug', newSt);
            return newSt;
        // case FETCH_FAIL_SLUG:
        //     return action;
        case EDITING_MOVIE_SUCCESS:
            let newState = state;
            newState[action.slugName] = action.movie;
            return newState;
        case FETCH_MOVIE_DELETE_SUCCESS:
            let newStateDel = {...state};
            delete newStateDel[action.slugName];
            return newStateDel;
        default:
            return state;
    }
};

const movieCount = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_COUNT_SUCCESS:
            return action.movies;
        default:
            return state;
    }
};

const allSlugs = (state = [], action) => {
    switch (action.type) {
        case FETCH_MOVIES_SLUG_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_MOVIES_LABEL_SUCCESS:
            return [
                ...state,
                ...action.slugs
            ].filter((el, i, arr) => arr.indexOf(el) === i);
        case POST_MOVIE_SUCCESS:
            let newSt = [...state, ...action.movies];
            console.log('newSt in allSlugs', newSt);
            return newSt;
        case FETCH_MOVIE_DELETE_SUCCESS:
            return [...state].filter((el) => el !== action.slugName);
        default:
            return state;
    }
};

const labeledMovies = (state = {popular: [], soon: []}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_LABEL_SUCCESS:
            return {...state, [action.label]: action.slugs};
        case FETCH_MOVIE_DELETE_SUCCESS:
            return [...state].filter((el) => el !== action.slugName);
        default:
            return state;
    }
};

const scheduleMoviesSlugs = (state = [], action) => {
    switch (action.type) {
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
            return [...action.slugs];
        case FETCH_MOVIE_DELETE_SUCCESS:
            return [...state].filter((el) => el !== action.slugName);
        default:
            return state;
    }
};

const moviesAutocomplete = (state = [], action) => {
    switch (action.type) {
        case FETCH_AUTOCOMPLETE_MOVIES_SUCCESS:
            return [...action.movies];
        case CLEAR_MOVIES_AUTOCOMPLETE:
            return [];
        default:
            return state;
    }
};

const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SLUG:
            return assoc(action.slugName, true, state);
        case FETCH_POST:
        case EDITING_MOVIE_START:
            return assoc(action.movie, true, state);
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_MOVIES_LABEL_SUCCESS:
        case FETCH_FAIL_SLUG:
        case FETCH_MOVIES_SLUG_SUCCESS:
            return assoc(action.slugName, false, state);
        case POST_MOVIE_SUCCESS:
        case EDITING_MOVIE_SUCCESS:
            return assoc(action.movie, false, state);
        default:
            return state;
    }
};

export const getAllMoviesSlugs = (state) => state.allSlugs;

export const isMovieFetchingSlug = (slugName, state) => state.fetching[slugName];

export const getLabeledMovies = (label, state) => state.labeledMovies[label];

export const getMovieBySlug = (slugName, state) => state.bySlug[slugName];

export const getMoviesAutocomplete = (state) => state.moviesAutocomplete;

export const getMoviesCount = (state) => state.movies.movieCount;
export default combineReducers({
    bySlug,
    movieCount,
    allSlugs,
    fetching,
    labeledMovies,
    scheduleMoviesSlugs,
    moviesAutocomplete
});
