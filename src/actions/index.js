import data from "../data/data.js"


export const addFilter = (filter) => {
    return {
        type: 'ADD_FILTER',
        filter
    }
};

export const removeFilter = (filter) => {
    return {
        type: 'REMOVE_FILTER',
        filter
    }
};

export const clearFilters = () => {
    return {
        type: 'CLEAR_FILTERS'
    }
};

let len = data.Movies.length;
let nextMovieId = data.Movies[len - 1].id + 1;
export const addMovie = (movie) => {
    return {
        type: 'ADD_MOVIE',
        id: nextMovieId++,
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