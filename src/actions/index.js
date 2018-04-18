export const fetchMoviesStart = (id) => {
    return {
        type: 'FETCH_MOVIES',
        id
    }
}

export const fetchActorsStart = (id) => {
    return {
        type: 'FETCH_ACTOR',
        id
    }
}

export const fetchActorsSucess = (id, ids, actors = []) => ({type: 'FETCH_ACTOR__SUCCESS', id, actors, ids})

export const fetchMoviesFail = (id, ids, actors = []) => {
    console.log("FETCH FAIL", ids);
    return {
        type: 'FETCH_MOVIES_FAIL',
        error: true,
        id,
        ids,
        actors
    }
}

export const fetchMoviesSuccess = (id, ids, movies = []) => {
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
