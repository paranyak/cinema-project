let API_PATH = process.env.REACT_APP_API_ENDPOINT;
export const CLOUDINARY_PATH = process.env.REACT_APP_CLOUDINARY_PATH || ""

console.log(API_PATH);

export async function movie(id) {
    return await ((await fetch(`${API_PATH}/movies/byId/${id}`)).json());
}

export async function movieBySlug(slugName) {
    return await ((await fetch(`${API_PATH}/movies/bySlugName/${slugName}`)).json());
}

// export async function movieCount() {
//     return await ((await fetch(`${API_PATH}/movies/moviesCount`)).json());
// }

export async function moviesSchedule(day) {
    return await ((await fetch(`${API_PATH}/movies/slugs?Schedule=${day}`)).json())
}

export async function labeledMovies(label) {
    return await ((await fetch(`${API_PATH}/movies/slugs?label=${label}`)).json())
}

export async function unpublishedMovies() {
    return await ((await fetch(`${API_PATH}/movies/unpublished-slugs`)).json())
}

export async function additionalMovies(limit, page) {
    return await ((await fetch(`${API_PATH}/movies/slugs?_page=${page}&_limit=${limit}`)).json());
}

export async function autocompleteMovies(name) {
    return await ((await fetch(`${API_PATH}/movies/autocomplete/${name}`)).json());
}

export async function actors(id) {
    return await fetch(`${API_PATH}/actors/byId/${id}`)
}

export async function unpublishedActors() {
    return await ((await fetch(`${API_PATH}/actors/unpublished-slugs`)).json())
}

export async function actorsBySlugName(slugName) {
    return await fetch(`${API_PATH}/actors/bySlugName/${slugName}`)
}

export async function additionalActors(limit, page) {
    return await ((await fetch(`${API_PATH}/actors/slugs?_page=${page}&_limit=${limit}`)).json())
}

export async function deleteActor(slugName) {
    return await ((await fetch(`${API_PATH}/actors/${slugName}`, {
        method: 'DELETE',
        headers: {"Content-type": "application/json"},
    })).json());
}

export async function deleteMovie(slugName) {
    return await  ((await fetch(`${API_PATH}/movies/${slugName}`, {
        method: 'DELETE',
        headers: {"Content-type": "application/json"},
    })).json());

}

export async function postMovie(movie) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await ((await fetch(`${LOCALHOST}/movies`, {
        method: 'POST',
        headers,
        body: JSON.stringify(movie)
    })).json());
}

export async function postActor(actor) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`${LOCALHOST}/actors`, {
        method: 'POST',
        headers,
        body: JSON.stringify(actor)
    });
    if (!response.ok) {
        alert('Your form was not submitted!');
        return null;
    }
    return response.json();
}

export const editMovie = async (slugName, movie) => {
    const response = await fetch(`${API_PATH}/movies/${slugName}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(movie)
    });
    if (!response.ok) {
        alert('Your form was not submitted!');
        return null;
    }
    return response.json();
};

export const editActor = async (slugName, actor) => {
    const response = await fetch(`${API_PATH}/actors/${slugName}`, {
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


export async function checkName(name, type) {
    let res = await fetch(`${API_PATH}/${type}/bySlugName/${name}`);
    if (res.ok) {
        return await res.json();
    }
    return res.json();
}
