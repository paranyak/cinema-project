import {
    FETCH_MOVIES_SLUG,
    FETCH_MOVIES_SLUG_SUCCESS,
    FETCH_MOVIES_LABEL_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS,
    EDITING_MOVIE_SUCCESS,
    EDITING_FAIL,
    POST_MOVIE_SUCCESS,
    FETCH_AUTOCOMPLETE_MOVIES_SUCCESS,
    CLEAR_MOVIES_AUTOCOMPLETE,
    FETCH_MOVIES_COUNT,
    FETCH_MOVIES_COUNT_SUCCESS,
    FETCH_POST,
    EDITING_MOVIE_START,
    FETCH_MOVIE_DELETE_SUCCESS
} from '../helpers/actionTypes';
import * as fromApi from "../api/fetch";
import {moviesListSchema, moviesListSchemaSlug} from "../helpers/schema";
import {push} from "react-router-redux";
import {normalize} from 'normalizr';
import * as fromFetch from "./index";


export const fetchMoviesSlugStart = (slugName) => ({type: FETCH_MOVIES_SLUG, slugName});

export const fetchPostStart = (movie) => ({type: FETCH_POST, movie});

export const editingMovieStart = (movie) => ({type: EDITING_MOVIE_START, movie});

export const fetchMoviesCountStart = () => ({type: FETCH_MOVIES_COUNT});

export const fetchMoviesCountSuccess = (movies) => ({type: FETCH_MOVIES_COUNT_SUCCESS, movies});

export const fetchMoviesDeleteSuccess = (slugName) => ({type: FETCH_MOVIE_DELETE_SUCCESS, slugName});

export const postMovieSuccess = (movie, ids, movies = []) => ({
    type: POST_MOVIE_SUCCESS,
    movie, ids, movies
});

export const editingMovieSuccess = (movie, slugName) => ({
    type: EDITING_MOVIE_SUCCESS,
    movie, slugName
});

export const fetchAutocompleteMoviesSuccess = (movies = []) => ({type: FETCH_AUTOCOMPLETE_MOVIES_SUCCESS, movies});

export const fetchMoviesSlugSuccess = (slugName, slugs, movies = []) => ({
    type: FETCH_MOVIES_SLUG_SUCCESS,
    slugName, movies, slugs
});

export const fetchMoviesByLabelSuccess = (slugs, movies, label) => ({
    type: FETCH_MOVIES_LABEL_SUCCESS,
    slugName: 'carouselle',
    movies, slugs, label
});

export const fetchMoviesByScheduleSuccess = (slugs, movies) => ({
    type: FETCH_SCHEDULE_MOVIES_SUCCESS,
    slugName: 'schedule',
    movies, slugs
});

export const clearMoviesAutocomplete = () => ({type: CLEAR_MOVIES_AUTOCOMPLETE});


export const fetchMovieSlug = (slugName) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart(slugName));
    let movies = await fromApi.movieBySlug(slugName);
    movies.slugName = movies['slugName'];
    movies = normalize([movies], moviesListSchemaSlug);
    dispatch(fetchMoviesSlugSuccess(slugName, movies.result, movies.entities.movies));
};

export const fetchMoviesCount = () => async (dispatch) => {
    dispatch(fetchMoviesCountStart());
    let movies = await fromApi.movieCount();
    dispatch(fetchMoviesCountSuccess(movies));
};

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('schedule'));
    let movies = await fromApi.moviesSchedule(day);
    movies = normalize(movies, moviesListSchemaSlug);
    dispatch(fetchMoviesByScheduleSuccess(movies.result, movies.entities.movies));
};

export const fetchMoviesByLabel = (label) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('carouselle'));
    let movies = await fromApi.carouselleMovies(label);
    movies = normalize(movies, moviesListSchemaSlug);
    dispatch(fetchMoviesByLabelSuccess(movies.result, movies.entities.movies, label));
};

export const fetchAutocompleteMovies = (name) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('autocomplete'));
    let movies = await fromApi.autocompleteMovies(name);
    movies.forEach((movie) => {
        movie.id = movie['_id'];
    });
    dispatch(fetchAutocompleteMoviesSuccess(movies));
};

export const fetchAdditionalMovies = (limit, page) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('additional'));
    let movies = await fromApi.additionalMovies(limit, page);
    movies = normalize(movies, moviesListSchemaSlug);
    console.log('movie additional', movies);
    dispatch(fetchMoviesSlugSuccess('additional', movies.result, movies.entities.movies));
};

export const fetchDeleteMovie = (slugName) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('delete'));
    await fromApi.deleteMovie(slugName);
    dispatch(fetchMoviesDeleteSuccess(slugName));
    dispatch(push('/'));
};

export const postMovieToDB = (movie) => async (dispatch) => {
    dispatch(fetchPostStart(movie));
    let result = await fromApi.postMovie(movie);
    if (!result.response.ok) {
        alert('Your form was not submitted!');
    }
    else {
        let res = await result.movie[0];
        res.id = res['_id'];
        res = normalize([res], moviesListSchema);
        dispatch(postMovieSuccess(res, res.result, res.entities.movies));
    }
};

// export const editMovieById = (id, movie) => async (dispatch) => {
//     dispatch(editingMovieStart(movie));
//     try {
//         const result = await fromApi.editMovie(id, movie);
//         dispatch(editingMovieSuccess(result, result['slugName'], id));
//     }
//     catch (err) {
//         dispatch(fromFetch.editingFail());
//     }
//
// };

export const editMovieBySlug = (slugName, movie) => async (dispatch) => {
    dispatch(editingMovieStart(movie));
    try {
        const result = await fromApi.editMovie(slugName, movie);
        dispatch(editingMovieSuccess(result, slugName));
    }
    catch (err) {
        dispatch(fromFetch.editingFail());
    }

};