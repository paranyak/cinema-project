const PORT = process.env.PORT;
const LOCALHOST = 'https://csucu-cinema-project.herokuapp.com' || `http://localhost:${PORT}`;
console.log('local', LOCALHOST);

export async function movie(id) {
    return await ((await fetch(`${LOCALHOST}/movies/byId/${id}`, {'mode': 'no-cors'})).json());
}

export async function movieBySlug(slugName) {
    return await ((await fetch(`${LOCALHOST}/movies/bySlugName/${slugName}`, {'mode': 'no-cors'})).json());
}

export async function movieCount() {
    return await ((await fetch(`${LOCALHOST}/movies/moviesCount`, {'mode': 'no-cors'})).json());
}

export async function moviesSchedule(day) {
    return await ((await fetch(`${LOCALHOST}/movies/slugs?Schedule=${day}`, {'mode': 'no-cors'})).json())
}

export async function labeledMovies(label) {
    return await ((await fetch(`${LOCALHOST}/movies/slugs?label=${label}`, {'mode': 'no-cors'})).json())
}

export async function unpublishedMovies() {
    return await ((await fetch(`${LOCALHOST}/movies/unpublished-slugs`, {'mode': 'no-cors'})).json())
}

export async function additionalMovies(limit, page) {
    return await ((await fetch(`${LOCALHOST}/movies/slugs?_page=${page}&_limit=${limit}`,{'mode': 'no-cors'})).json());
}

export async function autocompleteMovies(name) {
    return await ((await fetch(`${LOCALHOST}/movies/autocomplete/${name}`,{'mode': 'no-cors'})).json());
}

export async function actors(id) {
    return await fetch(`${LOCALHOST}/actors/byId/${id}`,{'mode': 'no-cors'})
}

export async function unpublishedActors() {
    return await ((await fetch(`${LOCALHOST}/actors/unpublished-slugs`,{'mode': 'no-cors'})).json())
}

export async function actorsBySlugName(slugName) {
    return await fetch(`${LOCALHOST}/actors/bySlugName/${slugName}`,{'mode': 'no-cors'})
}

export async function additionalActors(limit, page) {
    return await ((await fetch(`${LOCALHOST}/actors/slugs?_page=${page}&_limit=${limit}`,{'mode': 'no-cors'})).json())
}

export async function deleteActor(slugName) {
    return await ((await fetch(`${LOCALHOST}/actors/${slugName}`,{'mode': 'no-cors'}, {
        method: 'DELETE',
        headers: {"Content-type": "application/json"},
    })).json());
}

export async function deleteMovie(slugName) {
    return await  ((await fetch(`${LOCALHOST}/movies/${slugName}`, {'mode': 'no-cors'}, {
        method: 'DELETE',
        headers: {"Content-type": "application/json"},
    })).json());

}

export async function postMovie(movie) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await ((await fetch('https://csucu-cinema-project.herokuapp.com/movies', {'mode': 'no-cors'}, {
        method: 'POST',
        headers,
        body: JSON.stringify(movie)
    })).json());
}

export async function postActor(actor) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await fetch('https://csucu-cinema-project.herokuapp.com/actors', {'mode': 'no-cors'}, {
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
    const response = await fetch(`${LOCALHOST}/movies/${slugName}`, {'mode': 'no-cors'}, {
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
    const response = await fetch(`${LOCALHOST}/actors/${slugName}`, {'mode': 'no-cors'}, {
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
    let res = await fetch(`${LOCALHOST}/${type}/name_like=${name}`, {'mode': 'no-cors'});
    if (res.ok) {
        return await res.json();
    }
    return res.json();
}