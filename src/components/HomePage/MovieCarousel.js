import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import scrollTo from '../../helpers/scrollTo';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";
import {getPopularMovies, getComingsoonrMovies} from '../../reducers';
import {fetchPopularMovies, fetchComingsoonMovies} from '../../actions';
import throttle from 'lodash';

const b = block("MovieCarousel");


class MovieCarousel extends Component {

    componentWillMount() {
      this.props.fetchMovies();
    }

    handleClick(k = 1) {
        const {carousel} = this.refs;
        let numOfItemsToScroll = 3.5;
        let widthOfItem = 275;
        let newPos = carousel.scrollLeft + k * (widthOfItem * numOfItemsToScroll);
        const timeForItem = 200;
        const totalTime = numOfItemsToScroll * timeForItem;
        const {rightBut, leftBut} = this.refs;
        let width = carousel.offsetWidth;
        let sw = carousel.scrollWidth;

        // console.log("\nclient", width);
        // console.log("scroll width", sw);
        // console.log('prev pos', carousel.scrollLeft);
        // console.log('new pos', newPos);


        scrollTo({
            el: carousel,
            to: newPos,
            duration: totalTime,
            scrollDir: 'scrollLeft'
        });

        (carousel.scrollLeft === 0 || newPos < 0) ?
            leftBut.setAttribute('style', 'display: none') :
            leftBut.removeAttribute('style');

        (sw - carousel.scrollLeft === width || sw - newPos < width) ?
            rightBut.setAttribute('style', 'display: none') :
            rightBut.removeAttribute('style');

    };

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
                    ref={'leftBut'}
                    style={{'display': 'none'}}
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
                    ref={'rightBut'}
                >
                    <span className={b('icon', ['right'])}></span>
                </button>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMovies: () => {
      if (props.label === 'popular') {
        return fetchPopularMovies()(dispatch);
      }
      return fetchComingsoonMovies()(dispatch);
    },
  }
};


export default connect((state, props) => {
    let movies = [];
    if (props.label === 'popular') {
      movies = getPopularMovies(state);
    } else {
      movies = getComingsoonrMovies(state);
    }

    console.log(movies);
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
}, mapDispatchToProps)(MovieCarousel);
