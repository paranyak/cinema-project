import React, {Component} from "react";
import "../../styles/AllMovies.less";
import block from "../../helpers/BEM";
import {getAllMovies} from "../../reducers";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import { Link } from 'react-router-dom'

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

export default connect(state => {
        const movies = getAllMovies(state);
        console.log(movies);
        return {
            films: movies.map(movie => ({
                name: movie.name,
                image: movie.image,
                rating: movie.rating,
                genre: movie.genre,
                id: movie.id,
                label: movie.label
            }))
        };
    }
)(AllMovies);
