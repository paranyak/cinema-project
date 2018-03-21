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


export const addMovie = (movie) => {
    return {
        type: 'ADD_MOVIE',
        name: movie.name,
        schedule: movie.schedule
    }
};

export const allMovies = (movies) => {
    return {
      type: 'ALL_MOVIES',
      movies
    }
}

const fetchMovieStart = (id) =>{
    return {
        type: "FETCH_MOVIE",
        id
    }
}

const fetchMovieSuccess = (id, data) =>{
    return {
        type: "FETCH_MOVIE_SUCCESS",
        id,
        data
    }
}

const fetchMovieFail = (id, data) =>{
    return {
        type: "FETCH_MOVIE_FAIL",
        id,
        data
    }
}

export const fetchMoviesStart = () => {
    return {
      type: 'FETCH_MOVIES',
      id: 'movies'
    }
}

export const fetchMoviesSuccess = (movies) => {
    return {
      type: 'FETCH_MOVIES_SUCCESS',
      id: 'movies',
      movies
    }
}

export const fetchMoviesFail = (movies) => {
    return {
      type: 'FETCH_MOVIES_FAIL',
      id: 'movies',
      movies
    }
}

export const fetchMovie = (id) => async (dispatch) => {
    console.log('new fetch movie');
    dispatch(fetchMovieStart(id));
    const movie = await ((await fetch(`http://localhost:3000/movies/${id}`)).json());
    dispatch(fetchMovieSuccess(id, movie));
}

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    console.log('new fetch movies');
    dispatch(fetchMoviesStart());
    const movies = await ((await fetch(`http://localhost:3000/movies?Schedule_like=${day}`)).json());
    dispatch(fetchMoviesSuccess(movies));
}
