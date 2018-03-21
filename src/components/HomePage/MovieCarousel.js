import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";
import {getAllMovies} from '../../reducers';
import scrollTo from './scrollTo';
import throttle from 'lodash';

const b = block("MovieCarousel");


class MovieCarousel extends Component {

    handleClick(k = 1) {
        const {carousel} = this.refs;
        let numOfItemsToScroll = 3.5;
        let widthOfItem = 275;
        let newPos = carousel.scrollLeft + k * (widthOfItem * numOfItemsToScroll);
        const timeForItem = 200;
        const totalTime = numOfItemsToScroll * timeForItem;
        scrollTo({
            el: carousel,
            to: newPos,
            duration: totalTime,
            scrollDir: 'scrollLeft'
        });
    }

    leftClick() {
        throttle(this.handleClick(-1), 500);
    };

    rightClick() {
        throttle(this.handleClick(), 500);
    };

    render() {
        const {label, films} = this.props;
        return (
            <section className={b()}>
                <button
                    className={b('button')}
                    onClick={this.leftClick.bind(this)}
                >
                    <span className={b('icon', ['left'])}></span>
                </button>
                <div ref='carousel' className={b('movies')}>
                    {films
                        .filter(film => film.label === label)
                        .map(film =>
                            <Link key={film.id} to={`/movie/${film.id}`}>
                                <MoviePoster film={film}/>
                            </Link>
                        )}
                </div>
                <button
                    className={b('button')}
                    onClick={this.rightClick.bind(this)}
                >
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