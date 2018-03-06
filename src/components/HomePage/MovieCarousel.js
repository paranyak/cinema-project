import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import {getAllMovies} from "../../reducers";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";

const b = block("MovieCarousel");

class MovieCarousel extends Component {
    render() {
        const {films} = this.props;
        return (
            <div className={b()}>
                <button className={b('button', ['left'])}>left</button>
                {films.map(film => <MoviePoster film={film} />)}
                <button className={b('button', ['right'])}>right</button>
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
                id: movie.id
            }))
        };
    }
)(MovieCarousel);
