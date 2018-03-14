import React, {Component} from "react";
import "../../styles/AllMovies.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import {Link} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import {getAllMovies} from "../../reducers";

const b = block("AllMovies");

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 9,
            hasMoreItems: true
        };
    }

    showItems() {
        const {films} = this.props;
        return (
            <div className={b()}>
                {films
                    .slice(0, this.state.items)
                    .filter(film => film.label !== 'soon')
                    .map(film =>
                        <Link key={film.id} to={`/movie/${film.id}`}>
                            <MoviePoster film={film}/>
                        </Link>
                    )}
            </div>
        );
    }

    loadMore() {
        if (this.state.items === 100) {
            this.setState({hasMoreItems: false});
        } else {
            setTimeout(() => {
                this.setState({items: this.state.items + 9});
            }, 1000);
        }

    }

    render() {
        return (
            <section style={{height: '1200px', overflow: 'auto'}}>
                <InfiniteScroll
                    loadMore={this.loadMore.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className={b("loader")}>
                                <span className={b("loader-dot")}></span>
                                <span className={b("loader-dot")}></span>
                                <span className={b("loader-dot")}></span>
                                <span className={b("loader-dot")}></span>
                            </div>}
                    useWindow={false}
                >
                    {this.showItems()}{" "}
                </InfiniteScroll>{" "}
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
})(AllMovies);