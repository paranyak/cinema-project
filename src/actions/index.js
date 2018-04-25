import {
    FETCH_MOVIES,
    FETCH_ACTOR,
    FETCH_ACTOR__SUCCESS,
    FETCH_FAIL,
    FETCH_MOVIES_SUCCESS,
    FETCH_CAROUSEL_MOVIES_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS,
    AUTH_START,
    LOGIN_SUCCESS,
    AUTH_FAIL,
    LOGOUT_SUCCESS,
    SET_USER,
    ADDITTIONAL_INFO,
    SIGN_UP_SUCCESS
} from '../helpers/actionTypes';


export const fetchMoviesStart = (id) => ({type: FETCH_MOVIES, id});

export const fetchActorsStart = (id) => ({type: FETCH_ACTOR, id});

export const fetchActorsSucess = (id, ids, actors = []) => ({type: FETCH_ACTOR__SUCCESS, id, actors, ids});

export const fetchFail = (id, ids, actors = []) => ({type: FETCH_FAIL, error: true, id, ids, actors});

export const fetchMoviesSuccess = (id, ids, movies = []) => ({type: FETCH_MOVIES_SUCCESS, id, movies, ids});

export const fetchCarouselleMoviesSuccess = (ids, movies, label) => ({type: FETCH_CAROUSEL_MOVIES_SUCCESS, id: 'carouselle', movies, ids, label});

export const fetchMoviesByScheduleSuccess = (ids, movies) => ({type: FETCH_SCHEDULE_MOVIES_SUCCESS, id: 'schedule', movies, ids});

export const authStart = () => ({type: AUTH_START})

export const loginSuccess = (user) => ({type: LOGIN_SUCCESS, user})

export const authFail = (error) => ({type: AUTH_FAIL, error})

export const logoutSuccess = (user) => ({type: LOGOUT_SUCCESS})

export const setUser = (user) => ({type: SET_USER, user})

export const authAdditionalInfoSuccess = (info) => ({type: ADDITTIONAL_INFO, info})

export const signUpSuccess = (user) => ({type: SIGN_UP_SUCCESS, user})
