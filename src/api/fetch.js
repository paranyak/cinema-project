export async function movie(id) {
    let movies = await ((await fetch(`http://localhost:3000/movies/byId/${id}`)).json());
    return movies;
}

export async function movieBySlug(slugName) {
    let movies = await ((await fetch(`http://localhost:3000/movies/bySlugName/${slugName}`)).json());
    return movies;
}

export async function moviesSchedule(day) {
    let movies = await ((await fetch(`http://localhost:3000/movies/ids?Schedule=${day}`)).json());
    return movies
}

export async function carouselleMovies(label) {
    let movies = await ((await fetch(`http://localhost:3000/movies/ids?label=${label}`)).json());
    return movies
}

export async function additionalMovies(limit, page) {
    let movies = await ((await fetch(`http://localhost:3000/movies/ids?_page=${page}&_limit=${limit}`)).json());
    return movies;
}

export async function actors(id) {
    const response = await fetch(`http://localhost:3000/actors/byId/${id}`);
    return response
}

export async function actorsBySlugName(slugName) {
    const response = await fetch(`http://localhost:3000/actors/bySlugName/${slugName}`);
    return response
}

export async function additionalActors(limit, page) {
    let actors = await ((await fetch(`http://localhost:3000/actors/ids?_page=${page}&_limit=${limit}`)).json());
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
