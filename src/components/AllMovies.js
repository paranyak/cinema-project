import React, {Component} from "react";
import "../styles/AllMovies.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import {Link} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import {getAllMoviesIds, isMovieFetching , getComingsoonrMoviesIds} from "../reducers";
import {fetchAdditionalMovies} from "../api/fetch"
import LazyLoad from 'react-lazyload';

const b = block("AllMovies");

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 12,
            hasMoreItems: true
        };
        // this.loadMore = ;
    }

    componentWillMount() {
      this.props.fetchAllMovies(this.state.items, 1);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.films.length === this.props.films.length && this.props.isFetching && !nextProps.isFetching) {
        this.setState({...this.state, hasMoreItems: false});
      }
    }

    showItems() {
        const {films, comingSoonIds} = this.props;
        if (films.length === 0) {
          return null;
        }
        return (
            <div className={b()}>
                {films
                    .filter(film =>
                      !comingSoonIds.includes(film)
                    )
                    .map(film =>
                        <LazyLoad height='100%' offsetBottom={100}>
                            <Link key={film} to={`/movie/${film}`}>
                                <MoviePoster film={film}/>
                            </Link>
                        </LazyLoad>
                    )}
            </div>
        );
    }

    loadMore(page) {
      this.props.fetchAllMovies(this.state.items, page);
    }

    render() {
      if (this.props.films.length === 0) {
        return null;
      }
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
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllMovies: (labels, pages) => fetchAdditionalMovies(labels, pages)(dispatch)
  }
};

export default connect(state => {
    const movies = getAllMoviesIds(state);
    const comingSoonIds = getComingsoonrMoviesIds(state);
    const isFetching = isMovieFetching('additional', state);
    return {
        films: movies,
        comingSoonIds,
        isFetching
    }
}, mapDispatchToProps)(AllMovies);
