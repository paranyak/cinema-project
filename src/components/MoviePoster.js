import React, {Component} from "react";
import "../styles/MoviePoster.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {getMovieById} from "../reducers";
import {fetchMovie} from '../api/fetch';

const b = block("MoviePoster");

class MoviePoster extends Component {
    render() {
        const {film, filmId} = this.props;
        if (!film || film === undefined) {
          // this.props.fetchMovieById(this.props.match.params.film);
          this.props.fetchMovieById(filmId);
          return null;
        }
        return (
            <article className={b()}>
                <img src={film.image} className={b("image")}/>
                <footer className={b("additional-info")}>
                    <h3 className={b('name')}>{film.name}</h3>
                    <p className={b('genre')}>{film.genre}</p>
                    <span className={b('rating')}>{film.rating}</span>
                </footer>
            </article>
        )
    }
}

export default connect((state, props) => {
    const movie = getMovieById(state, props.filmId)
    return {
      ...props,
      film:movie
    }}, (dispatch) => ({
      fetchMovieById: (id) => fetchMovie(id)(dispatch)
    })
)(MoviePoster);
