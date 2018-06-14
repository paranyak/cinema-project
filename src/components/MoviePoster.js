import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import { branch, renderNothing, flattenProp } from "recompose"

import { getMovieBySlug } from "../reducers"
import { fetchMovieSlug } from "../actions/movies"

import { Link } from "react-router-dom"

import { CLOUDINARY_PATH } from "../api/fetch"

import "../styles/MoviePoster.scss"
import block from "../helpers/BEM"

const b = block("MoviePoster")

const MovieImage = ({ slugName, published, image }) => {
  const imgIns = image
    ? <picture>
        <img alt="" src={CLOUDINARY_PATH + "/c_fill,w_275,h_408/" + image} className={b("image")}/>
      </picture>
    : <span className={b("image", ["undefined"])}/>

  return published ? (
    <Link to={`/movie/${slugName}`}>
      {imgIns}
    </Link>
  ) : (
    <Link to={`/edit-movie/${slugName}`}>
      <span className={b("image", ["undefined"])}/>
    </Link>
  )
}

const MoviePoster = ({ name, genre, rating, slugName, image, published }) => (
  <article className={b()}>
    <MovieImage slugName={slugName} published={published} image={image}/>
    <footer className={b("additional-info")}>
      <h3 className={b("name")}>{name}</h3>
      <p className={b("genre")}>{genre}</p>
      {rating && <span className={b("rating")}>{rating}</span>}
    </footer>
  </article>
)

const enhance = compose(
  connect(
    (state, props) => ({ film: getMovieBySlug(props.filmId, state) }),
    { fetchMovieById: fetchMovieSlug },

    ({ film }, { fetchMovieById }, { filmId }) => {
      if (!film) fetchMovieById(filmId)
      return { film }
    },
  ),
  branch(({ film }) => !film, renderNothing),
  flattenProp("film"),
)

export default enhance(MoviePoster)
