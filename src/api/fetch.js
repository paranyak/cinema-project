export async function movie(id) {
  let movies = await ((await fetch(`http://localhost:3000/movies/${id}`)).json());
  return movies
}

export async function moviesSchedule(day) {
  let movies = await ((await fetch(`http://localhost:3000/movies?Schedule_like=${day}`)).json());
  return movies
}

export async function popularMovies() {
  let movies = await ((await fetch(`http://localhost:3000/movies?label=popular&properties=id`)).json());
  return movies
}

export async function comingSoonMovies() {
  let movies = await ((await fetch(`http://localhost:3000/movies?label=soon&properties=id`)).json());
  return movies
}

export async function additionalMovies(limit, page) {
  let movies = await ((await fetch(`http://localhost:3000/movies/?_page=${page}&_limit=${limit}&properties=id`)).json());
  return movies
}

export async function actors(id) {
  const response = await fetch(`http://localhost:3000/actors/${id}`);
  return response
}
