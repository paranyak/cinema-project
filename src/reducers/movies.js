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
    CLEAR_MOVIES_AUTOCOMPLETE,
    EDITING_MOVIE_SUCCESS,
    EDITING_MOVIE_START,
    FETCH_MOVIES_COUNT,
    FETCH_MOVIES_COUNT_SUCCESS,
    FETCH_MOVIE_DELETE_SUCCESS
} from '../helpers/actionTypes';

const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
        case POST_MOVIE_SUCCESS:
            return {...state, ...action.movies};
        case EDITING_MOVIE_SUCCESS:
            let newState = state;
            newState[action.id] = action.movie;
            return newState;
        case FETCH_MOVIE_DELETE_SUCCESS:
            let newStateDel = {...state};
            delete newStateDel[action.ids[0]];
            console.log("delete success",newStateDel );
            return newStateDel;
        default:
            return state;
    }
};
const bySlug = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SLUG_SUCCESS:
        case POST_MOVIE_SUCCESS:

            return {...state, ...action.movies};
        case FETCH_FAIL_SLUG:
            return action;
        case EDITING_MOVIE_SUCCESS:
            let newState = state;
            newState[action.slug] = action.movie;
            return newState;
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

const allIds = (state = [], action) => {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
        case POST_MOVIE_SUCCESS:
            return [
                ...state,
                ...action.ids
            ].filter((el, i, arr) => arr.indexOf(el) === i);
        case FETCH_MOVIE_DELETE_SUCCESS:
            let a = [...state].filter((el) => el !== action.ids[0]);
            console.log("Delete all ids", a, action.ids[0]);
            return a;
        default:
            return state;
    }
};

const carouselleMovies = (state = {popular: [], soon: []}, action) => {
    switch (action.type) {
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return {...state, [action.label]: action.ids};
        case FETCH_MOVIE_DELETE_SUCCESS:
            return [...state].filter((el) => el.id !== action.ids);
        default:
            return state;
    }
};

const scheduleMoviesIds = (state = [], action) => {
    switch (action.type) {
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
            return [...action.ids];
        case FETCH_MOVIE_DELETE_SUCCESS:
            return [...state].filter((el) => el.id !== action.ids);
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
}

const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return assoc(action.id, true, state);
        case FETCH_MOVIES_SLUG:
            return assoc(action.slugName, true, state);
        case FETCH_POST:
            return assoc(action.movie, true, state);
        case EDITING_MOVIE_START:
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
            return assoc(action.movie, false, state);
        case EDITING_MOVIE_SUCCESS:
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

export const getMoviesCount = (state) => state.movies.movieCount;
export default combineReducers({
    byId,
    bySlug,
    movieCount,
    allIds,
    fetching,
    carouselleMovies,
    scheduleMoviesIds,
    moviesAutocomplete
});
