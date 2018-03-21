import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
  movies: [],
  selectedMovie: {}
};

const movies = (state = [], action) => {
    switch (action.type) {
        case "ADD_MOVIE":
            let lastItemId = state[state.length - 1] && state[state.length - 1].id;

            return [
                ...state,
                {
                    id: (lastItemId || 0) + 1,
                    name: action.name,
                    schedule: action.schedule
                }
            ];
        case 'ALL_MOVIES':
        case "FETCH_MOVIES_SUCCESS":
            return [...action.movies];
        default:
            return state;
    }
};

const selectedMovie = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_MOVIE_SUCCESS':
        return action.data
    default:
        return state
  }
}

const fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_MOVIE":
        case "FETCH_MOVIES":
            return assoc(action.id, true, state);
        case "FETCH_MOVIE_SUCCESS":
        case "FETCH_MOVIE_FAIL":
        case "FETCH_MOVIES_SUCCESS":
        case "FETCH_MOVIES_FAIL":
            return assoc(action.id, false, state);
        default:
            return state;
    }
};

export const getAllMovies = (state) => state.movies;

export const getSelectedMovie = (state) => state.selectedMovie;

export const isMovieFetching = (id, state) => state.fetching[id];

export default combineReducers({
    movies,
    selectedMovie,
    fetching
});
