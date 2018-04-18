import {combineReducers} from 'redux';
import {assoc} from "ramda";
import {
    FETCH_MOVIES,
    FETCH_FAIL,
    FETCH_MOVIES_SUCCESS,
    FETCH_CAROUSEL_MOVIES_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS
} from '../helpers/actionTypes';

const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return {...state, ...action.movies};
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

const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return assoc(action.id, true, state);
        case FETCH_FAIL:
        case FETCH_MOVIES_SUCCESS:
        case FETCH_SCHEDULE_MOVIES_SUCCESS:
        case FETCH_CAROUSEL_MOVIES_SUCCESS:
            return assoc(action.id, false, state);
        default:
            return state;
    }
};

export const getAllMoviesIds = (state) => state.allIds;

export const isMovieFetching = (id, state) => state.fetching[id];

export const getCarouselleMovies = (state, label) => state.carouselleMovies[label];

export const getScheduleMoviesIds = (state) => state.scheduleMoviesIds;

export const getMovieById = (state, id) => state.byId[id];

export default combineReducers({
    byId,
    allIds,
    fetching,
    carouselleMovies,
    scheduleMoviesIds
});
