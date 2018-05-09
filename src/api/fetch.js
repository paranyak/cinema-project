const LOCALHOST = "http://localhost:3000";

export async function movie(id) {
    let movies = await ((await fetch(`${LOCALHOST}/movies/byId/${id}`)).json());
    return movies;
}

export async function movieBySlug(slugName) {
    let movies = await ((await fetch(`${LOCALHOST}/movies/bySlugName/${slugName}`)).json());
    return movies;
}

export async function movieCount() {
    let movies =  await ((await fetch(`${LOCALHOST}/movies/moviesCount`)).json());
    return movies;
}

export async function moviesSchedule(day) {
    let movies = await ((await fetch(`${LOCALHOST}/movies/ids?Schedule=${day}`)).json());
    return movies
}

export async function carouselleMovies(label) {
    let movies = await ((await fetch(`${LOCALHOST}/movies/ids?label=${label}`)).json());
    return movies
}

export async function additionalMovies(limit, page) {
    let movies = await ((await fetch(`${LOCALHOST}/movies/ids?_page=${page}&_limit=${limit}`)).json());
    return movies;
}

export async function actors(id) {
    const response = await fetch(`${LOCALHOST}/actors/byId/${id}`);
    return response
}

export async function actorsBySlugName(slugName) {
    const response = await fetch(`${LOCALHOST}/actors/bySlugName/${slugName}`);
    return response
}

export async function additionalActors(limit, page) {
    let actors = await ((await fetch(`${LOCALHOST}/actors/ids?_page=${page}&_limit=${limit}`)).json());
    return actors
}

export async function postMovie(movie) {
    console.log("POST MOvIE");
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST MOVIE", movie);

    let result =  await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(movie)
    });

    console.log("RESULT");

    return result;
}

export const editMovie = async (id, movie) => {
    const response = await fetch(`${LOCALHOST}/movies/${id}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(movie)
    });
    return response.json();
};