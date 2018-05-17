import React, {Component} from "react";
import "../styles/MovieCarousel.less";
import block from "../helpers/BEM";
import scrollTo from '../helpers/scrollTo';
import checkScrollPosition from '../helpers/checkScrollPosition';
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import ActorPoster from "./ActorPoster";
import {getLabeledMovies, getUnpublishedMovies, getUnpublishedActors} from '../reducers';
import {fetchMoviesByLabel} from '../actions/movies';
import {fetchUnpublishedActors} from '../actions/actors';
import debounce from 'lodash/debounce';

const b = block("MovieCarousel");


class MovieCarousel extends Component {
    constructor() {
        super();
        this.handleClick = debounce(this.handleClick, 500, {leading: true, trailing: false});
    }

    componentWillMount() {
        if (this.props.movie) {
          this.props.fetchMovies();
        } else {
          this.props.fetchActors();
        }
    }

    handleClick(k = 1) {
        const {carousel, forwardBut, backwardBut} = this.refs;
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
        checkScrollPosition(carousel, forwardBut, backwardBut);
    };

    backwardClick() {
        this.handleClick(-1);
    };

    forwardClick() {
        this.handleClick();
    };

    onScrollMove() {
        const {carousel, forwardBut, backwardBut} = this.refs;
        checkScrollPosition(carousel, forwardBut, backwardBut, carousel.scrollLeft);
    }

    render() {
        const {films, unpublishedFilms, unpublishedActors} = this.props;
        let movies;
        if (this.props.movie) {
          if (this.props.label === 'unpublished') {
            movies = unpublishedFilms;
          } else {
            movies = films
          }
        } else {
            movies = unpublishedActors;
        }
        return (
            <section className={b()}>
                <button
                    className={b('button', ['backward'])}
                    onClick={this.backwardClick.bind(this)}
                    ref={'backwardBut'}
                    style={{'display': 'none'}}
                >
                    <span className={b('icon', ['backward'])}></span>
                </button>
                <div ref='carousel'
                     className={b('movies')}
                     onScroll={this.onScrollMove.bind(this)}
                >
                    {movies
                        .map((film, i) => this.props.movie ? <MoviePoster key={i} filmId={film}/> : <ActorPoster key={i} actorSlug={film}/>
                        )}
                </div>
                <button
                    className={b('button', ['forward'])}
                    onClick={this.forwardClick.bind(this)}
                    ref={'forwardBut'}
                >
                    <span className={b('icon', ['forward'])}></span>
                </button>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
  fetchMovies: () => dispatch(fetchMoviesByLabel(props.label)),
  fetchActors: () => dispatch(fetchUnpublishedActors())
});

const mapStateToProps = (state, props) => {
    const films = getLabeledMovies(props.label, state) || [];
    const unpublishedFilms = getUnpublishedMovies(state) || [];
    const unpublishedActors = getUnpublishedActors(state) || [];
    console.log("connect:", unpublishedActors);
    return {films, unpublishedFilms, unpublishedActors};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCarousel);
