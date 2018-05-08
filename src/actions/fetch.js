import {moviesListSchema, actorsListSchema, actorsListSchemaSlug, moviesListSchemaSlug} from "../helpers/schema";
import {normalize} from 'normalizr';
import * as fromFetch from '../actions/index';
import * as fromApi from '../api/fetch';
import {editingActorSuccess, editingFail, editingMovieSuccess} from "./index";

export const fetchMovie = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart(id));
    let movies = await fromApi.movie(id);
    movies.id = movies['_id'];
    movies = normalize([movies], moviesListSchema);
    dispatch(fromFetch.fetchMoviesSuccess(id, movies.result, movies.entities.movies));
};
export const fetchMovieSlug = (slugName) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesSlugStart(slugName));
    let movies = await fromApi.movieBySlug(slugName);
    movies.slugName = movies['slugName'];
    movies = normalize([movies], moviesListSchemaSlug);
    dispatch(fromFetch.fetchMoviesSlugSuccess(slugName, movies.result, movies.entities.movies));
};

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('schedule'));
    let movies = await fromApi.moviesSchedule(day);
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchMoviesByScheduleSuccess(movies.result, movies.entities.movies));
};

export const fetchCarouselleMovies = (label) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('carouselle'));
    let movies = await fromApi.carouselleMovies(label);
    movies = normalize(movies, moviesListSchema);
    dispatch(fromFetch.fetchCarouselleMoviesSuccess(movies.result, movies.entities.movies, label));
};

export const fetchAdditionalMovies = (limit, page) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('additional'));
    let movies = await fromApi.additionalMovies(limit, page);
    movies = normalize(movies, moviesListSchema);

    dispatch(fromFetch.fetchMoviesSuccess('additional', movies.result, movies.entities.movies));
};

export const fetchAdditionalActors = (limit, page) => async (dispatch) => {
    dispatch(fromFetch.fetchActorsStart('additional'));
    let actors = await fromApi.additionalActors(limit, page);
    actors = normalize(actors, actorsListSchema);
    dispatch(fromFetch.fetchActorsSucess('additional', actors.result, actors.entities.actors));
};

export const fetchActors = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchActorsStart(id));
    let response = await fromApi.actors(id);
    if (!response.ok) {
        let actor = {id, error: true};
        let actors = normalize([actor], actorsListSchema);
        dispatch(fromFetch.fetchActorsSucess(id, actors.result, actors.entities.actors));
    } else {
        let actors = await ((response).json());
        actors.id = actors['_id'];
        actors = normalize([actors], actorsListSchema);
        dispatch(fromFetch.fetchActorsSucess(id, actors.result, actors.entities.actors));
    }
};
export const fetchActorsSlug = (slugName) => async (dispatch) => {
    dispatch(fromFetch.fetchActorsSlugStart(slugName));
    let response = await fromApi.actorsBySlugName(slugName);
    if (!response.ok) {
        let actor = {slugName, error: true};
        let actors = normalize([actor], actorsListSchemaSlug);
        dispatch(fromFetch.fetchActorsSlugSuccess(slugName, actors.result, actors.entities.actors));
    } else {
        let actors = await ((response).json());
        actors.slugName = actors['slugName'];
        actors = normalize([actors], actorsListSchemaSlug);
        dispatch(fromFetch.fetchActorsSlugSuccess(slugName, actors.result, actors.entities.actors));
    }
};

export const postMovieToDB =  (movie) => async (dispatch) =>{

    console.log("HERE, post start");
    dispatch(fromFetch.fetchPostStart(movie));
    console.log('one1');
    let result = await fromApi.postMovie(movie);
    console.log('two', result);

    if (!result.ok) {
        console.log("not ok");
        // alert('Your form was not submitted!');
        }
        else {
            let resToJson = await result.json();
            console.log('result to json', resToJson);
            resToJson.id = resToJson['_id'];
            resToJson = normalize([resToJson], moviesListSchema);
            dispatch(fromFetch.postMovieSuccess(resToJson, resToJson.result, resToJson.entities.movies));}

    console.log("THERE");

};

export const editMovieById = (id, movie) => async (dispatch) => {
    try {
        await fromApi.editMovie(id, movie);
        dispatch(editingMovieSuccess());
    }
    catch (err) {
        dispatch(editingFail());
    }
};

export const editActorById = (id, actor) => async (dispatch) => {
    try {
        await fromApi.editActor(id, actor);
        dispatch(editingActorSuccess());
    }
    catch (err) {
        dispatch(editingFail());
    }
};