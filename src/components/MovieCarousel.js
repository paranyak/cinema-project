import React, {Component} from "react";
import "../styles/MovieCarousel.less";
import block from "../helpers/BEM";
import scrollTo from '../helpers/scrollTo';
import checkScrollPosition from '../helpers/checkScrollPosition';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";
import {getCarouselleMovies} from '../reducers';
import {fetchCarouselleMovies} from '../actions/fetch';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

const b = block("MovieCarousel");

class MovieCarousel extends Component {
    constructor() {
        super();
        this.handleClick = debounce(this.handleClick, 500, {leading: true, trailing: false});
    }
    componentWillMount() {
        this.props.fetchMovies();
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
        const {films} = this.props;
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
                    {films
                        .map((film, i) =>
                            <LazyLoad key={i} height='100%' offsetRight={200}>
                                <Link key={film} to={`/movie/${film}`}>
                                    <MoviePoster filmId={film}/>
                                </Link>
                            </LazyLoad>
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

const mapDispatchToProps = (dispatch, props) => ( {fetchMovies: () => dispatch(fetchCarouselleMovies(props.label))} );

const mapStateToProps = (state, props) => {
    const movies = getCarouselleMovies(state, props.label) || [];
    return {films: movies};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCarousel);
