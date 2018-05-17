import React, {Component} from "react";
import "../styles/MoviePoster.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {getMovieBySlug} from "../reducers";
import {fetchMovieSlug} from '../actions/movies';
import {Link} from "react-router-dom";

const b = block("MoviePoster");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_275,h_408/';

class MoviePoster extends Component {
    render() {
        const {film, filmId} = this.props;
        if (!film || film === undefined) {
            this.props.fetchMovieById(filmId);
            return null;
        }
        return (
            <article className={b()}>
                <Link to={`/movie/${film.slugName}`}>
                    <picture><img src={link + film.image} className={b("image")}/></picture>
                </Link>
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
        const film = getMovieBySlug(props.filmId, state);
        return {...props, film}
    }, (dispatch) => ({fetchMovieById: (id) => dispatch(fetchMovieSlug(id))})
)(MoviePoster);