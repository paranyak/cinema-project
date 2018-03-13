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

export const removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
};

export const setMovies = (movies) => {
    return {
      type: 'SET_MOVIES',
      movies
    }
}
