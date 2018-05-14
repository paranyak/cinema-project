import {moviesListSchema, actorsListSchema, actorsListSchemaSlug, moviesListSchemaSlug} from "../helpers/schema";
import {normalize} from 'normalizr';
import * as fromFetch from '../actions/index';
import * as fromApi from '../api/fetch';
import {push} from 'react-router-redux';


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

export const fetchMoviesCount = () => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesCountStart());
    let movies = await fromApi.movieCount();
    dispatch(fromFetch.fetchMoviesCountSuccess(movies));
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

export const fetchAutocompleteMovies = (name) => async (dispatch) => {
    dispatch(fromFetch.fetchMoviesStart('autocomplete'));
    let movies = await fromApi.autocompleteMovies(name);
    movies.forEach(function(movie) {
      movie.id = movie['_id'];
    });
    dispatch(fromFetch.fetchAutocompleteMoviesSuccess(movies));
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

export const fetchDeleteActor = (id) => async (dispatch) => {
  dispatch(fromFetch.fetchActorsStart('delete'));
  let actors = await fromApi.deleteActor(id);
  actors = normalize(actors, actorsListSchema);
  dispatch(fromFetch.fetchActorsDeleteSuccess('delete', actors.result, actors.entities.actors));
  dispatch(push('/allactors'));
};

export const fetchDeleteMovie = (id) => async (dispatch) => {
  dispatch(fromFetch.fetchMoviesStart('delete'));
  let movies = await fromApi.deleteMovie(id);
    movies.id = movies['_id'];
    movies = normalize([movies], moviesListSchema);
  dispatch(fromFetch.fetchMoviesDeleteSuccess('delete', movies.result, movies.entities.movies));
  dispatch(push('/'));
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


export const postMovieToDB = (movie) => async (dispatch) => {
    dispatch(fromFetch.fetchPostStart(movie));
    let result = await fromApi.postMovie(movie);
    if (!result.response.ok) {
        alert('Your form was not submitted!');
    }
    else {
        let res = await result.movie[0];
        res.id = res['_id'];
        res = normalize([res], moviesListSchema);
        dispatch(fromFetch.postMovieSuccess(res, res.result, res.entities.movies));
    }
};

export const editMovieById = (id, movie) => async (dispatch) => {
    dispatch(fromFetch.editingMovieStart(movie));
    try {
        const result = await fromApi.editMovie(id, movie);
        dispatch(fromFetch.editingMovieSuccess(result, result['slugName'], id));
    }
    catch (err) {
        dispatch(fromFetch.editingFail());
    }

};

export const editActorById = (id, actor) => async (dispatch) => {
    dispatch(fromFetch.editingActorStart(actor));
    try {
        const result = await fromApi.editActor(id, actor);
        dispatch(fromFetch.editingActorSuccess(result, result['slugName'], id));
    }
    catch (err) {
        dispatch(fromFetch.editingFail());
    }
};
