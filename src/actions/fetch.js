import {moviesListSchema} from "../helpers/schema";
import {normalize} from 'normalizr';
import * as fromFetch from '../actions/index';
import * as fromApi from '../api/fetch';

export const fetchMovie = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart(id));
    let movies = await fromApi.movie(id)
    movies = normalize([movies], moviesListSchema);
    dispatch(fromFetch.fetchMoviesSuccess(id, movies.result, movies.entities.movies));
}

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('schedule'));
    let movies = await fromApi.moviesSchedule(day)
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchMoviesByScheduleSuccess(movies.result, movies.entities.movies));
}

export const fetchCarouselleMovies = (label) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('carouselle'));
    let movies = await fromApi.carouselleMovies(label)
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchCarouselleMoviesSuccess(movies.result, movies.entities.movies, label));
}

export const fetchAdditionalMovies = (limit, page) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('additional'));
    let movies = await fromApi.additionalMovies(limit, page)
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchMoviesSuccess('additional', movies.result, movies.entities.movies));
}

export const fetchActors = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchActorsStart(id));
    let response = await fromApi.actors(id)
    if (!response.ok) {
        console.log("ERROR IN ACTOR");
        dispatch(fromFetch.fetchMoviesFail(id));
    } else {
        const actor = await ((response).json());
        dispatch(fromFetch.fetchActorsSucess(id, actor));
    }
}
