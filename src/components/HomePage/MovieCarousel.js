import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import {getAllMovies} from "../../reducers";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import MoviePoster from "./MoviePoster";

const b = block("MovieCarousel");

class MovieCarousel extends Component {
    filterByLabel() {
        const {label, films} = this.props;
        return films.filter(film => film.label === label);
    }
    render() {
        // const {films} = this.props;
        const films = this.filterByLabel();
        return (
            <div className={b()}>
                <button className={b('button')}>
                    <span className={b('icon', ['left'])}></span>
                </button>
                <div className={b('movies')}>
                    {films.map(film =>
                        <Link key={film.id} to={`/movie/${film.id}`}>
                            <MoviePoster film={film} />
                        </Link>
                    )}
                </div>
                <button className={b('button')}>
                    <span className={b('icon', ['right'])}></span>
                </button>
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
)(MovieCarousel);
