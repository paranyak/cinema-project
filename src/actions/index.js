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

//HERE
export const fetchActorsStart =() =>{
    return {
        type: 'FETCH_ACTOR',
        id: 'actor'
    }
}

export const fetchMoviesSuccess = (movies) => {
    return {
      type: 'FETCH_MOVIES_SUCCESS',
      id: 'movies',
      movies
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

export const fetchMoviesFail = (movies) => {
    return {
      type: 'FETCH_MOVIES_FAIL',
      id: 'movies',
      movies
    }
}

export const fetchAdditionalMoviesStart = (limit, page) => {
    return {
      type: 'FETCH_ADDITIONAL_MOVIES',
      id: 'addition_movies',
      limit,
      page
    }
}

export const fetchAdditionalMoviesSuccess = (movies) => {
    return {
      type: 'FETCH_ADDITIONAL_MOVIES_SUCCESS',
      id: 'addition_movies',
      movies
    }
}

export const fetchAdditionalMoviesFail = (movies) => {
    return {
      type: 'FETCH_ADDITIONAL_MOVIES_FAIL',
      id: 'addition_movies',
      movies
    }
}

export const fetchPopularMoviesStart = () => {
    return {
      type: 'FETCH_POPULAR_MOVIES',
      id: 'popular_movies',
    }
}

export const fetchPopularMoviesSuccess = (movies) => {
    return {
      type: 'FETCH_POPULAR_MOVIES_SUCCESS',
      id: 'popular_movies',
      movies
    }
}

export const fetchPopularMoviesFail = (movies) => {
    return {
      type: 'FETCH_POPULAR_MOVIES_FAIL',
      id: 'popular_movies',
      movies
    }
}

export const fetchComingsoonMoviesStart = () => {
    return {
      type: 'FETCH_COMMINGSOON_MOVIES',
      id: 'popular_movies',
    }
}

export const fetchComingsoonMoviesSuccess = (movies) => {
    return {
      type: 'FETCH_COMMINGSOON_MOVIES_SUCCESS',
      id: 'popular_movies',
      movies
    }
}

export const fetchComingsoonMoviesFail = (movies) => {
    return {
      type: 'FETCH_COMMINGSOON_MOVIES_FAIL',
      id: 'popular_movies',
      movies
    }
}



export const fetchMovie = (id) => async (dispatch) => {
    dispatch(fetchMovieStart(id));
    const movie = await ((await fetch(`http://localhost:3000/movies/${id}`)).json());
    dispatch(fetchMovieSuccess(id, movie));
}


//HERE
export const fetchActors = (id) => async (dispatch) => {
    dispatch(fetchActorsStart(id));
    const actor = await ((await fetch(`http://localhost:3000/actors/${id}`)).json());
    dispatch(fetchActorsSucess(id, actor));
}

//HERE ^

export const fetchMoviesSchedule = (day) => async (dispatch) => {
    dispatch(fetchMoviesStart());
    const movies = await ((await fetch(`http://localhost:3000/movies?Schedule_like=${day}`)).json());
    dispatch(fetchMoviesSuccess(movies));
}


export const fetchPopularMovies = () => async (dispatch) => {
    dispatch(fetchPopularMoviesStart());
    const movies = await ((await fetch(`http://localhost:3000/movies?label=popular`)).json());
    dispatch(fetchPopularMoviesSuccess(movies));
}

export const fetchComingsoonMovies = () => async (dispatch) => {
    dispatch(fetchComingsoonMoviesStart());
    const movies = await ((await fetch(`http://localhost:3000/movies?label=soon`)).json());
    dispatch(fetchComingsoonMoviesSuccess(movies));
}

export const fetchAdditionalMovies = (limit, page) => async (dispatch) => {
    console.log('new fetch movies');
    dispatch(fetchAdditionalMoviesStart(limit, page));
    const movies = await ((await fetch(`http://localhost:3000/movies/?_page=${page}&_limit=${limit}`)).json());
    dispatch(fetchAdditionalMoviesSuccess(movies));
}
