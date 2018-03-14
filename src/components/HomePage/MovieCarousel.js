import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";
import {getAllMovies} from '../../reducers';

const b = block("MovieCarousel");

class MovieCarousel extends Component {
    render() {
        const {label, films} = this.props;
        return (
            <section className={b()}>
                <button className={b('button')}>
                    <span className={b('icon', ['left'])}></span>
                </button>
                <div className={b('movies')}>
                    {films
                        .filter(film => film.label === label)
                        .map(film =>
                            <Link key={film.id} to={`/movie/${film.id}`}>
                                <MoviePoster film={film}/>
                            </Link>
                        )}
                </div>
                <button className={b('button')}>
                    <span className={b('icon', ['right'])}></span>
                </button>
            </section>
        )
    }
}

export default connect(state => {
    const movies = getAllMovies(state);
    return {
        films: movies.map(movie => ({
            id: movie.id,
            name: movie.name,
            image: movie.image,
            rating: movie.rating,
            genre: movie.genre,
            label: movie.label
        }))
    }
})(MovieCarousel);