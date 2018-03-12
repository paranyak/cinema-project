import React, {Component} from "react";
import "../../styles/AllMovies.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import {Link} from 'react-router-dom'

const b = block("AllMovies");

class AllMovies extends Component {
    render() {
        const {films} = this.props;
        return (
            <div className={b()}>
                {films
                    .filter(film => film.label !== 'soon')
                    .map(film =>
                          <Link key={film.id} to={`/movie/${film.id}`}>
                            <MoviePoster film={film} />
                          </Link>
                )}
            </div>
        )
    }
}

export default connect()(AllMovies);