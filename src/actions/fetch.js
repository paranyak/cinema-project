import {moviesListSchema, actorsListSchema} from "../helpers/schema";
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

export const fetchPopularMovies = () => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('popular'));
    let movies = await fromApi.popularMovies()
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchPopularMoviesSuccess(movies.result, movies.entities.movies));
}

export const fetchComingsoonMovies = () => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('comingSoon'));
    let movies = await fromApi.comingSoonMovies()
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchComingsoonMoviesSuccess(movies.result, movies.entities.movies));
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
        let actors = await ((response).json());
        actors = normalize([actors], actorsListSchema);
        console.log("ACTOR NORM:",actors.result, actors.entities.actors );
        dispatch(fromFetch.fetchActorsSucess(id, actors.result, actors.entities.actors));
    }
}
