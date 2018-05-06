import React, {Component} from "react";
import "../styles/AllMovies.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import {Link} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import {getAllMoviesIds, isMovieFetching, getCarouselleMovies} from "../reducers";
import {fetchAdditionalMovies} from "../actions/fetch"
import {replace} from 'react-router-redux';
import * as queryString from 'query-string';

const b = block("AllMovies");

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 12,
            hasMoreItems: true
        };
        this.moveScrollToLocation = this.moveScrollToLocation.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
    }

    componentWillMount() {
        this.props.fetchAllMovies(this.state.items, 1);
        let previousScroll = window.location.search.slice(5, window.location.search.length);
        if (window.location.search) {
            let index = window.location.search.indexOf('=', 6);
            if (index != -1) {
                previousScroll = window.location.search.slice(5, index - 6);
            }
            this.props.updateLocation({
                search: '?' + queryString.stringify({"off": previousScroll, "start": '-'})
            });
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.moveScrollToLocation);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.moveScrollToLocation);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.films.length === this.props.films.length && this.props.isFetching && !nextProps.isFetching) {
            this.setState({...this.state, hasMoreItems: false});
        }

    }


    moveScrollToLocation() {
        let scrollPosition = window.location.search.slice(5, window.location.search.length);
        if (window.scrollY - window.innerHeight >=scrollPosition || window.scrollY + window.innerHeight <= scrollPosition) {
            this.props.updateLocation({
                search: '?' + queryString.stringify({"off": window.scrollY})
            });
        }
    }

    scrollTo() {
        let scrollY = 0;
        if (window.location.search) {
            let index = window.location.search.indexOf('=', 6);
            if (index == -1) {
                scrollY = window.location.search.slice(5, window.location.search.length);
            }
            else {
                scrollY = window.location.search.slice(5, index - 6);
            }
            window.scrollTo(0, scrollY);
        }
    }

    showItems() {
        if (window.location.search && window.location.search[window.location.search.length - 1] === '-') {
            this.scrollTo();
            this.props.updateLocation({
                search: '?' + queryString.stringify({"off": window.scrollY})
            });
        }

        const {films, comingSoonIds} = this.props;
        if (films.length !== 0) {
            return (
                <div className={b()}>
                    {films
                        .filter(film =>
                            !comingSoonIds.includes(film)
                        )
                        .map((film, i) =>
                            <Link key={film} to={`/movie/${film}`}>
                                <MoviePoster filmId={film} id={i}/>
                            </Link>
                        )}
                </div>
            );
        }
    }

    loadMore(page) {
        this.props.fetchAllMovies(this.state.items, page);
    }

    render() {
        if (this.props.films.length !== 0) {
            return (
                <section>
                    <InfiniteScroll
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        initialLoad={false}
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
        fetchAllMovies: (labels, pages) => {
            dispatch(fetchAdditionalMovies(labels, pages))
        },
        updateLocation: (params) => {
            dispatch(replace(params))
        }
    }
};

const mapStateToProps = state => {
    const movies = getAllMoviesIds(state);
    const comingSoonIds = getCarouselleMovies(state, 'soon');
    const isFetching = isMovieFetching('additional', state);
    return {
        films: movies,
        comingSoonIds,
        isFetching
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMovies);