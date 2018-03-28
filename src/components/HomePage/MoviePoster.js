import React, {Component} from "react";
import "../../styles/MoviePoster.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import {getMovieById} from "../../reducers";
import {fetchMovie} from '../../actions';

const b = block("MoviePoster");

class MoviePoster extends Component {
    render() {
        const {film} = this.props;
        if (!film || film === undefined) {
          // this.props.fetchMovieById(this.props.match.params.film);
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
    const movie = getMovieById(state, props.film)
    return {
      film:movie
    }}, (dispatch) => ({
      fetchMovieById: (id) => fetchMovie(id)(dispatch)
    })
)(MoviePoster);
