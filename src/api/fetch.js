const LOCALHOST = "http://localhost:3000";

export async function movie(id) {
    return await ((await fetch(`${LOCALHOST}/movies/byId/${id}`)).json());
}

export async function movieBySlug(slugName) {
    return await ((await fetch(`${LOCALHOST}/movies/bySlugName/${slugName}`)).json());
}

export async function movieCount() {
    let movies =  await ((await fetch(`${LOCALHOST}/movies/moviesCount`)).json());
    return movies;
}

export async function moviesSchedule(day) {
    return await ((await fetch(`${LOCALHOST}/movies/ids?Schedule=${day}`)).json())
}

export async function carouselleMovies(label) {
    return await ((await fetch(`${LOCALHOST}/movies/ids?label=${label}`)).json())
}

export async function additionalMovies(limit, page) {
    return await ((await fetch(`${LOCALHOST}/movies/ids?_page=${page}&_limit=${limit}`)).json());
}

export async function autocompleteMovies(name) {
    let movies = await ((await fetch(`${LOCALHOST}/movies/autocomplete/${name}`)).json());
    return movies;
}

export async function actors(id) {
    return await fetch(`${LOCALHOST}/actors/byId/${id}`)
}

export async function actorsBySlugName(slugName) {
    return await fetch(`${LOCALHOST}/actors/bySlugName/${slugName}`)
}

export async function additionalActors(limit, page) {
    return await ((await fetch(`${LOCALHOST}/actors/ids?_page=${page}&_limit=${limit}`)).json())
}

export async function deleteActor(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return await ((await fetch(`${LOCALHOST}/actors/${id}`, {
        method: 'DELETE',
        headers: headers,
    })).json())
}

export async function deleteMovie(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return await ((await fetch(`${LOCALHOST}/movies/${id}`, {
        method: 'DELETE',
        headers: headers,
    })).json())
}

export async function postMovie(movie) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return await ((await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(movie)
    })).json());
}

export const editMovie = async (id, movie) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`${LOCALHOST}/movies/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(movie)
    });
    if (!response.ok) {
        alert('Your form was not submitted!');
        return null;
    }
    return response.json();
};

export const editActor = async (id, actor) => {
    const response = await fetch(`${LOCALHOST}/actors/${id}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(actor)
    });
    if (!response.ok) {
        alert('Your form was not submitted!');
        return null;
    }
    return response.json();
};
