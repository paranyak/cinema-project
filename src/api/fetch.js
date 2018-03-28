import {moviesListSchema} from "../helpers/schema";
import {normalize} from 'normalizr';
import * as fromFetch from '../actions/index';

export const fetchMovie = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart(id));
    let movies = await ((await fetch(`http://localhost:3000/movies/${id}`)).json());
    movies = normalize([movies], moviesListSchema);
    dispatch(fromFetch.fetchMoviesSuccess(id, movies.result, movies.entities.movies));
}

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('schedule'));
    let movies = await ((await fetch(`http://localhost:3000/movies?Schedule_like=${day}`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchMoviesByScheduleSuccess(movies.result, movies.entities.movies));
}

export const fetchPopularMovies = () => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('popular'));
    let movies = await ((await fetch(`http://localhost:3000/movies?label=popular`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchPopularMoviesSuccess(movies.result, movies.entities.movies));
}

export const fetchComingsoonMovies = () => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('comingSoon'));
    let movies = await ((await fetch(`http://localhost:3000/movies?label=soon`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchComingsoonMoviesSuccess(movies.result, movies.entities.movies));
}

export const fetchAdditionalMovies = (limit, page) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('additional'));
    let movies = await ((await fetch(`http://localhost:3000/movies/?_page=${page}&_limit=${limit}`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchMoviesSuccess('additional', movies.result, movies.entities.movies));
}

export const fetchActors = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchActorsStart(id));
    const response = await fetch(`http://localhost:3000/actors/${id}`);// 'posts' to get work the url
    if (!response.ok) {
        console.log("ERROR IN ACTOR");
        dispatch(fromFetch.fetchMoviesFail(id));
    } else {
        const actor = await ((response).json());
        dispatch(fromFetch.fetchActorsSucess(id, actor));
    }
}
