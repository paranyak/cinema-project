import {
    FETCH_MOVIES,
    FETCH_MOVIES_SLUG,
    FETCH_ACTOR,
    FETCH_ACTOR_SLUG,
    FETCH_ACTOR__SUCCESS,
    FETCH_ACTOR_SLUG_SUCCESS,
    FETCH_FAIL,
    FETCH_FAIL_SLUG,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_SLUG_SUCCESS,
    FETCH_CAROUSEL_MOVIES_SUCCESS,
    FETCH_SCHEDULE_MOVIES_SUCCESS,
    AUTH_START,
    LOGIN_SUCCESS,
    AUTH_FAIL,
    LOGOUT_SUCCESS,
    SET_USER,
    ADDITTIONAL_INFO,
    SIGN_UP_SUCCESS,
    EDITING_MOVIE_SUCCESS,
    EDITING_FAIL,
    EDITING_ACTOR_SUCCESS,
    POST_MOVIE_SUCCESS,
    FETCH_AUTOCOMPLETE_MOVIES_SUCCESS,
    CLEAR_MOVIES_AUTOCOMPLETE,
    FETCH_MOVIES_COUNT,
    FETCH_MOVIES_COUNT_SUCCESS,
    FETCH_POST, EDITING_MOVIE_START, EDITING_ACTOR_START,
    FETCH_ACTOR_DELETE_SUCCESS,
    FETCH_MOVIE_DELETE_SUCCESS,
    CHECK_NAME_ACTOR,
    CHECK_NAME_MOVIE,
    CHECK_NAME_FAIL, CHECK_NAME_ACTOR_SUCCESS
} from '../helpers/actionTypes';


export const fetchMoviesStart = (id) => ({type: FETCH_MOVIES, id});
export const fetchMoviesSlugStart = (slugName) => ({type: FETCH_MOVIES_SLUG, slugName});

export const fetchPostStart = (movie) => ({type: FETCH_POST, movie});

export const editingMovieStart = (movie) => ({type: EDITING_MOVIE_START, movie});
export const editingActorStart = (actor) => ({type: EDITING_ACTOR_START, actor});

export const checkingNameActor = (name) => ({type: CHECK_NAME_ACTOR, name});
export const checkingNameMovie = (name) => ({type: CHECK_NAME_MOVIE, name});


export const fetchMoviesCountStart = () => ({type: FETCH_MOVIES_COUNT});
export const fetchMoviesCountSuccess = (movies) => ({type: FETCH_MOVIES_COUNT_SUCCESS, movies});
export const fetchMoviesDeleteSuccess = (id, ids, movie = {}) => {console.log("Del success action/index:", id, ids, movie); return {type: FETCH_MOVIE_DELETE_SUCCESS, id, ids, movie}};

export const fetchActorsStart = (id) => ({type: FETCH_ACTOR, id});
export const fetchActorsSlugStart = (slugName) => ({type: FETCH_ACTOR_SLUG, slugName});

export const fetchActorsSucess = (id, ids, actors = []) => ({type: FETCH_ACTOR__SUCCESS, id, actors, ids});

export const fetchActorsDeleteSuccess = (id, ids, actor = {}) => ({type: FETCH_ACTOR_DELETE_SUCCESS, id, ids, actor});

export const fetchActorsSlugSuccess = (slugName, slugs, actors = []) => ({
    type: FETCH_ACTOR_SLUG_SUCCESS,
    slugName, actors, slugs
});

export const postMovieSuccess = (movie, ids, movies = []) => ({
    type: POST_MOVIE_SUCCESS,
    movie, ids, movies
});

export const fetchFail = (id, ids, actors = []) => ({
    type: FETCH_FAIL,
    error: true,
    id, ids, actors
});
export const fetchFailSlug = (slugName, slugs, actors = []) => ({
    type: FETCH_FAIL_SLUG,
    error: true,
    slugName, slugs, actors
});

export const editingMovieSuccess = (movie, slug, id) => ({
    type: EDITING_MOVIE_SUCCESS,
    movie, slug, id
});

export const checkingNameSuccess = (result) => ({
    type: CHECK_NAME_ACTOR_SUCCESS,
    result
});

export const checkingNameFail = (result) => ({
    type: CHECK_NAME_FAIL,
    result
});

export const fetchAutocompleteMoviesSuccess = (movies=[]) => ({type:FETCH_AUTOCOMPLETE_MOVIES_SUCCESS, movies})


export const editingFail = () => ({type: EDITING_FAIL, error: true});

export const editingActorSuccess = (actor, slug, id) => ({
    type: EDITING_ACTOR_SUCCESS,
    actor, slug, id
});

export const fetchMoviesSuccess = (id, ids, movies = []) => ({
    type: FETCH_MOVIES_SUCCESS,
    id, movies, ids
});


export const fetchMoviesSlugSuccess = (slugName, slugs, movies = []) => ({
    type: FETCH_MOVIES_SLUG_SUCCESS,
    slugName, movies, slugs
});

export const fetchCarouselleMoviesSuccess = (ids, movies, label) => ({
    type: FETCH_CAROUSEL_MOVIES_SUCCESS,
    id: 'carouselle',
    movies, ids, label
});

export const fetchMoviesByScheduleSuccess = (ids, movies) => ({
    type: FETCH_SCHEDULE_MOVIES_SUCCESS,
    id: 'schedule',
    movies, ids
});

export const authStart = () => ({type: AUTH_START});

export const loginSuccess = (user) => ({type: LOGIN_SUCCESS, user});

export const authFail = (error) => ({type: AUTH_FAIL, error});

export const logoutSuccess = (user) => ({type: LOGOUT_SUCCESS});

export const setUser = (user) => ({type: SET_USER, user});

export const authAdditionalInfoSuccess = (info) => ({type: ADDITTIONAL_INFO, info});

export const signUpSuccess = (user) => ({type: SIGN_UP_SUCCESS, user});

export const clearMoviesAutocomplete = () => ({type: CLEAR_MOVIES_AUTOCOMPLETE})
