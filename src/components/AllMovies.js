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
import LazyLoad from 'react-lazyload'

const b = block("AllMovies");

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 12,
            hasMoreItems: true,
            movies:46
        };
    }

    componentWillMount() {
        console.log("will mount");
        let allM = document.querySelector("#root");
        allM.style.height = '11000px';   //ТУТ МАЄ БУТИ КІЛЬКІСТЬ ВСІХ ЕЛЕМЕНТІВ * РЯДКИ + 1400
        this.props.fetchAllMovies(this.state.items, 1);
    }

    componentWillUnmount(){
        console.log("unmount");
        let allM = document.querySelector("#root");
        allM.style.height = 'initial';
    }


    componentWillReceiveProps(nextProps) {
        //погано, коли повертаємось на сторінку звідкись на натиск "назад" видає фолс
        //треба this.props.films.length === кількість фільмів
        //if (nextProps.films.length === this.props.films.length && this.props.isFetching && !nextProps.isFetching) {
        if(this.props.films.length === this.state.movies){
            this.setState({...this.state, hasMoreItems: false});
        }

    }



    showItems() {
        const {films, comingSoonIds} = this.props;
        if (films.length !== 0) {
            return (
                <div className={b()}>
                    {films
                        .filter(film =>
                            !comingSoonIds.includes(film)
                        )
                        .map((film, i) =>
                            <LazyLoad height='501px'  offset={1000} key={i} >
                                <MoviePoster filmId={film} id={i}/>
                            </LazyLoad>
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