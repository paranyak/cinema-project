import {
    FETCH_MOVIES_SLUG,
    FETCH_MOVIES_SLUG_SUCCESS,
    FETCH_MOVIES_LABEL_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS,
    EDITING_MOVIE_SUCCESS,
    POST_MOVIE_SUCCESS,
    FETCH_AUTOCOMPLETE_MOVIES_SUCCESS,
    CLEAR_MOVIES_AUTOCOMPLETE,
    FETCH_MOVIES_COUNT,
    FETCH_MOVIES_COUNT_SUCCESS,
    EDITING_MOVIE_START,
    FETCH_MOVIE_DELETE_SUCCESS,
    FETCH_UNPUBLISHED_MOVIESL_SUCCESS,
    POST_MOVIE_START,
    FETCH_MOVIE_SLUG_FAIL

} from '../helpers/actionTypes';
import * as fromApi from "../api/fetch";
import {moviesListSchemaSlug} from "../helpers/schema";
import {push} from "react-router-redux";
import {normalize} from 'normalizr';
import * as fromFetch from "./index";

export const fetchMoviesSlugStart = (slugName) => ({type: FETCH_MOVIES_SLUG, slugName});

export const moviePostStart = (movie) => ({type: POST_MOVIE_START, movie});

export const editingMovieStart = (movie) => ({type: EDITING_MOVIE_START, movie});

export const fetchMoviesCountStart = () => ({type: FETCH_MOVIES_COUNT});

export const fetchMoviesCountSuccess = (movies) => ({type: FETCH_MOVIES_COUNT_SUCCESS, movies});

export const fetchMoviesDeleteSuccess = (slugName) => ({type: FETCH_MOVIE_DELETE_SUCCESS, slugName});

export const fetchMovieSlugFail = (slugName, slugs, movies = []) => ({
    type: FETCH_MOVIE_SLUG_FAIL,
    error: true,
    slugName, slugs, movies
});

export const postMovieSuccess = (slugName, movie) => ({
    type: POST_MOVIE_SUCCESS,
    movie, slugName
});

export const editingMovieSuccess = (movie, slugName) => ({
    type: EDITING_MOVIE_SUCCESS,
    movie, slugName
});

export const fetchAutocompleteMoviesSuccess = (movies = []) => ({type: FETCH_AUTOCOMPLETE_MOVIES_SUCCESS, movies});

export const fetchMoviesSlugSuccess = (slugName, slugs, movies = [], metaData) => { console.log("one movie:",slugs, movies, metaData); return {
    type: FETCH_MOVIES_SLUG_SUCCESS,
    slugName, movies, slugs, metaData
}};

export const fetchMoviesByLabelSuccess = (slugs, movies, label, metaData) => ({
        type: FETCH_MOVIES_LABEL_SUCCESS,
        slugName: 'carousel',
        movies, slugs, label, metaData});

export const fetchUnpublishedMoviesSuccess = (slugs, movies, metaData) => ({
    type: FETCH_UNPUBLISHED_MOVIESL_SUCCESS,
    slugs,
    movies,
    metaData
});

export const fetchMoviesByScheduleSuccess = (slugs, movies, metaData) => { console.log(metaData); return {
    type: FETCH_SCHEDULE_MOVIES_SUCCESS,
    slugName: 'schedule',
    movies, slugs, metaData
}};

export const clearMoviesAutocomplete = () => ({type: CLEAR_MOVIES_AUTOCOMPLETE});


export const fetchMovieSlug = (slugName) => async (dispatch) => {
    console.log("FETCH MOVIE SLUG");
    dispatch(fetchMoviesSlugStart(slugName));


    let moviesData = await fromApi.movieBySlug(slugName);
    console.log("MOVIE", moviesData.result);
    let movies = [];
    if (moviesData.result) {
        movies = moviesData.result;
        movies.slugName = movies['slugName'];
        movies = normalize([movies], moviesListSchemaSlug);
    }else{
        movies = normalize([], moviesListSchemaSlug);
    }

    if (movies.entities.movies[slugName].published) {
        dispatch(fetchMoviesSlugSuccess(slugName, movies.result, movies.entities.movies, moviesData.metaData));
    } else {
        dispatch(fetchUnpublishedMoviesSuccess(movies.result, movies.entities.movies, moviesData.metaData));
    }
};


export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('schedule'));
    let moviesData = await fromApi.moviesSchedule(day);
    let movies = [];
    if (moviesData.result) {
        movies = normalize(moviesData.result, moviesListSchemaSlug);
    }else{
        movies = normalize([], moviesListSchemaSlug);
    }
    dispatch(fetchMoviesByScheduleSuccess(movies.result, movies.entities.movies, moviesData.metaData));
};

export const fetchMoviesByLabel = (label) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('carousel'));
    if (label === 'unpublished') {
        let moviesData = await fromApi.unpublishedMovies();
        let movies = [];
        if (moviesData.result) {
            movies = normalize(moviesData.result, moviesListSchemaSlug);
        }else{
            movies = normalize([], moviesListSchemaSlug);
        }
        dispatch(fetchUnpublishedMoviesSuccess(movies.result, movies.entities.movies));
    } else {
        let moviesData = await fromApi.labeledMovies(label);
        let movies = [];
        if (moviesData.result) {
             movies = normalize(moviesData.result, moviesListSchemaSlug);
        }else{
            movies = normalize([], moviesListSchemaSlug);
        }
        dispatch(fetchMoviesByLabelSuccess(movies.result, movies.entities.movies, label, moviesData.metaData));

    }
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
    let moviesData = await fromApi.additionalMovies(limit, page);
    let movies = normalize(moviesData.result, moviesListSchemaSlug);
    dispatch(fetchMoviesSlugSuccess('additional', movies.result, movies.entities.movies));
};

export const fetchDeleteMovie = (slugName) => async (dispatch) => {
    dispatch(fetchMoviesSlugStart('delete'));
    await fromApi.deleteMovie(slugName);
    dispatch(fetchMoviesDeleteSuccess(slugName));
    dispatch(push('/'));
};

export const postMovieToDB = (movie) => async (dispatch) => {
    dispatch(moviePostStart(movie));
    let result = await fromApi.postMovie(movie);
    try {
        let res = await result;
        res.slugName = res['slugName'];
        res = normalize([res], moviesListSchemaSlug);
        dispatch(postMovieSuccess(res.result, res.entities.movies));
    }
    catch (err) {
        console.error('you got an error!!!');
        return null;
    }
};

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
