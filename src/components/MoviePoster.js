import React, { Component } from "react"

import "../styles/MoviePoster.scss"
import block from "../helpers/BEM"

import { connect } from "react-redux"
import { getMovieBySlug } from "../reducers"
import { fetchMovieSlug } from "../actions/movies"
import { Link } from "react-router-dom"

const b = block("MoviePoster")
const link = "https://res.cloudinary.com/dtnnkdylh/image/upload/c_fit,w_275,h_408/"

class MoviePoster extends Component {
  render() {
    const { film, filmId } = this.props
    if (!film || film === undefined) {
      this.props.fetchMovieById(filmId)
      return null
    }
    let moviePoster = ""
    if (film.published) {
      moviePoster = (
        <Link to={`/movie/${film.slugName}`}>
          <picture>
            <img alt="" src={link + film.image} className={b("image")} />
          </picture>
        </Link>
      )
    } else {
      moviePoster = (
        <Link to={`/edit-movie/${film.slugName}`}>
          <span className={b("image", ["undefined"])} />
        </Link>
      )
    }
    return (
      <article className={b()}>
        {moviePoster}
        <footer className={b("additional-info")}>
          <h3 className={b("name")}>{film.name}</h3>
          <p className={b("genre")}>{film.genre}</p>
          <span className={b("rating")} style={{ display: film.rating ? "block" : "none" }}>
            {film.rating}
          </span>
        </footer>
      </article>
    )
  }
}

export default connect(
  (state, props) => {
    const film = getMovieBySlug(props.filmId, state)
    return { ...props, film }
  },
  dispatch => ({ fetchMovieById: id => dispatch(fetchMovieSlug(id)) }),
)(MoviePoster)
