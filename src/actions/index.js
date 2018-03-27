import {moviesListSchema} from "../helpers/schema";
import { normalize } from 'normalizr';


export const changeDate = (date) => {
  return {
    type: 'CHANGE_DATE',
    date
  };
};

export const addFilter = (key, value) => {
    return {
        type: 'ADD_FILTER',
        key,
        value
    }
};

export const removeFilter = (key, value) => {
    return {
        type: 'REMOVE_FILTER',
        key,
        value
    }
};

export const fetchMoviesStart = (id) => {
    return {
      type: 'FETCH_MOVIES',
      id
    }
}

//HERE
export const fetchActorsStart =() =>{
    return {
        type: 'FETCH_ACTOR',
        id: 'actor'
    }
}

//HERE
export const fetchActorsSucess = (id, actor) =>{
    return {
        type: 'FETCH_ACTOR__SUCCESS',
        id: 'actor',
        actor
    }
}

export const fetchMoviesFail = (id) => {
    return {
      type: 'FETCH_MOVIES_FAIL',
      id
    }
}

export const fetchMoviesSuccess = (id, ids, movies) => {
  return {
    type: 'FETCH_MOVIES_SUCCESS',
    id,
    movies,
    ids
  }
}

export const fetchPopularMoviesSuccess = (ids, movies) => {
  return {
    type: 'FETCH_POPULAR_MOVIES_SUCCESS',
    id: 'popular',
    ids,
    movies
  }
}

export const fetchComingsoonMoviesSuccess = (ids, movies) => {
  return {
    type: 'FETCH_COMMINGSOON_MOVIES_SUCCESS',
    id: 'comingSoon',
    movies,
    ids
  }
}

export const fetchMoviesByScheduleSuccess = (ids, movies) => {
  return {
    type: 'FETCH_SCHEDULE_MOVIES_SUCCESS',
    id: 'schedule',
    movies,
    ids
  }
}

export const fetchMovie = (id) => async (dispatch) => {
    dispatch(fetchMoviesStart(id));
    let movies = await ((await fetch(`http://localhost:3000/movies/${id}`)).json());
    movies = normalize([movies], moviesListSchema);
    dispatch(fetchMoviesSuccess(id, movies.result, movies.entities.movies));
}


//HERE
export const fetchActors = (id) => async (dispatch) => {
    dispatch(fetchActorsStart(id));
    const actor = await ((await fetch(`http://localhost:3000/actors/${id}`)).json());
    dispatch(fetchActorsSucess(id, actor));
}

//HERE ^

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fetchMoviesStart('schedule'));
    let movies = await ((await fetch(`http://localhost:3000/movies?Schedule_like=${day}`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fetchMoviesByScheduleSuccess(movies.result, movies.entities.movies));
}


export const fetchPopularMovies = () => async (dispatch) => {
    dispatch(fetchMoviesStart('popular'));
    let movies = await ((await fetch(`http://localhost:3000/movies?label=popular`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fetchPopularMoviesSuccess(movies.result, movies.entities.movies));
}

export const fetchComingsoonMovies = () => async (dispatch) => {
    dispatch(fetchMoviesStart('comingSoon'));
    let movies = await ((await fetch(`http://localhost:3000/movies?label=soon`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fetchComingsoonMoviesSuccess(movies.result, movies.entities.movies));
}

export const fetchAdditionalMovies = (limit, page) => async (dispatch) => {
    dispatch(fetchMoviesStart('additional'));
    let movies = await ((await fetch(`http://localhost:3000/movies/?_page=${page}&_limit=${limit}`)).json());
    movies = normalize(movies, moviesListSchema);
    dispatch(fetchMoviesSuccess('additional', movies.result, movies.entities.movies));
}
