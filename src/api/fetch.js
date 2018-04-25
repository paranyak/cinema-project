
export async function movie(id) {
  let movies = await ((await fetch(`http://localhost:3000/movies/${id}`)).json());
  return movies
}

export async function moviesSchedule(day) {
  let movies = await ((await fetch(`http://localhost:3000/movies?Schedule_like=${day}&properties=id`)).json());
  return movies
}

export async function carouselleMovies(label) {
  let movies = await ((await fetch(`http://localhost:3000/movies?label=${label}&properties=id`)).json());
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

export async function additionalActors(limit, page) {
  let actors = await ((await fetch(`http://localhost:3000/actors/?_page=${page}&_limit=${limit}&properties=id`)).json());
  return actors
}
