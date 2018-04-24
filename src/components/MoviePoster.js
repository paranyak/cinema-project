import React, {Component} from "react";
import "../styles/MoviePoster.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {getMovieById} from "../reducers";
import {fetchMovie} from '../actions/fetch';

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
                <picture><img src={link + film.image} className={b("image")}/></picture>
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
        const movie = getMovieById(state, props.filmId);
        return {
            ...props,
            film:movie
        }}, (dispatch) => ({
        fetchMovieById: (id) => dispatch(fetchMovie(id))
    })
)(MoviePoster);