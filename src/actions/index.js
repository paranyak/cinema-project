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

export const fetchCarouselleMoviesSuccess = (ids, movies, label) => {
      return {
          type: 'FETCH_CAROUSELLE_MOVIES_SUCCESS',
          id: 'carouselle',
          movies,
          ids,
          label
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
