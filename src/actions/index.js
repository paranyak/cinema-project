import {
    FETCH_MOVIES,
    FETCH_ACTOR,
    FETCH_ACTOR__SUCCESS,
    FETCH_FAIL,
    FETCH_MOVIES_SUCCESS,
    FETCH_CAROUSEL_MOVIES_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS
} from '../helpers/actionTypes';


export const fetchMoviesStart = (id) => ({type: FETCH_MOVIES, id});

export const fetchActorsStart = (id) => ({type: FETCH_ACTOR, id});

export const fetchActorsSucess = (id, ids, actors = []) => ({type: FETCH_ACTOR__SUCCESS, id, actors, ids});

export const fetchMoviesFail = (id, ids, actors = []) => {
    console.log("FETCH FAIL", ids);
    return {type: FETCH_FAIL, error: true, id, ids, actors}
};

export const fetchMoviesSuccess = (id, ids, movies = []) => ({type: FETCH_MOVIES_SUCCESS, id, movies, ids});

export const fetchCarouselleMoviesSuccess = (ids, movies, label) => ({type: FETCH_CAROUSEL_MOVIES_SUCCESS, id: 'carouselle', movies, ids, label});

export const fetchMoviesByScheduleSuccess = (ids, movies) => ({type: FETCH_SCHEDULE_MOVIES_SUCCESS, id: 'schedule', movies, ids});
