import React, {Component} from "react";
import "../styles/AllMovies.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import InfiniteScroll from "react-infinite-scroller";
import {getAllMoviesSlugs, isMovieFetchingSlug} from "../reducers";
import {fetchAdditionalMovies, fetchMoviesCount} from "../actions/movies"
import {replace} from 'react-router-redux';
import LazyLoad from 'react-lazyload'
import {getMoviesCount} from "../reducers/index";

const b = block("AllMovies");

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 12,
            hasMoreItems: true
        };
    }

    componentWillMount() {
        this.props.moviesCount();
        this.props.fetchAllMovies(this.state.items, 1);
    }

    componentWillUnmount() {
        let allM = document.querySelector("#root");
        allM.style.height = 'initial';
    }


    componentWillReceiveProps(nextProps) {
        console.log("WRP:", nextProps.count, this.props.count, nextProps.films.length, this.props.films.length );
        if (nextProps.count !== this.props.count) {
            let allM = document.querySelector("#root");
            allM.style.height = this.calculateHeight(nextProps.count);
        }
        if (this.props.count && this.props.films.length === this.props.count) {
            this.setState({...this.state, hasMoreItems: false});
        }
    }

    isBetween(number, a, b, inclusive) {
        let min = Math.min.apply(Math, [a, b]),
            max = Math.max.apply(Math, [a, b]);
        return inclusive ? number >= min && number <= max : number > min && number < max;
    };

    getColumnType() {
        let width = window.innerWidth;
        let colunmType;
        if (width >= 1277) colunmType = 4;
        else if (this.isBetween(width, 644, 960, true)) colunmType = 2;
        else if (this.isBetween(width, 960, 1277, false)) colunmType = 3;
        else colunmType = 1;
        return colunmType;

    }

    calculateHeight(count) {
        let columnType = this.getColumnType();
        let height = ((count) / columnType) * 501 + 1000;
        return height + 'px';
    }

    showItems() {
        const {films} = this.props;
        if (films.length !== 0) {
            return (
                <div className={b()}>
                    {films
                        .map((film, i) =>
                            <LazyLoad height='501px'  offset={1000} key={i} >
                                <MoviePoster filmId={film} key={i}/>
                            </LazyLoad>
                        )}
                </div>
            );
        }
    }

    loadMore(page) {
        console.log("Load more", page);
        this.props.fetchAllMovies(this.state.items, page);
    }

    render() {
        if (this.props.films.length !== 0) {
            return (
                <section>
                    <InfiniteScroll
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        pageStart={1}
                        loader={<div className={b("loader")}>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                        </div>}
                    >
                        {this.showItems()}{" "}
                    </InfiniteScroll>{" "}
                </section>
            )
        }
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moviesCount: () => {
            dispatch(fetchMoviesCount())
        },
        fetchAllMovies: (labels, pages) => {
            dispatch(fetchAdditionalMovies(labels, pages))
        },
        updateLocation: (params) => {
            dispatch(replace(params))
        }
    }
};

const mapStateToProps = state => {
    const count = getMoviesCount(state);
    const films = getAllMoviesSlugs(state);
    const isFetching = isMovieFetchingSlug('additional', state);
    return {
        count,
        films,
        isFetching
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMovies);
