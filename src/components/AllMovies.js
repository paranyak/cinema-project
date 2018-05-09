import React, {Component} from "react";
import "../styles/AllMovies.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
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
            movies:47   //всі фільми, треба для визначення чи є ще фільми для завантаження і розрахунку висоти

        };
    }

    componentWillMount() {
        console.log("will mount");
        let allM = document.querySelector("#root");
        //тут викликати функцію, яка повертає кількість фільмів
        allM.style.height = this.calculateHeight();
        this.props.fetchAllMovies(this.state.items, 1);
    }

    componentWillUnmount(){
        console.log("unmount");
        let allM = document.querySelector("#root");
        allM.style.height = 'initial';
    }

    componentWillReceiveProps(nextProps) {
        //кількість фільмів, які прийшли в конект=== кількість фільмів, які є взагалі
        if(this.props.films.length === this.state.movies){
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

    calculateHeight(){
        let columnType = this.getColumnType();
        let height = ((this.state.movies)/columnType) * 501 + 1000;
        console.log("HEIGHT:", height);
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
    const films = getAllMoviesIds(state);
    const isFetching = isMovieFetching('additional', state);
    return {
        films,
        isFetching
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMovies);